import { lazy } from "react";

interface Route {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  title: string;
}

// Lazy load schedule components
const ViewSchedules = lazy(() => import("../pages/schedules/ViewSchedules"));
const DisplaySchedule = lazy(() => import("../pages/schedules/DisplaySchedule"));
const PrintSchedule = lazy(() => import("../pages/schedules/PrintSchedule"));

export const scheduleRoutes: Route[] = [
  {
    path: "/schedules",
    element: ViewSchedules,
    title: "View Schedules"
  },
  {
    path: "/schedules/display/:scheduleId",
    element: DisplaySchedule,
    title: "Display Schedule"
  },
  {
    path: "/schedules/print/:scheduleId",
    element: PrintSchedule,
    title: "Print Schedule"
  }
];

export const countryScheduleRoutes = (countryPrefix: string): Route[] => [
  {
    path: `/${countryPrefix}/schedules`,
    element: ViewSchedules,
    title: "View Schedules"
  },
  {
    path: `/${countryPrefix}/schedules/display/:scheduleId`,
    element: DisplaySchedule,
    title: "Display Schedule"
  },
  {
    path: `/${countryPrefix}/schedules/print/:scheduleId`,
    element: PrintSchedule,
    title: "Print Schedule"
  }
];