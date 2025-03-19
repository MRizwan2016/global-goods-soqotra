
import QatarDashboard from "@/pages/qatar/QatarDashboard";
import JobTracking from "@/pages/qatar/JobTracking";
import JobDetails from "@/pages/qatar/JobDetails";
import NewJobForm from "@/pages/qatar/NewJobForm";
import JobSchedulePrint from "@/pages/qatar/JobSchedulePrint";
import { RouteConfig } from "./types";

export const qatarRoutes: RouteConfig[] = [
  {
    path: "/qatar",
    element: QatarDashboard,
    private: true
  },
  {
    path: "/qatar/jobs",
    element: JobTracking,
    private: true
  },
  {
    path: "/qatar/job/:id",
    element: JobDetails,
    private: true
  },
  {
    path: "/qatar/job/new",
    element: NewJobForm,
    private: true
  },
  {
    path: "/qatar/jobs/print",
    element: JobSchedulePrint,
    private: true
  }
];
