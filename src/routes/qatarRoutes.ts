
import QatarDashboard from "@/pages/qatar/QatarDashboard";
import JobTracking from "@/pages/qatar/JobTracking";
import JobDetails from "@/pages/qatar/JobDetails";
import NewJobForm from "@/pages/qatar/NewJobForm";
import JobSchedulePrint from "@/pages/qatar/JobSchedulePrint";
import JobGeneratePage from "@/pages/qatar/JobGeneratePage";
import VehicleManagement from "@/pages/qatar/VehicleManagement";
import DriverManagement from "@/pages/qatar/DriverManagement";
import FindCustomer from "@/pages/qatar/FindCustomer";
import ContainerManagement from "@/pages/qatar/ContainerManagement";
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
  },
  {
    path: "/qatar/jobs/generate",
    element: JobGeneratePage,
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
    private: true,
    requiredFile: "container"
  }
];
