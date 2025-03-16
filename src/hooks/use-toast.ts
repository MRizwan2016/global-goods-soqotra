
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

import {
  useToast as useToastOriginal,
} from "@/components/ui/use-toast"

// Fix #1: Use React.ComponentProps instead of ComponentPropsWithoutRef with a type
export type ToastActionProps = React.ComponentProps<typeof ToastActionElement>

// Fix #2: Add description property to accommodate how it's being used
type ToastPropsWithoutId = Omit<ToastProps, "id"> & {
  description?: React.ReactNode
}

interface UseToastProps {
  toast: (props: ToastPropsWithoutId) => void
  dismiss: (toastId?: string) => void
  // Fix #3: Use the correct type for toasts array
  toasts: ReturnType<typeof useToastOriginal>["toasts"]
}

export const toast = (props: ToastPropsWithoutId) => {
  const { toast } = useToastOriginal()
  toast(props)
}

export const useToast = (): UseToastProps => {
  return useToastOriginal()
}
