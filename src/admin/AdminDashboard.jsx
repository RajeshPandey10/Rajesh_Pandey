import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ManageProjects from "./ManageProjects";
import AuthContext from "../context/AuthContext";
import { fetchContacts, replyToContact } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { adminToken } = useContext(AuthContext);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts(adminToken);
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to fetch contacts.");
      }
    };
    loadContacts();
  }, [adminToken]);

  const handleReply = async (email) => {
    try {
      const message = prompt("Enter your reply message:");
      if (!message) return;
      await replyToContact(email, message, adminToken);
      toast.success(`Reply sent to ${email}`);
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply.");
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Manage Contacts</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h4 className="text-lg font-bold">{contact.name}</h4>
            <p className="text-sm text-gray-400">{contact.email}</p>
            <p className="text-sm text-gray-400">{contact.message}</p>
            <button
              onClick={() => handleReply(contact.email)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="container mx-auto p-6">
       
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <Routes>
         
            <Route
              index
              element={
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Welcome to the Admin Dashboard
                  </h2>
                
                </div>
              }
            />
               <Route path="projects" element={<ManageProjects />} />
               <Route path="contacts" element={<ManageContacts />} />
          </Routes>
          
          <div>
          <nav className="mb-6 flex space-x-4">
          <Link
            to="projects"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
          >
            Manage Projects
          </Link>
          <Link
            to="contacts"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
          >
            Manage Contacts
          </Link>
        </nav>
          </div>
        </div>
        
      </div>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;
