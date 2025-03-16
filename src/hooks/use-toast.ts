import {
  Toast,
  ToastActionElement,
  ToastProps,
  ToastAction,
} from "@/components/ui/toast"

import {
  useToast as useToastOriginal,
} from "@/components/ui/use-toast"

// Fix #1: Define ToastActionProps properly using the ToastAction component
export type ToastActionProps = React.ComponentProps<typeof ToastAction>

// Fix #2: Keep the description property as it's being used
type ToastPropsWithoutId = Omit<ToastProps, "id"> & {
  description?: React.ReactNode
}

// Fix #3: Define UseToastProps without circular reference
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

export const toast = (props: ToastPropsWithoutId) => {
  const { toast } = useToastOriginal()
  toast(props)
}

export const useToast = (): UseToastProps => {
  return useToastOriginal()
}
