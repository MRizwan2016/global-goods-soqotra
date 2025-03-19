
import React, { useState, useEffect } from "react";
import { mockJobs } from "./data/mockJobData";
import JobScheduleForm from "./components/job-generate/job-schedule-form";
import JobSelectionTable from "./components/job-generate/JobSelectionTable";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import JobFilters from "./components/job-generate/JobFilters";
import { useJobFiltering } from "./hooks/useJobFiltering";
import { useJobSelection } from "./hooks/useJobSelection";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Truck, MapPin } from "lucide-react";
import { groupBy } from "lodash";
import { QatarJob } from "./types/jobTypes";
import { Badge } from "@/components/ui/badge";

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
  const [showCityView, setShowCityView] = useState(false);
  
  // Group selected jobs by vehicle
  const jobsByVehicle = groupBy(selectedJobs, 'vehicle');
  const vehicleNumbers = Object.keys(jobsByVehicle).filter(v => v); // Filter out empty vehicle values
  
  // Group selected jobs by city
  const jobsByCity = groupBy(selectedJobs, 'city');
  const cityNames = Object.keys(jobsByCity).filter(c => c); // Filter out empty city values

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Get jobs for the selected vehicle
  const selectedVehicleJobs = selectedVehicle && jobsByVehicle[selectedVehicle] 
    ? jobsByVehicle[selectedVehicle].map((job, index) => ({ ...job, sequenceNum: index + 1 }))
    : [];

  // Get jobs for the selected city
  const selectedCityJobs = selectedCity && jobsByCity[selectedCity]
    ? jobsByCity[selectedCity].map((job, index) => ({ ...job, sequenceNum: index + 1 }))
    : [];

  const toggleVehicleView = () => {
    if (showCityView) setShowCityView(false);
    
    setShowVehicleView(!showVehicleView);
    if (!showVehicleView && vehicleNumbers.length > 0) {
      setSelectedVehicle(vehicleNumbers[0]);
    } else {
      setSelectedVehicle(null);
    }
  };
  
  const toggleCityView = () => {
    if (showVehicleView) setShowVehicleView(false);
    
    setShowCityView(!showCityView);
    if (!showCityView && cityNames.length > 0) {
      setSelectedCity(cityNames[0]);
    } else {
      setSelectedCity(null);
    }
  };
  
  // Update vehicle selection when jobs change
  useEffect(() => {
    if (showVehicleView && !selectedVehicle && vehicleNumbers.length > 0) {
      setSelectedVehicle(vehicleNumbers[0]);
    }
    if (showCityView && !selectedCity && cityNames.length > 0) {
      setSelectedCity(cityNames[0]);
    }
  }, [selectedJobs, showVehicleView, showCityView]);
  
  // Determine which jobs to use for form and print
  const jobsForSchedule = showVehicleView && selectedVehicle 
    ? selectedVehicleJobs 
    : showCityView && selectedCity 
      ? selectedCityJobs
      : selectedJobs;
  
  if (isPrintMode) {
    return (
      <PrintJobSchedule 
        jobs={jobsForSchedule.map((job, index) => ({...job, sequenceNum: index + 1}))}
        scheduleData={{
          ...scheduleData, 
          vehicle: selectedVehicle || scheduleData.vehicle,
          city: selectedCity || ''
        }}
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
          
          {/* Grouping Toggle Buttons */}
          {selectedJobs.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <Button 
                onClick={toggleVehicleView}
                variant="outline"
                className={showVehicleView ? "bg-blue-50" : ""}
              >
                <Truck className="mr-2 h-4 w-4" />
                {showVehicleView ? "Show All Jobs" : "Group by Vehicle"}
              </Button>
              
              <Button 
                onClick={toggleCityView}
                variant="outline"
                className={showCityView ? "bg-blue-50" : ""}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {showCityView ? "Show All Jobs" : "Group by City"}
              </Button>
              
              {/* Vehicle Selection */}
              {showVehicleView && (
                <div className="flex-1 p-4 border rounded-md bg-gray-50">
                  <h3 className="font-bold mb-2">Select Vehicle:</h3>
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
              
              {/* City Selection */}
              {showCityView && (
                <div className="flex-1 p-4 border rounded-md bg-gray-50">
                  <h3 className="font-bold mb-2">Select City:</h3>
                  <div className="flex flex-wrap gap-2">
                    {cityNames.length > 0 ? (
                      cityNames.map(city => (
                        <Button
                          key={city}
                          variant={selectedCity === city ? "default" : "outline"}
                          onClick={() => setSelectedCity(city)}
                          className="mb-2"
                          size="sm"
                        >
                          {city} ({jobsByCity[city].length} jobs)
                          {city === 'DOH' && <Badge className="ml-2 bg-blue-600">Truck: 41067</Badge>}
                          {city === 'RAK' && <Badge className="ml-2 bg-green-600">Truck: 41070</Badge>}
                          {city === 'WAK' && <Badge className="ml-2 bg-amber-600">Truck: 41073</Badge>}
                        </Button>
                      ))
                    ) : (
                      <p>No cities assigned to selected jobs</p>
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
                selectedJobs={jobsForSchedule}
                disabled={(showVehicleView && !selectedVehicle) || 
                          (showCityView && !selectedCity) || 
                          selectedJobs.length === 0}
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
