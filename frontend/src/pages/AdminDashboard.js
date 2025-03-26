import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Upload } from "lucide-react";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [section, setSection] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState("");

  const sections = [
    "Photography",
    "Wedding Film",
    "Pricing",
    "Contact",
    "Education",
    "Shop",
    "Bio"
  ];

  useEffect(() => {
    if (!section) return;

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/categories?section=${section}`);
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [section]);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleUpload = async () => {
    if (!title || !image || !categoryId) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("categoryId", categoryId);
    formData.append("section", section);

    try {
      await axios.post("http://localhost:5000/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Image uploaded successfully!");
      setTitle("");
      setImage(null);
      setSection("");
      setCategoryId("");
    } catch (err) {
      setMessage("❌ Upload failed.");
    }
  };

  const createCategory = async () => {
    if (!newCategory || !section) {
      setMessage("⚠️ Please enter category name and select a section.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/categories", {
        name: newCategory,
        section,
      });
      setMessage("✅ Category created!");
      setNewCategory("");

      // Refresh categories
      const updated = await axios.get(`http://localhost:5000/api/categories?section=${section}`);
      setCategories(updated.data);
    } catch (err) {
      setMessage("❌ Failed to create category.");
    }
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">📸 Admin Dashboard</h1>

      {/* Upload Image */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Upload className="mr-2" /> Upload Image
        </h2>

        <input
          type="text"
          placeholder="Image Title"
          className="p-2 border rounded w-full mb-3 bg-gray-700 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="p-2 border rounded w-full mb-3 bg-gray-700 text-white"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="">Select Section</option>
          {sections.map((sec, idx) => (
            <option key={idx} value={sec}>{sec}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full mb-3 bg-gray-700 text-white"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="file"
          className="p-2 border rounded w-full mb-3 bg-gray-700 text-white"
          onChange={handleFileChange}
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Image
        </button>
      </div>

      {/* Create Category */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <PlusCircle className="mr-2" /> Create Category
        </h2>

        <select
          className="p-2 border rounded w-full mb-3 bg-gray-700 text-white"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="">Select Section</option>
          {sections.map((sec, idx) => (
            <option key={idx} value={sec}>{sec}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Category Name"
          className="p-2 border rounded w-full mb-3 bg-gray-700 text-white"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button
          onClick={createCategory}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Create Category
        </button>
      </div>

      {message && <p className="mt-6 text-center text-lg font-medium">{message}</p>}
    </div>
  );
};

export default AdminDashboard;
