import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Upload } from "lucide-react";
import styles from "../styles/AdminDashboard.module.css";
import AdminLayout from "../components/AdminLayout"; // ✅ new import

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
    "Bio",
  ];

  useEffect(() => {
    if (!section) return;

    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/categories?section=${section}`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [section]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const fileType = file.type;
    if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
      setMessage("⚠️ Please upload an image or a video file only.");
    }
  };

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
      setMessage("✅ Upload successful!");
      setTitle("");
      setImage(null);
      setPreview(null);
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

      const updated = await axios.get(
        `http://localhost:5000/api/categories?section=${section}`
      );
      setCategories(updated.data);
    } catch (err) {
      setMessage("❌ Failed to create category.");
    }
  };

  return (
    <AdminLayout>
      <section id="upload" className={styles.card}>
        <h2><Upload /> Upload Media</h2>

        <input
          type="text"
          placeholder="Title"
          className={styles.textbox}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.selectWrapper}>
          <label>Select Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map((sec, idx) => (
              <option key={idx} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <label>Select Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept="image/*,video/*"
          className={styles.textbox}
          onChange={handleFileChange}
        />

        {preview && (
          <div className="mt-4">
            <p className="text-sm mb-1">Preview:</p>
            {image?.type?.startsWith("image/") ? (
              <img src={preview} alt="preview" className="rounded shadow max-w-xs" />
            ) : (
              <video src={preview} controls className="rounded shadow max-w-xs" />
            )}
          </div>
        )}

        <button onClick={handleUpload} className={styles.button}>
          Upload Media
        </button>
      </section>

      <section id="create-category" className={styles.card}>
        <h2><PlusCircle /> Create Category</h2>

        <div className={styles.selectWrapper}>
          <label>Select Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map((sec, idx) => (
              <option key={idx} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Category Name"
          className={styles.textbox}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button onClick={createCategory} className={styles.button}>
          Create Category
        </button>
      </section>

      {message && (
        <p className="mt-6 text-center text-lg font-medium animate-pulse">{message}</p>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
