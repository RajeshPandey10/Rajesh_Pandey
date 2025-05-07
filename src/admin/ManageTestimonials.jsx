import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
  updateTestimonial,
} from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEdit,
  FaStarHalf,
} from "react-icons/fa";
import { getImageUrl } from "../utils/imageUtils";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
    rating: 5,
  });

  const { token } = useAuth();

  useEffect(() => {
    loadTestimonials();
  }, [token]);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await fetchAllTestimonials(token);
      setTestimonials(data);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTestimonialStatus(id, status, token);
      // Update local state
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial._id === id ? { ...testimonial, status } : testimonial
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial(id, token);
        setTestimonials(testimonials.filter((t) => t._id !== id));
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      email: testimonial.email,
      role: testimonial.role,
      message: testimonial.message,
      rating: testimonial.rating,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTestimonial(editingTestimonial._id, formData, token);
      // Update the testimonial in local state
      setTestimonials(
        testimonials.map((t) =>
          t._id === editingTestimonial._id ? { ...t, ...formData } : t
        )
      );
      // Close edit form
      setEditingTestimonial(null);
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const cancelEdit = () => {
    setEditingTestimonial(null);
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (activeFilter === "all") return true;
    return testimonial.status === activeFilter;
  });

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Manage Testimonials
      </h1>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-md ${
            activeFilter === "all"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("pending")}
          className={`px-4 py-2 rounded-md ${
            activeFilter === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveFilter("approved")}
          className={`px-4 py-2 rounded-md ${
            activeFilter === "approved"
              ? "bg-green-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setActiveFilter("rejected")}
          className={`px-4 py-2 rounded-md ${
            activeFilter === "rejected"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <>
          {/* Edit Form */}
          <AnimatePresence>
            {editingTestimonial && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-4 text-purple-400">
                    Edit Testimonial
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Rating (1-5)
                        </label>
                        <input
                          type="number"
                          name="rating"
                          min="1"
                          max="5"
                          step="0.5"
                          value={formData.rating}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Testimonial Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                      >
                        Update Testimonial
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Testimonials Grid */}
          {filteredTestimonials.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No testimonials found for the selected filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-gray-800 border rounded-lg overflow-hidden shadow-lg ${
                      testimonial.status === "pending"
                        ? "border-yellow-600"
                        : testimonial.status === "approved"
                        ? "border-green-600"
                        : "border-red-600"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 mr-4">
                          {testimonial.photo ? (
                            <img
                              src={getImageUrl(testimonial.photo)}
                              alt={testimonial.name}
                              className="h-14 w-14 rounded-full object-cover border-2 border-purple-500"
                            />
                          ) : (
                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xl font-bold text-white">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {testimonial.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.role}
                          </p>
                          <div className="flex mt-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>

                      <div className="relative mb-4">
                        <p className="text-gray-300 italic">
                          "{testimonial.message}"
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              testimonial.status === "pending"
                                ? "bg-yellow-600 text-yellow-100"
                                : testimonial.status === "approved"
                                ? "bg-green-600 text-green-100"
                                : "bg-red-600 text-red-100"
                            }`}
                          >
                            {testimonial.status.charAt(0).toUpperCase() +
                              testimonial.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {testimonial.status !== "approved" && (
                            <button
                              onClick={() =>
                                handleStatusChange(testimonial._id, "approved")
                              }
                              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                          )}
                          {testimonial.status !== "rejected" && (
                            <button
                              onClick={() =>
                                handleStatusChange(testimonial._id, "rejected")
                              }
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteTestimonial(testimonial._id)
                            }
                            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageTestimonials;
