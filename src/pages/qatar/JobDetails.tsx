
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { mockJobs } from "./data/mockJobData";
import { QatarJob } from "./types/jobTypes";
import JobForm from "./components/JobForm";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<QatarJob | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you would fetch the job data from an API
    // For now, we'll simulate this with our mock data
    const fetchJob = () => {
      setLoading(true);
      setTimeout(() => {
        const foundJob = mockJobs.find(j => j.id === id);
        if (foundJob) {
          setJob(foundJob);
        } else {
          toast.error("Job not found!");
          navigate("/qatar");
        }
        setLoading(false);
      }, 300);
    };
    
    fetchJob();
  }, [id, navigate]);
  
  const handleUpdateJob = (jobData: any) => {
    console.log("Updating job:", jobData);
    
    // Here you would normally submit the data to an API
    // For now, we'll just simulate success and navigate back
    
    toast.success("Job updated successfully!");
    navigate("/qatar");
  };
  
  if (loading) {
    return (
      <Layout title="Job Details">
        <div className="flex justify-center items-center h-64">
          <p>LOADING JOB DETAILS...</p>
        </div>
      </Layout>
    );
  }
  
  if (!job) {
    return (
      <Layout title="Job Details">
        <div className="flex justify-center items-center h-64">
          <p>JOB NOT FOUND</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={`Job ${job.jobNumber} - ${job.jobType}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">JOB DETAILS: {job.jobNumber}</h1>
            <p className="text-gray-500">{job.jobType} JOB - {job.date}</p>
          </div>
        </div>
        
        <JobForm 
          jobId={job.id}
          onSubmit={handleUpdateJob}
        />
      </div>
    </Layout>
  );
};

export default JobDetails;
