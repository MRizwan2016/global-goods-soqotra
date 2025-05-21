
import { Toaster } from "sonner";
import AppRoutes from "@/components/routing/AppRoutes";
import { AuthProvider } from "@/contexts/AuthContext";

// Import CSS
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen w-full bg-white">
        <Toaster position="top-right" />
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
