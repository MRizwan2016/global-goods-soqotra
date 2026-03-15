import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AutoFillResult {
  shipperName?: string;
  shipperMobile?: string;
  shipperCity?: string;
  shipperAddress?: string;
  consigneeName?: string;
  consigneeMobile?: string;
  weight?: string;
  description?: string;
  volume?: string;
  packages?: string;
  driverName?: string;
  salesRepresentative?: string;
  invoiceNumber?: string;
  pageNumber?: string;
  bookNumber?: string;
  [key: string]: string | undefined;
}

export const lookupJobData = async (
  jobNumber: string,
  dbBooks: any[] = []
): Promise<AutoFillResult | null> => {
  if (!jobNumber || jobNumber.length < 3) return null;

  // 1. Check localStorage first
  try {
    const jobs1 = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobs2 = JSON.parse(localStorage.getItem('qatarJobs') || '[]');
    const allJobs = [...jobs1, ...jobs2];

    const matchedJob = allJobs.find((j: any) =>
      j.jobNumber === jobNumber ||
      j.jobNumber?.includes(jobNumber) ||
      j.id?.includes(jobNumber)
    );

    if (matchedJob) {
      const result: AutoFillResult = {
        shipperName: matchedJob.customer || matchedJob.shipperName || matchedJob.customerName || matchedJob.shipper1 || '',
        shipperMobile: matchedJob.mobileNumber || matchedJob.shipperMobile || matchedJob.mobile || matchedJob.shipperPhone || '',
        shipperCity: matchedJob.town || matchedJob.city || matchedJob.shipperCity || '',
        shipperAddress: matchedJob.location || matchedJob.shipperAddress || matchedJob.address || '',
        consigneeName: matchedJob.consigneeName || matchedJob.consignee1 || '',
        consigneeMobile: matchedJob.consigneeMobile || matchedJob.consigneePhone || '',
        weight: matchedJob.weight || matchedJob.totalWeight || '',
        description: matchedJob.description || matchedJob.remarks || matchedJob.packageDetails || '',
        volume: matchedJob.volume || matchedJob.totalVolume || '',
        packages: matchedJob.packages || matchedJob.totalPackages || '',
        driverName: matchedJob.driver || matchedJob.driverName || '',
      };

      if (matchedJob.invoiceNumber) {
        result.invoiceNumber = matchedJob.invoiceNumber;
        result.pageNumber = matchedJob.invoiceNumber;
      }

      // Try to find matching book
      if (matchedJob.invoiceNumber && dbBooks.length > 0) {
        for (const book of dbBooks) {
          const pages = Array.isArray(book.available_pages) ? book.available_pages as string[] : [];
          if (pages.includes(matchedJob.invoiceNumber) ||
            book.job_number === jobNumber ||
            book.job_number === matchedJob.jobNumber) {
            result.bookNumber = book.book_number?.replace('#', '') || book.book_number || '';
            result.salesRepresentative = book.assigned_to_sales_rep || '';
            result.driverName = book.assigned_to_driver || result.driverName;
            break;
          }
        }
      }

      return result;
    }
  } catch (err) {
    console.log('localStorage lookup failed:', err);
  }

  // 2. Check database schedule_jobs
  try {
    const { data: scheduleJobs, error } = await supabase
      .from('schedule_jobs')
      .select('job_data, schedule_id');

    if (error || !scheduleJobs) return null;

    for (const sj of scheduleJobs) {
      const jobData = sj.job_data as any;
      if (jobData && (jobData.jobNumber === jobNumber || jobData.jobNumber?.includes(jobNumber))) {
        let scheduleDriver = '';
        let scheduleSalesRep = '';
        if (sj.schedule_id) {
          const { data: schedule } = await supabase
            .from('schedules')
            .select('driver, sales_rep, vehicle')
            .eq('id', sj.schedule_id)
            .maybeSingle();
          if (schedule) {
            scheduleDriver = schedule.driver || '';
            scheduleSalesRep = schedule.sales_rep || '';
          }
        }

        const result: AutoFillResult = {
          shipperName: jobData.customer || jobData.shipperName || jobData.customerName || jobData.shipper1 || '',
          shipperMobile: jobData.mobileNumber || jobData.shipperMobile || jobData.mobile || jobData.shipperPhone || '',
          shipperCity: jobData.town || jobData.city || jobData.shipperCity || '',
          shipperAddress: jobData.location || jobData.shipperAddress || jobData.address || '',
          consigneeName: jobData.consigneeName || jobData.consignee1 || '',
          consigneeMobile: jobData.consigneeMobile || jobData.consigneePhone || '',
          weight: jobData.weight || jobData.totalWeight || '',
          description: jobData.description || jobData.remarks || jobData.packageDetails || '',
          volume: jobData.volume || jobData.totalVolume || '',
          packages: jobData.packages || jobData.totalPackages || '',
          driverName: scheduleDriver || jobData.driver || jobData.driverName || '',
          salesRepresentative: scheduleSalesRep || jobData.salesRep || '',
        };

        if (jobData.invoiceNumber) {
          result.invoiceNumber = jobData.invoiceNumber;
          result.pageNumber = jobData.invoiceNumber;
        }

        // Find matching book
        if (jobData.invoiceNumber && dbBooks.length > 0) {
          for (const book of dbBooks) {
            const pages = Array.isArray(book.available_pages) ? book.available_pages as string[] : [];
            if (pages.includes(jobData.invoiceNumber) ||
              book.job_number === jobNumber ||
              book.job_number === jobData.jobNumber) {
              result.bookNumber = book.book_number?.replace('#', '') || book.book_number || '';
              result.salesRepresentative = book.assigned_to_sales_rep || result.salesRepresentative;
              result.driverName = book.assigned_to_driver || result.driverName;
              break;
            }
          }
        }

        return result;
      }
    }
  } catch (err) {
    console.log('DB job lookup failed:', err);
  }

  return null;
};
