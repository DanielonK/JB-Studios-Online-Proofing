// CreateCategoryModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import BaseModal from "./BaseModal"; // ✅ USE YOUR BASE MODAL
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateCategoryModal = ({ open, onOpenChange }) => {
  const [section, setSection] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const sections = [
    "Photography", "Wedding Film", "Pricing",
    "Contact", "Education", "Shop", "Bio"
  ];

  const createCategory = async () => {
    if (!newCategory || !section) {
      toast.error("⚠️ Please fill all fields.");
      return;
    }
    try {
      setIsCreating(true);
      await axios.post("http://localhost:5000/api/categories", {
        name: newCategory,
        section,
      });
      toast.success("✅ Category created!");
      setSection("");
      setNewCategory("");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create category.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title="Create Category">
      <div className="space-y-6">
        {/* Section Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-2">
            Select Section
          </label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* Category Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-2">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
          />
        </div>

        {/* Loading Progress (if creating) */}
        {isCreating && (
          <div className="w-full bg-gray-700 rounded-full h-3 mt-4 overflow-hidden">
            <motion.div
              className="bg-green-500 h-3"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={createCategory}
            disabled={isCreating}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg active:scale-95"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateCategoryModal;
