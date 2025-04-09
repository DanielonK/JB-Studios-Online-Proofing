import React, { useState } from "react";
import { Upload, FolderPlus, LogOut } from "lucide-react";
import UploadModal from "./UploadModal";
import CreateCategoryModal from "./CreateCategoryModal";

const AdminNavbar = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-6">
          {/* Upload Icon */}
          <button
            onClick={() => setUploadModalOpen(true)}
            title="Upload Media"
            className="hover:text-purple-400 transition"
          >
            <Upload size={24} />
          </button>

          {/* Create Category Icon */}
          <button
            onClick={() => setCategoryModalOpen(true)}
            title="Create Category"
            className="hover:text-purple-400 transition"
          >
            <FolderPlus size={24} />
          </button>

          {/* Logout Icon */}
          <button
            onClick={() => console.log("Logout clicked")}
            title="Logout"
            className="hover:text-red-400 transition"
          >
            <LogOut size={24} />
          </button>
        </div>
      </nav>

      {/* Modals (controlled here) */}
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
      <CreateCategoryModal open={categoryModalOpen} onOpenChange={setCategoryModalOpen} />
    </>
  );
};

export default AdminNavbar;
