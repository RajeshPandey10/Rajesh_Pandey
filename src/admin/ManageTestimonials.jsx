import React, { useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../context/AuthContext";
import {
  fetchAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
  updateTestimonial,
  submitTestimonial,
} from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEdit,
  FaStarHalf,
  FaPlus,
  FaUpload,
  FaFilter,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImageUrl } from "../utils/imageUtils";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
    rating: 5,
    photo: null,
  });

  const { adminToken } = useContext(AuthContext);

  useEffect(() => {
    if (adminToken) {
      loadTestimonials();
    }
  }, [adminToken]);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await fetchAllTestimonials(adminToken);
      // Ensure data is always an array
      const testimonialsArray = Array.isArray(data)
        ? data
        : data?.items || data?.data || [];
      setTestimonials(testimonialsArray);
      toast.success("Testimonials loaded successfully");
    } catch (error) {
      console.error("Error loading testimonials:", error);
      toast.error("Failed to load testimonials");
      // Set empty array on error
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateTestimonialStatus(id, status, adminToken);
      // The API returns { message, testimonial }
      const updatedTestimonial = response.testimonial || response;

      setTestimonials((prevTestimonials) =>
        Array.isArray(prevTestimonials)
          ? prevTestimonials.map((testimonial) =>
              testimonial._id === id ? updatedTestimonial : testimonial
            )
          : [updatedTestimonial]
      );
      toast.success(
        `Testimonial ${
          status === "approved" ? "approved" : "rejected"
        } successfully`
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial(id, adminToken);
        setTestimonials((prevTestimonials) =>
          Array.isArray(prevTestimonials)
            ? prevTestimonials.filter((t) => t._id !== id)
            : []
        );
        toast.success("Testimonial deleted successfully");
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        toast.error("Failed to delete testimonial");
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
      photo: null,
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setFormData({
      name: "",
      email: "",
      role: "",
      message: "",
      rating: 5,
      photo: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTestimonial) {
        const response = await updateTestimonial(
          editingTestimonial._id,
          formData,
          adminToken
        );
        // The API returns { message, testimonial }
        const updatedTestimonial = response.testimonial || response;

        setTestimonials((prevTestimonials) =>
          Array.isArray(prevTestimonials)
            ? prevTestimonials.map((t) =>
                t._id === editingTestimonial._id ? updatedTestimonial : t
              )
            : [updatedTestimonial]
        );
        toast.success("Testimonial updated successfully");
        setEditingTestimonial(null);
      } else if (isAddingNew) {
        const newData = { ...formData, status: "approved" };
        const response = await submitTestimonial(newData);
        // Reload testimonials to get fresh data from server
        await loadTestimonials();
        toast.success("New testimonial added successfully");
        setIsAddingNew(false);
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingTestimonial(null);
    setIsAddingNew(false);
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    // Ensure testimonial exists and has required properties
    if (!testimonial || !testimonial.name) {
      return false;
    }

    const statusMatch =
      activeFilter === "all" || testimonial.status === activeFilter;

    const searchMatch =
      searchTerm === "" ||
      (testimonial.name &&
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (testimonial.email &&
        testimonial.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (testimonial.message &&
        testimonial.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (testimonial.role &&
        testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()));

    return statusMatch && searchMatch;
  });

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

  const TestimonialForm = ({ isEditing }) => {
    const [localFormData, setLocalFormData] = useState(formData);

    useEffect(() => {
      setLocalFormData(formData);
    }, [editingTestimonial, isAddingNew]);

    const handleLocalInputChange = (e) => {
      const { name, value } = e.target;
      setLocalFormData({
        ...localFormData,
        [name]: value,
      });
    };

    const handleLocalFileChange = (e) => {
      if (e.target.files[0]) {
        setLocalFormData({
          ...localFormData,
          photo: e.target.files[0],
        });
      }
    };

    const handleLocalSubmit = (e) => {
      e.preventDefault();
      setFormData(localFormData);
      handleSubmit(e);
    };

    return (
      <form onSubmit={handleLocalSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name*
            </label>
            <input
              type="text"
              name="name"
              value={localFormData.name}
              onChange={handleLocalInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={localFormData.email}
              onChange={handleLocalInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Role/Position
            </label>
            <input
              type="text"
              name="role"
              value={localFormData.role}
              onChange={handleLocalInputChange}
              placeholder="e.g. Client, Colleague, Manager"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Rating (1-5)*
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.5"
              value={localFormData.rating}
              onChange={handleLocalInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Photo (Optional)
            </label>
            <div className="flex items-center space-x-2">
              <label className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 cursor-pointer">
                <FaUpload className="mr-2" />
                {localFormData.photo ? "Change Photo" : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleLocalFileChange}
                  className="hidden"
                />
              </label>
              {localFormData.photo && (
                <span className="text-sm text-green-400">
                  {localFormData.photo.name || "New photo selected"}
                </span>
              )}
              {isEditing && !localFormData.photo && (
                <span className="text-sm text-gray-400">
                  Current photo will be kept if none selected
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Testimonial Message*
          </label>
          <textarea
            name="message"
            value={localFormData.message}
            onChange={handleLocalInputChange}
            rows="4"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
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
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : isEditing ? (
              "Update Testimonial"
            ) : (
              "Add Testimonial"
            )}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <ToastContainer position="top-right" theme="dark" />

      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Manage Testimonials
        </h1>
        <motion.button
          onClick={handleAddNew}
          className="mt-2 md:mt-0 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="mr-2" />
          Add New Testimonial
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow md:max-w-md">
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-gray-400 flex items-center">
              <FaFilter className="mr-2" /> Filter:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded-md ${
                  activeFilter === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("pending")}
                className={`px-3 py-1 rounded-md ${
                  activeFilter === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter("approved")}
                className={`px-3 py-1 rounded-md ${
                  activeFilter === "approved"
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setActiveFilter("rejected")}
                className={`px-3 py-1 rounded-md ${
                  activeFilter === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-400">
          <span className="mr-4">Total: {testimonials.length}</span>
          <span className="mr-4">
            Pending: {testimonials.filter((t) => t.status === "pending").length}
          </span>
          <span className="mr-4">
            Approved:{" "}
            {testimonials.filter((t) => t.status === "approved").length}
          </span>
          <span>
            Rejected:{" "}
            {testimonials.filter((t) => t.status === "rejected").length}
          </span>
        </div>
      </div>

      {loading && !editingTestimonial && !isAddingNew ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <>
          <AnimatePresence>
            {(editingTestimonial || isAddingNew) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-4 text-purple-400">
                    {editingTestimonial
                      ? "Edit Testimonial"
                      : "Add New Testimonial"}
                  </h2>
                  <TestimonialForm isEditing={!!editingTestimonial} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredTestimonials.length === 0 ? (
            <div className="text-center text-gray-400 py-8 bg-gray-800/30 rounded-lg">
              {searchTerm ? (
                <p>No testimonials match your search criteria.</p>
              ) : (
                <p>No testimonials found for the selected filter.</p>
              )}
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
                              {testimonial.name && testimonial.name.charAt
                                ? testimonial.name.charAt(0).toUpperCase()
                                : "?"}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {testimonial.name || "Unknown"}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {testimonial.email || "No email"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.role || "No role specified"}
                          </p>
                          <div className="flex mt-1">
                            {renderStars(testimonial.rating || 0)}
                          </div>
                        </div>
                      </div>

                      <div className="relative mb-4">
                        <p className="text-gray-300 italic">
                          "{testimonial.message || "No message"}"
                        </p>
                      </div>

                      <div className="text-xs text-gray-500 mb-3">
                        Submitted:{" "}
                        {testimonial.createdAt
                          ? new Date(testimonial.createdAt).toLocaleDateString()
                          : "Unknown date"}
                      </div>

                      <div className="flex justify-between items-center">
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
                            <motion.button
                              onClick={() =>
                                handleStatusChange(testimonial._id, "approved")
                              }
                              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                              title="Approve"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaCheck />
                            </motion.button>
                          )}
                          {testimonial.status !== "rejected" && (
                            <motion.button
                              onClick={() =>
                                handleStatusChange(testimonial._id, "rejected")
                              }
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                              title="Reject"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaTimes />
                            </motion.button>
                          )}
                          <motion.button
                            onClick={() => handleEdit(testimonial)}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            title="Edit"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaEdit />
                          </motion.button>
                          <motion.button
                            onClick={() =>
                              handleDeleteTestimonial(testimonial._id)
                            }
                            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                            title="Delete"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTrash />
                          </motion.button>
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

export default React.memo(ManageTestimonials);
