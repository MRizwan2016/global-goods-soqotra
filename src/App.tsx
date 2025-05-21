
import { Toaster } from "sonner";
import AppRoutes from "@/components/routing/AppRoutes";

// Import CSS
import "./App.css";

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}

export default App;
