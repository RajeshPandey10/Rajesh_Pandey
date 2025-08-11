import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./components/Header";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import ManageGallery from "./admin/ManageGallery";

const Home = lazy(() => import("./components/Home"));
const Skills = lazy(() => import("./components/Skill"));
const About = lazy(() => import("./components/About"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const ManageProjects = lazy(() => import("./admin/ManageProjects"));
const ManageContacts = lazy(() => import("./admin/ManageContacts"));
const ManageTestimonials = lazy(() => import("./admin/ManageTestimonials"));


const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Hide Header for Admin Routes
  const hideHeader = location.pathname.startsWith("/admin");
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="bg-black text-white">
          {!hideHeader && <Header />}
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />

           
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <ManageProjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/gallery"
                element={
                  <ProtectedRoute>
                    <ManageGallery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contacts"
                element={
                  <ProtectedRoute>
                    <ManageContacts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <ProtectedRoute>
                    <ManageTestimonials />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
          {!hideFooter && <Footer />}
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
