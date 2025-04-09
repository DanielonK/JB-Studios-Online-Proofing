import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import BaseModal from "./BaseModal"; // ✅ uses your BaseModal

const UploadModal = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [section, setSection] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const sections = ["Photography", "Wedding Film", "Pricing", "Contact", "Education", "Shop", "Bio"];
  const totalSteps = 4;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileType = file.type;

    if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("❌ Only supported formats allowed (JPG, PNG, MP4, MOV, AVI, etc).");
      setImage(null);
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!title || !image || !section || (categories.length > 0 && !categoryId)) {
      toast.error("⚠️ Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("section", section);
    formData.append("image", image);

    // ✅ Correct media type detection
    const isVideo = image?.type?.startsWith("video/");
    formData.append("mediaType", isVideo ? "video" : "image");

    if (categoryId) {
      formData.append("categoryId", categoryId);
    }

    try {
      setIsUploading(true);
      await axios.post("http://localhost:5000/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });
      toast.success("✅ Upload successful!");
      resetForm();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setTitle("");
    setImage(null);
    setPreview(null);
    setSection("");
    setCategoryId("");
    setCategories([]);
    setStep(1);
  };

  const handleNext = () => {
    if (step === 1 && categories.length === 0) {
      setStep(3); // skip category if no categories
    } else {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
    setDirection(1);
  };

  const handleBack = () => {
    if (!isUploading) {
      setStep((prev) => Math.max(prev - 1, 1));
      setDirection(-1);
    }
  };

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    animate: {
      x: 0,
      opacity: 1,
      position: "relative",
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
      transition: { type: "spring", stiffness: 400, damping: 30 },
    }),
  };

  const progressPercent = (step / totalSteps) * 100;

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={
      step === 1 ? "Select Section" :
      step === 2 ? "Select Category" :
      step === 3 ? "Upload Media" :
      "Preview"
    }>
      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
        <motion.div
          className="bg-purple-500 h-2"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Steps Content */}
      <div className="relative min-h-[300px]">
        <AnimatePresence initial={false} custom={direction}>
          {step === 1 && (
            <motion.div key="step1" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Select Section</label>
                <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600">
                  <option value="">Select Section</option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleNext} disabled={!section} className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold transition active:scale-95">
                Next
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Select Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600">
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between gap-4">
                <button onClick={handleBack} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg active:scale-95">Back</button>
                <button onClick={handleNext} disabled={!categoryId} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg active:scale-95">Next</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Title</label>
                <input type="text" placeholder="Enter a title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Upload File</label>
                <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600" />
              </div>
              <div className="flex justify-between gap-4">
                <button onClick={handleBack} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg active:scale-95">Back</button>
                <button onClick={handleNext} disabled={!title || !image} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg active:scale-95">Next</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 shadow-inner text-white space-y-4">
                <p><span className="text-gray-400">Section:</span> {section}</p>
                {categoryId && <p><span className="text-gray-400">Category:</span> {categories.find(c => c.id === categoryId)?.name || "N/A"}</p>}
                <p><span className="text-gray-400">Title:</span> {title}</p>
                {preview && (
                  <div>
                    {image?.type?.startsWith("image/") ? (
                      <img src={preview} alt="Preview" className="rounded-lg shadow mt-2" />
                    ) : (
                      <video src={preview} controls className="rounded-lg shadow mt-2" />
                    )}
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="w-full bg-gray-700 rounded-full h-3 mt-6 overflow-hidden">
                  <motion.div
                    className="bg-green-500 h-3"
                    animate={{ width: `${uploadProgress}%` }}
                    initial={{ width: 0 }}
                    transition={{ ease: "easeOut", duration: 0.5 }}
                  />
                </div>
              )}

              <div className="flex justify-between gap-4 mt-6">
                <button onClick={handleBack} disabled={isUploading} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg active:scale-95">Back</button>
                <button onClick={handleUpload} disabled={isUploading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg active:scale-95">
                  {isUploading ? `Uploading... ${uploadProgress}%` : "Upload"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BaseModal>
  );
};

export default UploadModal;
