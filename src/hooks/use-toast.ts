
import { useContext, useState } from "react";
import { 
  ToastActionElement, 
  type ToastProps, 
  ToastContext, 
  ToastContextType 
} from "@/components/ui/toast";
import { createContext } from "react";

// Define a unique id generator for toasts
let toastCount = 0;
function generateToastId() {
  return `toast-${toastCount++}`;
}

// Create a provider component
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (props: Omit<ToastProps, "id">) => {
    const id = props.id || generateToastId();
    setToasts((prevToasts) => [...prevToasts, { ...props, id }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => 
      prevToasts.map((toast) => 
        toast.id === id ? { ...toast, open: false } : toast
      )
    );
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const value = {
    toasts,
    addToast,
    dismissToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

// Export the useToast hook
export function useToast(): {
  toast: (props: Omit<ToastProps, "id">) => void;
  toasts: ToastProps[];
  dismissToast: (id: string) => void;
  removeToast: (id: string) => void;
} {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  // Return a simplified interface
  return {
    toast: context.addToast,
    toasts: context.toasts,
    dismissToast: context.dismissToast,
    removeToast: context.removeToast,
  };
}

// Create a standalone toast function for direct usage
export const toast = (props: Omit<ToastProps, "id">) => {
  // This is a placeholder that will be properly initialized by the provider
  // It prevents circular dependencies but allows imports to work
  console.warn("Toast used outside of provider context");
};

export { ToastAction, type ToastActionElement } from "@/components/ui/toast";

export type Toast = ToastProps;
