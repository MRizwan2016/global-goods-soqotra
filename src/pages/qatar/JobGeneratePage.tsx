
import React, { useState } from "react";
import { mockJobs } from "./data/mockJobData";
import JobScheduleForm from "./components/job-generate/job-schedule-form";
import JobSelectionTable from "./components/job-generate/JobSelectionTable";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import JobFilters from "./components/job-generate/JobFilters";
import { useJobFiltering } from "./hooks/useJobFiltering";
import { useJobSelection } from "./hooks/useJobSelection";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { groupBy } from "lodash";
import { QatarJob } from "./types/jobTypes";

const JobGeneratePage: React.FC = () => {
  // Use our custom hooks
  const {
    selectedJobs,
    isPrintMode,
    scheduleData,
    setScheduleData,
    toggleJobSelection,
    handleScheduleSubmit,
    handleBackFromPrint,
    handleCloseJobs,
    handleDirectPrint
  } = useJobSelection();
  
  const {
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filterDate,
    setFilterDate,
    filteredJobs
  } = useJobFiltering(mockJobs);
  
  const [showVehicleView, setShowVehicleView] = useState(false);
  
  // Group selected jobs by vehicle
  const jobsByVehicle = groupBy(selectedJobs, 'vehicle');
  const vehicleNumbers = Object.keys(jobsByVehicle).filter(v => v); // Filter out empty vehicle values
  
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Get jobs for the selected vehicle
  const selectedVehicleJobs = selectedVehicle && jobsByVehicle[selectedVehicle] 
    ? jobsByVehicle[selectedVehicle].map((job, index) => ({ ...job, sequenceNum: index + 1 }))
    : [];

  const toggleVehicleView = () => {
    setShowVehicleView(!showVehicleView);
    if (!showVehicleView && vehicleNumbers.length > 0) {
      setSelectedVehicle(vehicleNumbers[0]);
    } else {
      setSelectedVehicle(null);
    }
  };
  
  if (isPrintMode) {
    return (
      <PrintJobSchedule 
        jobs={selectedVehicle 
          ? selectedVehicleJobs 
          : selectedJobs.map((job, index) => ({...job, sequenceNum: index + 1}))}
        scheduleData={{...scheduleData, vehicle: selectedVehicle || scheduleData.vehicle}}
        onBack={handleBackFromPrint}
      />
    );
  }
  
  return (
    <Layout title="Job Schedule Generation">
      <div className="w-full">
        <div className="max-w-full mx-auto">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-10 mr-2" />
            SOQOTRA LOGISTICS - JOB SCHEDULE GENERATION
          </h1>
          
          {/* Filters */}
          <JobFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            selectedJobs={selectedJobs}
            onCloseJobs={handleCloseJobs}
            onPrintJobs={handleDirectPrint}
          />
          
          {/* Vehicle Grouping Toggle */}
          {selectedJobs.length > 0 && (
            <div className="mb-4">
              <Button 
                onClick={toggleVehicleView}
                variant="outline"
                className={showVehicleView ? "bg-blue-50" : ""}
              >
                <Truck className="mr-2 h-4 w-4" />
                {showVehicleView ? "Show All Jobs" : "Group by Vehicle"}
              </Button>
              
              {showVehicleView && (
                <div className="mt-2 p-4 border rounded-md bg-gray-50">
                  <h3 className="font-bold mb-2">Select Vehicle to Print:</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicleNumbers.length > 0 ? (
                      vehicleNumbers.map(vehicle => (
                        <Button
                          key={vehicle}
                          variant={selectedVehicle === vehicle ? "default" : "outline"}
                          onClick={() => setSelectedVehicle(vehicle)}
                          className="mb-2"
                          size="sm"
                        >
                          {vehicle} ({jobsByVehicle[vehicle].length} jobs)
                        </Button>
                      ))
                    ) : (
                      <p>No vehicles assigned to selected jobs</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-1">
              <JobScheduleForm 
                onSubmit={handleScheduleSubmit} 
                formData={scheduleData}
                setFormData={setScheduleData}
                selectedJobs={showVehicleView && selectedVehicle ? selectedVehicleJobs : selectedJobs}
                disabled={(showVehicleView && !selectedVehicle) || selectedJobs.length === 0}
              />
            </div>
            
            <div className="lg:col-span-3">
              <JobSelectionTable 
                jobs={filteredJobs} 
                selectedJobs={selectedJobs}
                onToggleSelect={toggleJobSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobGeneratePage;
