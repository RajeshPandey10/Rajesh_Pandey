import React, { useState, useEffect } from "react";
import {
  fetchAllGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../services/api";
import { getImageUrl } from "../utils/imageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "web",
  });
  const [image, setImage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const data = await fetchAllGalleryItems(token);
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      toast.error("Failed to fetch gallery items.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateItem = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const itemData = {
        ...newItem,
        image,
      };

      if (editingItem) {
        // Update existing item
        const data = await updateGalleryItem(editingItem._id, itemData, token);
        setGalleryItems(
          galleryItems.map((item) =>
            item._id === editingItem._id ? data : item
          )
        );
        toast.success("Gallery item updated successfully!");
      } else {
        // Add new item
        const data = await addGalleryItem(itemData, token);
        setGalleryItems([...galleryItems, data]);
        toast.success("Gallery item added successfully!");
      }

      // Reset form
      setNewItem({
        title: "",
        description: "",
        category: "web",
      });
      setImage(null);
      setEditingItem(null);
    } catch (error) {
      console.error("Error adding/updating gallery item:", error);
      toast.error("Failed to add/update gallery item.");
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      title: item.title,
      description: item.description,
      category: item.category || "web",
    });
    setImage(null);
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await deleteGalleryItem(id, token);
        setGalleryItems(galleryItems.filter((item) => item._id !== id));
        toast.success("Gallery item deleted successfully!");
      } catch (error) {
        console.error("Error deleting gallery item:", error);
        toast.error("Failed to delete gallery item.");
      }
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewItem({
      title: "",
      description: "",
      category: "web",
    });
    setImage(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h3 className="text-3xl font-bold mb-6 text-center">Manage Gallery</h3>

      {/* Add/Update Gallery Item Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h4 className="text-xl font-semibold mb-4">
          {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
          />
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="web">Web Projects</option>
            <option value="mobile">Mobile Apps</option>
            <option value="design">Design Works</option>
            <option value="ai-ml">AI/ML Projects</option>
            <option value="other">Other</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={!editingItem}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddOrUpdateItem}
            disabled={
              !newItem.title || !newItem.description || (!editingItem && !image)
            }
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded transition duration-300"
          >
            {editingItem ? "Update Item" : "Add Item"}
          </button>
          {editingItem && (
            <button
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Display Gallery Items */}
      <div>
        <h4 className="text-2xl font-semibold mb-4">
          Gallery Items ({galleryItems.length})
        </h4>
        {galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No gallery items found.</p>
            <p className="text-gray-500 text-sm mt-2">
              Add your first gallery item using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="mb-2">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageGallery;
