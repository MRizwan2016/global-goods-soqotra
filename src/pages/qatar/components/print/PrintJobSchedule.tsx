
import React, { useRef } from "react";
import { QatarJob } from "../../types/jobTypes";
import PrintControls from "./PrintControls";
import PrintStyles from "./PrintStyles";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatters";

interface PrintJobScheduleProps {
  jobs: QatarJob[];
}

const PrintJobSchedule: React.FC<PrintJobScheduleProps> = ({ jobs }) => {
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleBack = () => {
    navigate("/qatar/jobs");
  };
  
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
          <div className="mb-6 text-center border-b pb-4">
            <h1 className="text-2xl font-bold">SOQOTRA QATAR CARGO</h1>
            <h2 className="text-xl">JOB SCHEDULE REPORT</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-y-8">
            {jobs.map((job, index) => (
              <div key={job.id} className={`job-card ${index > 0 ? "pt-4" : ""} ${(index + 1) % 4 === 0 ? "page-break-after" : ""}`}>
                <div className="border rounded">
                  <div className={`p-3 font-bold text-white ${job.jobType === "COLLECTION" ? "bg-blue-600" : "bg-green-600"}`}>
                    {job.jobType} JOB - #{job.jobNumber}
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="font-bold">CUSTOMER:</div>
                        <div>{job.customer}</div>
                      </div>
                      
                      <div>
                        <div className="font-bold">MOBILE:</div>
                        <div>{job.mobileNumber}</div>
                      </div>
                      
                      <div>
                        <div className="font-bold">DATE/TIME:</div>
                        <div>{job.date} {job.time} {job.amPm}</div>
                      </div>
                      
                      <div>
                        <div className="font-bold">LOCATION:</div>
                        <div>{job.location}, {job.town}, {job.city}</div>
                      </div>
                      
                      <div>
                        <div className="font-bold">VEHICLE:</div>
                        <div>{job.vehicle}</div>
                      </div>
                      
                      <div>
                        <div className="font-bold">AMOUNT:</div>
                        <div>{formatCurrency(job.advanceAmount || 0)}</div>
                      </div>
                    </div>
                    
                    {job.items && job.items.length > 0 && (
                      <div className="mt-4">
                        <div className="font-bold mb-2">ITEMS:</div>
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border p-1 text-left">ITEM</th>
                              <th className="border p-1 text-left">QTY</th>
                              <th className="border p-1 text-left">PRICE</th>
                              <th className="border p-1 text-left">TOTAL</th>
                            </tr>
                          </thead>
                          <tbody>
                            {job.items.map((item, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="border p-1">{item.itemName}</td>
                                <td className="border p-1">{item.quantity}</td>
                                <td className="border p-1">{formatCurrency(item.sellPrice)}</td>
                                <td className="border p-1">{formatCurrency(item.sellPrice * item.quantity)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {job.remarks && (
                      <div className="mt-4">
                        <div className="font-bold">REMARKS:</div>
                        <div className="text-sm">{job.remarks}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintJobSchedule;
