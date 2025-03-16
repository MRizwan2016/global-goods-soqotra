
import { useContext } from "react";
import { ToastActionElement, type ToastProps } from "@/components/ui/toast";
import {
  ToastContext,
  ToastContextType
} from "@/components/ui/toast";

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { ToastAction, type ToastActionElement } from "@/components/ui/toast";

export type Toast = ToastProps;
