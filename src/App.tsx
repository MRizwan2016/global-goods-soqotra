
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import AppRoutes from "@/components/routing/AppRoutes";

// Import CSS
import "./App.css";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AppRoutes />
    </Router>
  );
}

export default App;
