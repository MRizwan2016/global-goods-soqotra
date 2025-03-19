
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import AppRoutes from "@/components/routing/AppRoutes";

// Import CSS
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50">
        <Toaster position="top-right" />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
