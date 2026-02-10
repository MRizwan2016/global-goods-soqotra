
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { QatarJob } from "./types/jobTypes";
import JobForm from "./components/JobForm";
import { JobStorageService } from "./services/JobStorageService";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import JobCloseDialog from "./components/job-tracking/JobCloseDialog";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<QatarJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  
  useEffect(() => {
    // Fetch the job data from JobStorageService
    const fetchJob = () => {
      setLoading(true);
      
      if (id) {
        console.log("Fetching job with ID:", id);
        const foundJob = JobStorageService.getJobById(id);
        if (foundJob) {
          console.log("Found job:", foundJob);
          setJob(foundJob);
        } else {
          console.error("Job not found for ID:", id);
          toast.error("Job not found!");
          navigate("/qatar");
        }
      } else {
        console.error("No job ID provided");
        toast.error("No job ID provided!");
        navigate("/qatar");
      }
      
      setLoading(false);
    };
    
    fetchJob();
  }, [id, navigate]);
  
  const handleUpdateJob = (jobData: any) => {
    if (!id) return;
    
    // Prevent updating if job is completed or cancelled
    if (job?.status === "COMPLETED" || job?.status === "CANCELLED") {
      toast.error("Cannot update a completed or cancelled job");
      return;
    }
    
    console.log("Updating job:", jobData);
    
    try {
      const updatedJob = JobStorageService.updateJob(id, jobData);
      if (updatedJob) {
        toast.success("Job updated successfully!");
        navigate("/qatar");
      } else {
        toast.error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("An error occurred while updating the job");
    }
  };

  const handleCompleteJob = () => {
    if (job?.status === "COMPLETED" || job?.status === "CANCELLED") {
      toast.error("This job has already been completed or cancelled");
      return;
    }
    
    setShowCloseDialog(true);
  };

  const handleCancelJob = () => {
    if (job?.status === "COMPLETED" || job?.status === "CANCELLED") {
      toast.error("This job has already been completed or cancelled");
      return;
    }
    
    setShowCloseDialog(true);
  };

  const handleJobClosed = () => {
    // Refresh job data
    if (id) {
      const updatedJob = JobStorageService.getJobById(id);
      if (updatedJob) {
        setJob(updatedJob);
        toast.success(`Job ${updatedJob.jobNumber} status updated`);
      }
    }
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

  const isJobReadOnly = job.status === "COMPLETED" || job.status === "CANCELLED";
  
  return (
    <Layout title={`Job ${job.jobNumber} - ${job.jobType}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">JOB DETAILS: {job.jobNumber}</h1>
            <p className="text-gray-500">{job.jobType} JOB - {job.date}</p>
            {isJobReadOnly && (
              <p className="text-amber-600 mt-1 font-semibold">
                This job is {job.status.toLowerCase()} and cannot be modified
              </p>
            )}
          </div>
          
          {!isJobReadOnly && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleCancelJob}
              >
                <XCircle className="mr-1 h-4 w-4" />
                Cancel Job
              </Button>
              
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleCompleteJob}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Complete Job
              </Button>
            </div>
          )}
        </div>
        
        <JobForm 
          jobId={job.id}
          onSubmit={handleUpdateJob}
          readOnly={isJobReadOnly}
        />

        {job && (
          <JobCloseDialog
            isOpen={showCloseDialog}
            onClose={() => setShowCloseDialog(false)}
            jobId={job.id}
            jobNumber={job.jobNumber}
            onSuccess={handleJobClosed}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobDetails;
