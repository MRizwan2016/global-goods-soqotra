
import React from "react";
import { Button } from "@/components/ui/button";

interface ScheduleFormProps {
  formData: {
    scheduleNumber: string;
    vehicle: string;
    salesRep: string;
    driver: string;
    helper: string;
    scheduleDate: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handlePrint: () => void;
  vehicleNumbers: string[];
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  formData,
  handleFormChange,
  handleSelectChange,
  handlePrint,
  vehicleNumbers
}) => {
  return (
    <div className="bg-white p-4 border rounded-md mb-6">
      <h3 className="text-lg font-medium mb-4">Schedule Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Schedule Number</label>
          <input 
            type="text" 
            name="scheduleNumber" 
            value={formData.scheduleNumber} 
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vehicle</label>
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={(e) => handleSelectChange("vehicle", e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Select Vehicle</option>
            {vehicleNumbers.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sales Rep</label>
          <select
            name="salesRep"
            value={formData.salesRep}
            onChange={(e) => handleSelectChange("salesRep", e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Select Sales Rep</option>
            <option value="Ahmed Khalil">Ahmed Khalil</option>
            <option value="Fatima Al-Thani">Fatima Al-Thani</option>
            <option value="Yousef Al-Abdulla">Yousef Al-Abdulla</option>
            <option value="Mr. Lahiru Chathuranga">Mr. Lahiru Chathuranga</option>
            <option value="Mr. Ali Hussain">Mr. Ali Hussain</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Driver</label>
          <select
            name="driver"
            value={formData.driver}
            onChange={(e) => handleSelectChange("driver", e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Select Driver</option>
            <option value="ASHOKA">ASHOKA</option>
            <option value="KANAYA">KANAYA</option>
            <option value="SALIEH">SALIEH</option>
            <option value="ABDULLAH">ABDULLAH</option>
            <option value="IDRIS KARAR">IDRIS KARAR</option>
            <option value="JOHNY VENAKADY">JOHNY VENAKADY</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Helper</label>
          <select
            name="helper"
            value={formData.helper}
            onChange={(e) => handleSelectChange("helper", e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Select Helper</option>
            <option value="Ahmed Khalil">Ahmed Khalil</option>
            <option value="Fatima Al-Thani">Fatima Al-Thani</option>
            <option value="Yousef Al-Abdulla">Yousef Al-Abdulla</option>
            <option value="Mr. Lahiru Chathuranga">Mr. Lahiru Chathuranga</option>
            <option value="Mr. Ali Hussain">Mr. Ali Hussain</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Schedule Date</label>
          <input 
            type="date" 
            name="scheduleDate" 
            value={formData.scheduleDate} 
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={handlePrint} className="bg-blue-600">
          Print Schedule
        </Button>
      </div>
    </div>
  );
};

export default ScheduleForm;
