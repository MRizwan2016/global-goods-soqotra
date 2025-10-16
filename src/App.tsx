
import { Toaster } from "sonner";
import AppRoutes from "@/components/routing/AppRoutes";
import { useAutoBackup } from "@/hooks/useAutoBackup";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import CSS
import "./App.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  // Enable auto-backup every 30 minutes
  useAutoBackup(30, true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen w-full bg-white">
            <Toaster position="top-right" />
            <AppRoutes />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
