
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import JobForm from "./components/JobForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";

const NewJobForm = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleCreateJob = (jobData: any) => {
    setIsSaving(true);
    console.log("Creating new job:", jobData);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Here you would normally submit the data to an API
      toast.success("Job created successfully!");
      setIsSaving(false);
      navigate("/qatar");
    }, 800);
  };
  
  return (
    <Layout title="Create New Qatar Job">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">ADD NEW JOB</h1>
            <p className="text-gray-500">CREATE A NEW COLLECTION OR DELIVERY OF PERSONAL EFFECTS & HOUSEHOLD GOODS</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/qatar")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button 
              onClick={() => document.getElementById('job-form')?.dispatchEvent(new Event('submit', { bubbles: true }))}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save Job
            </Button>
          </div>
        </div>
        
        <JobForm 
          isNewJob={true}
          onSubmit={handleCreateJob}
          isSaving={isSaving}
        />
      </div>
    </Layout>
  );
};

export default NewJobForm;
