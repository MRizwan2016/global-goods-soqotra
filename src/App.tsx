
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import AppRoutes from "@/components/routing/AppRoutes";

// Import CSS
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-white">
        <Toaster position="top-right" />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
