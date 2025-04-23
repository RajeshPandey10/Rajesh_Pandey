import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Loader from "./components/Loader.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Check if initial loading has already happened
    const hasLoaded = sessionStorage.getItem("hasInitiallyLoaded");

    if (hasLoaded) {
      // Skip loader if already loaded once in this session
      setLoading(false);
    } else {
      // Show loader only for the first load in this session
      const timer = setTimeout(() => {
        setLoading(false);
        // Mark that initial loading has happened
        sessionStorage.setItem("hasInitiallyLoaded", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
