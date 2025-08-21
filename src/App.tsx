
import { Toaster } from "sonner";
import AppRoutes from "@/components/routing/AppRoutes";
import { useAutoBackup } from "@/hooks/useAutoBackup";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Import CSS
import "./App.css";

function App() {
  // Enable auto-backup every 30 minutes
  useAutoBackup(30, true);

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen w-full bg-white">
          <Toaster position="top-right" />
          <AppRoutes />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
