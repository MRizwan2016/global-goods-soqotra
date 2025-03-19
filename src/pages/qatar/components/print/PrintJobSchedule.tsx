
import React, { useRef } from "react";
import { QatarJob, JobItem } from "../../types/jobTypes";
import PrintControls from "./PrintControls";
import PrintStyles from "./PrintStyles";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatters";
import { Table } from "@/components/ui/table";

interface PrintJobScheduleProps {
  jobs: QatarJob[];
  scheduleData?: any;
  onBack?: () => void;
}

const PrintJobSchedule: React.FC<PrintJobScheduleProps> = ({ 
  jobs, 
  scheduleData,
  onBack 
}) => {
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/qatar/jobs");
    }
  };

  // Calculate totals
  const deliveryCount = jobs.filter(job => job.jobType === "DELIVERY").length;
  const collectionCount = jobs.filter(job => job.jobType === "COLLECTION").length;
  
  const totalCollectionAmount = jobs
    .filter(job => job.jobType === "COLLECTION")
    .reduce((total, job) => total + (job.advanceAmount || 0), 0);
    
  const totalDeliveryAmount = jobs
    .filter(job => job.jobType === "DELIVERY")
    .reduce((total, job) => total + (job.advanceAmount || 0), 0);
    
  const totalAmount = totalCollectionAmount + totalDeliveryAmount;

  // Group items by name
  const itemCounts: Record<string, number> = {};
  jobs.forEach(job => {
    if (job.items) {
      job.items.forEach(item => {
        const itemName = item.itemName;
        if (itemCounts[itemName]) {
          itemCounts[itemName] += item.quantity;
        } else {
          itemCounts[itemName] = item.quantity;
        }
      });
    }
  });

  // Format today's date
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  // Get user info from localStorage if available
  let userName = "Admin User";
  try {
    const usersString = localStorage.getItem('users');
    if (usersString) {
      const users = JSON.parse(usersString);
      if (users && users.length > 0) {
        userName = users[0].fullName;
      }
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage', error);
  }
  
  return (
    <div>
      <PrintStyles />
      
      <PrintControls 
        handleBack={handleBack}
        handlePrint={handlePrint}
        title="JOB SCHEDULE PRINT"
      />
      
      <div className="p-4 max-w-[1200px] mx-auto" ref={printRef}>
        <div className="bg-white p-6 shadow-md">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold uppercase">
              COLLECTION/ DELIVERY JOB SHEET [ SCHEDULE NO: {scheduleData?.scheduleNumber || "5352"} ] - [SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL]
            </h1>
            <p className="text-sm mt-2">
              Printed Time: {formattedDate} {formattedTime}. Printed By: {userName}
            </p>
          </div>

          {/* Schedule Info */}
          <div className="border border-gray-300 mb-6">
            <div className="bg-blue-600 text-white text-center py-1 font-bold">
              JOB SCHEDULE
            </div>
            <div className="grid grid-cols-3 text-sm">
              <div className="border-r border-gray-300 p-2">
                <div><span className="font-bold">SCHED. Num:</span> {scheduleData?.scheduleNumber || "5352"}</div>
                <div><span className="font-bold">DATE:</span> {scheduleData?.scheduleDate ? new Date(scheduleData.scheduleDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}</div>
              </div>
              <div className="border-r border-gray-300 p-2">
                <div><span className="font-bold">VEHICLE:</span> {scheduleData?.vehicle || ""}</div>
                <div><span className="font-bold">SALES REP:</span> {scheduleData?.salesRep || ""}</div>
              </div>
              <div className="p-2">
                <div><span className="font-bold">DRIVER:</span> {scheduleData?.driver || ""}</div>
                <div><span className="font-bold">SALES REP 2:</span></div>
              </div>
            </div>
          </div>

          {/* Job Details */}
          {jobs.map((job, index) => (
            <div key={job.id} className="mb-4 border-b border-gray-300 pb-2">
              <div className={`p-1 ${job.jobType === 'COLLECTION' ? 'bg-blue-100' : 'bg-green-100'} mb-1`}>
                <span className="font-bold">{job.jobType} Time: {job.time || "00:00"}{job.amPm}</span>
                <span className="ml-4">Job No: {job.jobNumber}</span>
                <span className="ml-4">Contact No: {job.mobileNumber}/ {job.landNumber || '0'}</span>
                <span className="ml-4">Name: {job.customer}</span>
                <span className="ml-4">Amount: {formatCurrency(job.advanceAmount || 0).replace('QAR ', '')}</span>
              </div>
              <div className="pl-2 text-sm">
                <div><span className="font-bold">Location:</span> {job.city}-{job.town}-{job.location}</div>
                <div><span className="font-bold">Remarks:</span> {job.remarks || '-'}</div>
                <div>
                  <span className="font-bold">Description:</span>{" "}
                  {job.items && job.items.length > 0
                    ? job.items.map((item, i) => (
                        <span key={i}>
                          {item.itemName}: {item.quantity}
                          {i < job.items!.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
            </div>
          ))}

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              {/* Job Counts */}
              <div className="border border-blue-300 mb-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-blue-300">
                      <td className="p-2 font-bold border-r border-blue-300">NUMBER OF DELIVERIES</td>
                      <td className="p-2 text-right">{deliveryCount}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold border-r border-blue-300">NUMBER OF COLLECTIONS</td>
                      <td className="p-2 text-right">{collectionCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Financial Summary */}
              <div className="border border-blue-300">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-blue-300">
                      <td className="p-2 font-bold border-r border-blue-300">TOTAL DELIVERY AMOUNT</td>
                      <td className="p-2 text-right">{totalDeliveryAmount}</td>
                    </tr>
                    <tr className="border-b border-blue-300">
                      <td className="p-2 font-bold border-r border-blue-300">TOTAL COLLECTION AMOUNT</td>
                      <td className="p-2 text-right">{totalCollectionAmount}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold border-r border-blue-300">TOTAL AMOUNT</td>
                      <td className="p-2 text-right">{totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Item Summary */}
            <div className="border border-blue-300">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(itemCounts).map(([itemName, count], index) => (
                    <tr key={index} className={index < Object.entries(itemCounts).length - 1 ? "border-b border-blue-300" : ""}>
                      <td className="p-2 font-bold border-r border-blue-300">{itemName}</td>
                      <td className="p-2 text-right">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-right text-xs mt-4">Page 1/1</div>
        </div>
      </div>
    </div>
  );
};

export default PrintJobSchedule;
