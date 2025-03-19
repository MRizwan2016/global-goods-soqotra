
import React, { useState, useEffect } from "react";
import { mockJobs } from "./data/mockJobData";
import PrintJobSchedule from "./components/print/PrintJobSchedule";
import { Button } from "@/components/ui/button";
import { Truck, MapPin } from "lucide-react";
import { groupBy } from "lodash";
import { QatarJob } from "./types/jobTypes";
import { Badge } from "@/components/ui/badge";
import { cityVehicleMapping } from "./data/cityVehicleMapping";
import { toast } from "sonner";

const JobSchedulePrint: React.FC = () => {
  // Group jobs by vehicle
  const jobsByVehicle = groupBy(mockJobs, 'vehicle');
  const vehicleNumbers = Object.keys(jobsByVehicle).filter(v => v); // Filter out empty vehicle values
  
  // Group jobs by city
  const jobsByCity = groupBy(mockJobs, 'city');
  const cityNames = Object.keys(jobsByCity).filter(c => c); // Filter out empty city values
  
  const [viewMode, setViewMode] = useState<'vehicle' | 'city'>('vehicle');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    vehicleNumbers.length > 0 ? vehicleNumbers[0] : null
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(
    cityNames.length > 0 ? cityNames[0] : null
  );

  // Get jobs for the selected vehicle or city
  const selectedJobs = viewMode === 'vehicle' && selectedVehicle 
    ? jobsByVehicle[selectedVehicle] || []
    : viewMode === 'city' && selectedCity
      ? jobsByCity[selectedCity] || []
      : [];
  
  // Add sequence numbers to jobs
  const jobsWithSequence = selectedJobs.map((job, index) => ({
    ...job,
    sequenceNum: index + 1
  }));

  // Form data for the schedule
  const [formData, setFormData] = useState({
    scheduleNumber: Math.floor(Math.random() * 10000).toString(),
    vehicle: selectedVehicle || "",
    salesRep: "",
    driver: "",
    helper: "",
    scheduleDate: new Date().toISOString().split('T')[0],
    city: selectedCity || ""
  });

  // Update form data when vehicle or city selection changes
  useEffect(() => {
    if (viewMode === 'vehicle' && selectedVehicle) {
      setFormData(prev => ({
        ...prev,
        vehicle: selectedVehicle,
        city: ""
      }));
    } else if (viewMode === 'city' && selectedCity) {
      const recommendedVehicles = cityVehicleMapping[selectedCity] || [];
      setFormData(prev => ({
        ...prev,
        city: selectedCity,
        vehicle: recommendedVehicles.length > 0 ? recommendedVehicles[0] : prev.vehicle
      }));
    }
  }, [viewMode, selectedVehicle, selectedCity]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrint = () => {
    if (!formData.vehicle) {
      toast.error("Please select a vehicle before printing");
      return;
    }
    if (!formData.driver) {
      toast.warning("Driver information is missing");
    }
    if (!formData.salesRep) {
      toast.warning("Sales Rep information is missing");
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="p-4 print:hidden">
        <h2 className="text-xl font-bold mb-4">Job Schedule Print</h2>
        
        {/* View toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={viewMode === 'vehicle' ? "default" : "outline"}
            onClick={() => setViewMode('vehicle')}
            className="flex gap-2 items-center"
          >
            <Truck size={16} />
            By Vehicle
          </Button>
          <Button
            variant={viewMode === 'city' ? "default" : "outline"}
            onClick={() => setViewMode('city')}
            className="flex gap-2 items-center"
          >
            <MapPin size={16} />
            By City
          </Button>
        </div>
        
        {/* Vehicle Selection */}
        {viewMode === 'vehicle' && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select Vehicle:</h3>
            <div className="flex flex-wrap gap-2">
              {vehicleNumbers.length > 0 ? (
                vehicleNumbers.map(vehicle => (
                  <Button
                    key={vehicle}
                    variant={selectedVehicle === vehicle ? "default" : "outline"}
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                    }}
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
        )}
        
        {/* City Selection */}
        {viewMode === 'city' && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select City:</h3>
            <div className="flex flex-wrap gap-2">
              {cityNames.length > 0 ? (
                cityNames.map(city => {
                  const recommendedVehicle = cityVehicleMapping[city]?.[0];
                  return (
                    <Button
                      key={city}
                      variant={selectedCity === city ? "default" : "outline"}
                      onClick={() => setSelectedCity(city)}
                      className="mb-2"
                    >
                      {city} ({jobsByCity[city].length} jobs)
                      {recommendedVehicle && (
                        <Badge className="ml-2">Truck: {recommendedVehicle}</Badge>
                      )}
                    </Button>
                  );
                })
              ) : (
                <p>No cities with assigned jobs found</p>
              )}
            </div>
          </div>
        )}

        {/* Schedule Information Form */}
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
      </div>

      {(selectedVehicle || selectedCity) ? (
        <PrintJobSchedule 
          jobs={jobsWithSequence} 
          scheduleData={formData}
        />
      ) : (
        <div className="p-8 text-center">
          <p>Select a {viewMode === 'vehicle' ? 'vehicle' : 'city'} to generate a job schedule</p>
        </div>
      )}
    </div>
  );
};

export default JobSchedulePrint;
