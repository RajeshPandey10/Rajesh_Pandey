import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageContacts from "./admin/ManageContacts";
import Footer from "./components/Footer";

const Home = lazy(() => import("./components/Home"));
const Skills = lazy(() => import("./components/Skill"));
const About = lazy(() => import("./components/About"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const ManageProjects = lazy(() => import("./admin/ManageProjects"));
const Login = lazy(() => import("./admin/Login"));

const App = () => {
  const location = useLocation();

  // Hide Header for Admin Routes
  const hideHeader = location.pathname.startsWith("/admin");
  const hideFooter = location.pathname.startsWith("/admin");
  return (
    <div className="bg-black text-white">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="contacts" element={<ManageContacts />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
