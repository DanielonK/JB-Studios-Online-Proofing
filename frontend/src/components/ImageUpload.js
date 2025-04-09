import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const isVideo = selectedFile.type.startsWith("video/");
    const fileSizeMB = selectedFile.size / (1024 * 1024);

    if (isVideo && fileSizeMB > 100) {
      toast.error("⚠️ Video file too large. Max 100MB allowed.");
      return;
    }

    if (selectedFile.type.startsWith("image/")) {
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920 };
        const compressed = await imageCompression(selectedFile, options);
        setFile(compressed);
      } catch (err) {
        console.error("Compression failed", err);
        setFile(selectedFile);
      }
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !section) {
      toast.error("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("section", section);
    formData.append("mediaType", file.type.startsWith("video") ? "video" : "image");
    formData.append("description", description);

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      toast.error("⚠️ Upload cancelled: Too slow.");
    }, 30000); // 30 seconds max

    try {
      setUploading(true);
      await axios.post("http://localhost:5000/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);
      toast.success("✅ Upload successful!");
      setFile(null);
      setTitle("");
      setDescription("");
      setSection("");
      setUploadProgress(0);
    } catch (error) {
      console.error("❌ Upload failed", error);
      toast.error("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Upload Image or Video</h2>

      <input
        type="text"
        placeholder="Enter title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter description (optional)"
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      >
        <option value="">Select Section</option>
        <option value="Photography">Photography</option>
        <option value="Wedding Film">Wedding Film</option>
        <option value="Pricing">Pricing</option>
        <option value="Shop">Shop</option>
      </select>

      <input
        type="file"
        accept="image/*,video/*"
        className="border p-2 w-full mb-2"
        onChange={handleFileChange}
      />

      {file && (
        <>
          <div className="text-sm text-gray-500 mb-2">
            Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
          </div>
          <div className="mb-4">
            {file.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(file)} alt="preview" className="w-full max-w-xs rounded" />
            ) : (
              <video src={URL.createObjectURL(file)} controls className="w-full max-w-xs rounded" />
            )}
          </div>
        </>
      )}

      {uploadProgress > 0 && (
        <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
          <div
            className="bg-blue-600 h-4 rounded-full text-xs text-white flex justify-center items-center transition-all duration-500"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-all ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;
