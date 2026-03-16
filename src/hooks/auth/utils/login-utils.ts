
import { toast } from "sonner";

export const handleLoginFailure = () => {
  toast.error("Invalid email or password. Please check your credentials and try again.");
};
