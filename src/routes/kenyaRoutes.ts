
import KenyaDashboard from "@/pages/kenya/KenyaDashboard";
import KenyaDeliveryTracking from "@/pages/kenya/KenyaDeliveryTracking";
import DeliveryDetails from "@/pages/kenya/DeliveryDetails";
import NewDeliveryForm from "@/pages/kenya/NewDeliveryForm";
import { RouteConfig } from "./types";

export const kenyaRoutes: RouteConfig[] = [
  {
    path: "/kenya",
    element: KenyaDashboard,
    private: true
  },
  {
    path: "/kenya/deliveries",
    element: KenyaDeliveryTracking,
    private: true
  },
  {
    path: "/kenya/delivery/:id",
    element: DeliveryDetails,
    private: true
  },
  {
    path: "/kenya/delivery/new",
    element: NewDeliveryForm,
    private: true
  }
];
