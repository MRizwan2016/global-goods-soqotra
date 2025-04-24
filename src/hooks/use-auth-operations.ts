
import { User } from "@/types/auth";
import { useLogin } from "./auth/use-login";
import { useRegistration } from "./auth/use-registration";
import { usePasswordReset } from "./auth/use-password-reset";

export function useAuthOperations(
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const { login, logout } = useLogin(users, setCurrentUser);
  const { register } = useRegistration(users, setUsers);
  const { requestPasswordReset, resetPassword } = usePasswordReset(users);

  return {
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword
  };
}
