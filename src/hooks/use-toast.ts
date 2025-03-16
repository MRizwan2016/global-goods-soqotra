import {
  Toast,
  ToastActionElement,
  ToastProps,
  ToastAction,
} from "@/components/ui/toast"

import {
  useToast as useToastOriginal,
} from "@/components/ui/use-toast"

// Define ToastActionProps properly using the ToastAction component
export type ToastActionProps = React.ComponentProps<typeof ToastAction>

// Keep the description property as it's being used
type ToastPropsWithoutId = Omit<ToastProps, "id"> & {
  description?: React.ReactNode
}

// Define UseToastProps with explicit type structure to avoid circular references
interface UseToastProps {
  toast: (props: ToastPropsWithoutId) => void
  dismiss: (toastId?: string) => void
  toasts: Array<{
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
    open: boolean;
  }>
}

// Use a separate function for toast outside of useToast
export const toast = (props: ToastPropsWithoutId) => {
  const { toast: originalToast } = useToastOriginal()
  originalToast(props)
}

// Fix the useToast function to properly return the original hook
export const useToast = (): UseToastProps => {
  return useToastOriginal()
}
