import React, { useState, useEffect, useContext } from "react";
import { fetchContacts, replyToContact, deleteContact } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
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

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Reply message cannot be empty.");
      return;
    }

    try {
      await replyToContact(selectedContact._id, replyMessage, adminToken);
      toast.success(`Reply sent to ${selectedContact.email}`);
      setReplyMessage("");
      setSelectedContact(null); // Close the modal
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      await deleteContact(id, adminToken);
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully.");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h3 className="text-3xl font-bold mb-6 text-center">Manage Contacts</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h4 className="text-lg font-bold mb-2">{contact.name}</h4>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-semibold">Email:</span> {contact.email}
            </p>
            {contact.subject && (
              <p className="text-sm text-gray-400 mb-2">
                <span className="font-semibold">Subject:</span>{" "}
                {contact.subject}
              </p>
            )}
            <p className="text-sm text-gray-400 mb-4">
              <span className="font-semibold">Message:</span> {contact.message}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedContact(contact)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Reply
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
            <h3 className="text-xl font-bold mb-4">
              Reply to {selectedContact.name}
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-semibold">Email:</span>{" "}
              {selectedContact.email}
            </p>
            {selectedContact.subject && (
              <p className="text-sm text-gray-400 mb-4">
                <span className="font-semibold">Subject:</span>{" "}
                {selectedContact.subject}
              </p>
            )}
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
              className="w-full h-32 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={() => setSelectedContact(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageContacts;
