
import { lazy } from "react";
import QatarDashboard from "@/pages/qatar/QatarDashboard";
import NewJobForm from "@/pages/qatar/NewJobForm";
import JobTracking from "@/pages/qatar/JobTracking";
import JobDetails from "@/pages/qatar/JobDetails";
import JobGeneratePage from "@/pages/qatar/JobGeneratePage";
import JobSchedulePrint from "@/pages/qatar/JobSchedulePrint";
import VehicleManagement from "@/pages/qatar/VehicleManagement";
import DriverManagement from "@/pages/qatar/DriverManagement";
import FindCustomer from "@/pages/qatar/FindCustomer";
import ContainerManagement from "@/pages/qatar/ContainerManagement";
import VesselManagement from "@/pages/qatar/VesselManagement";
import CargoManifest from "@/pages/qatar/CargoManifest";
import CompletedJobs from "@/pages/qatar/CompletedJobs";
import CancelledJobs from "@/pages/qatar/CancelledJobs";
import JobStatusList from "@/pages/qatar/JobStatusList";
import { RouteConfig } from "./types";

// Define the routes for the Qatar section
export const qatarRoutes: RouteConfig[] = [
  {
    path: "/qatar",
    element: QatarDashboard,
    private: true
  },
  {
    path: "/qatar/job/new",
    element: NewJobForm,
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
    path: "/qatar/jobs/generate",
    element: JobGeneratePage,
    private: true
  },
  {
    path: "/qatar/jobs/print",
    element: JobSchedulePrint,
    private: true
  },
  {
    path: "/qatar/vehicles",
    element: VehicleManagement,
    private: true
  },
  {
    path: "/qatar/drivers",
    element: DriverManagement,
    private: true
  },
  {
    path: "/qatar/find-customer",
    element: FindCustomer,
    private: true
  },
  {
    path: "/qatar/containers",
    element: ContainerManagement,
    private: true
  },
  {
    path: "/qatar/vessels",
    element: VesselManagement,
    private: true
  },
  {
    path: "/qatar/cargo-manifest",
    element: CargoManifest,
    private: true
  },
  // New routes for reports
  {
    path: "/qatar/completed-jobs",
    element: CompletedJobs,
    private: true
  },
  {
    path: "/qatar/cancelled-jobs",
    element: CancelledJobs,
    private: true
  },
  {
    path: "/qatar/job-status",
    element: JobStatusList,
    private: true
  }
];
