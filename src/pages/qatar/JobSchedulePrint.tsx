
import React, { useState } from "react";
import { mockJobs } from "./data/mockJobData";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import { Button } from "@/components/ui/button";
import { groupBy } from "lodash";
import { QatarJob } from "./types/jobTypes";

const JobSchedulePrint: React.FC = () => {
  // Group jobs by vehicle
  const jobsByVehicle = groupBy(mockJobs, 'vehicle');
  const vehicleNumbers = Object.keys(jobsByVehicle).filter(v => v); // Filter out empty vehicle values
  
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    vehicleNumbers.length > 0 ? vehicleNumbers[0] : null
  );

  // Get jobs for the selected vehicle
  const selectedJobs = selectedVehicle ? jobsByVehicle[selectedVehicle] || [] : [];
  
  // Add sequence numbers to jobs
  const jobsWithSequence = selectedJobs.map((job, index) => ({
    ...job,
    sequenceNum: index + 1
  }));

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="p-4 print:hidden">
        <h2 className="text-xl font-bold mb-4">Select Vehicle for Job Schedule</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {vehicleNumbers.length > 0 ? (
            vehicleNumbers.map(vehicle => (
              <Button
                key={vehicle}
                variant={selectedVehicle === vehicle ? "default" : "outline"}
                onClick={() => setSelectedVehicle(vehicle)}
                className="mb-2"
              >
                {vehicle} ({jobsByVehicle[vehicle].length} jobs)
              </Button>
            ))
          ) : (
            <p>No vehicles with assigned jobs found</p>
          )}
        </div>
      </div>

      {selectedVehicle ? (
        <PrintJobSchedule 
          jobs={jobsWithSequence} 
          scheduleData={{ vehicle: selectedVehicle }}
        />
      ) : (
        <div className="p-8 text-center">
          <p>Select a vehicle to generate a job schedule</p>
        </div>
      )}
    </div>
  );
};

export default JobSchedulePrint;
