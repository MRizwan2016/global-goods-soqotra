
import { ComponentType } from "react";

export interface RouteConfig {
  path: string;
  element: ComponentType<any>;
  private?: boolean;
}
