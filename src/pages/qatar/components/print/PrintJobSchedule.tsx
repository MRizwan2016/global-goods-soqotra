
import React, { useRef, useEffect } from "react";
import { QatarJob } from "../../types/jobTypes";
import PrintStyles from "./PrintStyles";
import PrintControls from "./PrintControls";
import { useNavigate } from "react-router-dom";

interface PrintJobScheduleProps {
  jobs: QatarJob[];
}

const PrintJobSchedule: React.FC<PrintJobScheduleProps> = ({ jobs }) => {
  const navigate = useNavigate();
  const printContentRef = useRef<HTMLDivElement>(null);
  
  // Handle print action
  const handlePrint = () => {
    window.print();
  };
  
  // Handle back button
  const handleBack = () => {
    navigate("/qatar/jobs");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PrintStyles />
      <PrintControls 
        handleBack={handleBack}
        handlePrint={handlePrint}
        title="JOB SCHEDULE PRINT"
      />
      
      <div className="container mx-auto p-4 bg-white shadow-sm">
        <div ref={printContentRef} className="print:p-0">
          <div className="bg-green-100 p-4 mb-4 print:bg-green-100">
            <h1 className="text-xl font-bold">VIEW SCHEDULE JOBS LIST</h1>
            <p>RECORD LISTED</p>
          </div>
          
          {/* Schedule table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border p-2 text-left">NUM</th>
                  <th className="border p-2 text-left">JOB NUMBER</th>
                  <th className="border p-2 text-left">DATE</th>
                  <th className="border p-2 text-left">SECTOR</th>
                  <th className="border p-2 text-left">CUSTOMER</th>
                  <th className="border p-2 text-left">MOBILE</th>
                  <th className="border p-2 text-left">TOWN</th>
                  <th className="border p-2 text-left">VEHICLE</th>
                  <th className="border p-2 text-left">TYPE</th>
                </tr>
              </thead>
              <tbody>
                {jobs.slice(0, 20).map((job, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{job.jobNumber}</td>
                    <td className="border p-2">{job.date}</td>
                    <td className="border p-2">{job.sector}</td>
                    <td className="border p-2">{job.customer === "--" ? "Unnamed" : job.customer}</td>
                    <td className="border p-2">{job.mobileNumber}</td>
                    <td className="border p-2">{job.town}</td>
                    <td className="border p-2">{job.vehicle}</td>
                    <td className="border p-2">{job.jobType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Job items section */}
          <div>
            <h2 className="text-lg font-bold mb-2">JOB ITEMS SUMMARY</h2>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border p-2 text-left">NUM</th>
                  <th className="border p-2 text-left">JOB NUMBER</th>
                  <th className="border p-2 text-left">ITEM</th>
                  <th className="border p-2 text-left">JOB TYPE</th>
                  <th className="border p-2 text-center">QUANTITY</th>
                </tr>
              </thead>
              <tbody>
                {jobs.slice(0, 5).map((job, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{job.jobNumber}</td>
                    <td className="border p-2">{job.items && job.items.length > 0 ? job.items[0].itemName : "PACKAGE"}</td>
                    <td className="border p-2">{job.jobType}</td>
                    <td className="border p-2 text-center">{job.items && job.items.length > 0 ? job.items[0].quantity : 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary section */}
          <div className="flex justify-between mb-4">
            <div className="w-1/2 pr-2">
              <h2 className="text-lg font-bold mb-2">ITEM SUMMARY</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border p-2 text-left">NUM</th>
                    <th className="border p-2 text-left">ITEM</th>
                    <th className="border p-2 text-center">QUANTITY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border p-2">1</td>
                    <td className="border p-2">CARTON BOX - SMALL</td>
                    <td className="border p-2 text-center">3</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2">2</td>
                    <td className="border p-2">WOODEN BOX - (1M) - WHITE</td>
                    <td className="border p-2 text-center">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="w-1/2 pl-2">
              <div className="mt-8 pt-8 text-right">
                <p className="mb-2">PRINTED BY: ADMIN</p>
                <p className="mb-2">DATE: {new Date().toLocaleDateString()}</p>
                <p>TIME: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center print:mt-4">
            <p className="text-gray-500">QATAR CARGO COLLECTION & DELIVERY - ALMARAAM LOGISTICS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintJobSchedule;
