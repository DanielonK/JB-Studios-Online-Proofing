import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Upload image function
  const handleUpload = async () => {
    if (!title || !image) {
      setMessage("Please select an image and enter a title.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Image uploaded successfully!");
    } catch (error) {
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ✅ Upload Image Form */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Image Title"
          className="p-2 border rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" className="mt-2 p-2 border rounded w-full" onChange={handleFileChange} />
        <button onClick={handleUpload} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Upload Image
        </button>
      </div>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AdminDashboard;
