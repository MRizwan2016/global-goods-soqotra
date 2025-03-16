
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

import {
  useToast as useToastOriginal,
} from "@/components/ui/use-toast"

export type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastActionElement>

type ToastPropsWithoutId = Omit<ToastProps, "id">

interface UseToastProps {
  toast: (props: ToastPropsWithoutId) => void
  dismiss: (toastId?: string) => void
  toasts: Toast[]
}

export const toast = (props: ToastPropsWithoutId) => {
  const { toast } = useToastOriginal()
  toast(props)
}

export const useToast = (): UseToastProps => {
  return useToastOriginal()
}
