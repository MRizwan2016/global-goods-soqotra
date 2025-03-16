
import { ReactNode } from "react";

export interface PaymentMethodType {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  description: string;
  features: string[];
}
