
import { ComponentType } from "react";

export interface RouteConfig {
  path: string;
  element: ComponentType<any>;
  private?: boolean;
  title?: string;  // Optional title for the route
  requiredFile?: string; // Optional file permission requirement
}
