import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ManageProjects from "./ManageProjects";
import ManageTestimonials from "./ManageTestimonials";
import ManageGallery from "./ManageGallery";
import ManageContacts from "./ManageContacts";
import AuthContext from "../context/AuthContext";
import { fetchContacts } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import {
  FaProjectDiagram,
  FaQuoteLeft,
  FaImages,
  FaEnvelope,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const { adminToken, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts(adminToken);
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    if (adminToken) {
      loadContacts();
    }
  }, [adminToken]);

  const newContacts = contacts.filter(
    (contact) =>
      !contact.replied &&
      new Date(contact.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  const navItems = [
    { path: "/admin", icon: FaHome, label: "Dashboard", exact: true },
    {
      path: "/admin/projects",
      icon: FaProjectDiagram,
      label: "Manage Projects",
    },
    {
      path: "/admin/testimonials",
      icon: FaQuoteLeft,
      label: "Manage Testimonials",
    },
    { path: "/admin/gallery", icon: FaImages, label: "Manage Gallery" },
    {
      path: "/admin/contacts",
      icon: FaEnvelope,
      label: "Manage Contacts",
      badge: newContacts.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-400">
              Admin Dashboard
            </h1>
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 min-h-screen shadow-lg">
          <div className="p-6">
            <ul className="space-y-2">
              {navItems.map(({ path, icon: Icon, label, exact, badge }) => {
                const isActive = exact
                  ? location.pathname === path
                  : location.pathname.startsWith(path);

                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="text-lg" />
                        <span>{label}</span>
                      </div>
                      {badge > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center py-12">
                  <h2 className="text-4xl font-bold mb-6 text-blue-400">
                    Welcome to Admin Dashboard
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400">Total Contacts</p>
                          <p className="text-2xl font-bold">
                            {contacts.length}
                          </p>
                        </div>
                        <FaEnvelope className="text-3xl text-blue-400" />
                      </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400">New Contacts</p>
                          <p className="text-2xl font-bold text-green-400">
                            {newContacts.length}
                          </p>
                        </div>
                        <FaEnvelope className="text-3xl text-green-400" />
                      </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400">Projects</p>
                          <p className="text-2xl font-bold">-</p>
                        </div>
                        <FaProjectDiagram className="text-3xl text-purple-400" />
                      </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400">Gallery Items</p>
                          <p className="text-2xl font-bold">-</p>
                        </div>
                        <FaImages className="text-3xl text-yellow-400" />
                      </div>
                    </div>
                  </div>
                  {newContacts.length > 0 && (
                    <div className="mt-8 p-4 bg-green-900 border border-green-600 rounded-lg">
                      <p className="text-green-300 font-semibold">
                        🎉 You have {newContacts.length} new contact message(s)!
                      </p>
                    </div>
                  )}
                </div>
              }
            />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="contacts" element={<ManageContacts />} />
          </Routes>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;
