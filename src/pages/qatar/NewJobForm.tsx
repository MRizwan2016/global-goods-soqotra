
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import JobForm from "./components/JobForm";

const NewJobForm = () => {
  const navigate = useNavigate();
  
  const handleCreateJob = (jobData: any) => {
    console.log("Creating new job:", jobData);
    
    // Here you would normally submit the data to an API
    // For now, we'll just simulate success and navigate back
    
    toast.success("Job created successfully!");
    navigate("/qatar");
  };
  
  return (
    <Layout title="Create New Qatar Job">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">ADD NEW JOB</h1>
            <p className="text-gray-500">CREATE A NEW COLLECTION OR DELIVERY JOB</p>
          </div>
        </div>
        
        <JobForm 
          isNewJob={true}
          onSubmit={handleCreateJob}
        />
      </div>
    </Layout>
  );
};

export default NewJobForm;
