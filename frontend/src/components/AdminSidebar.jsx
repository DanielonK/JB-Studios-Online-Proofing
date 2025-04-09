// components/AdminSidebar.jsx
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Upload,
  FolderPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/admin" },
    { name: "Upload Media", icon: <Upload size={22} />, path: "/admin/upload" },
    { name: "Create Category", icon: <FolderPlus size={22} />, path: "/admin/category/create" },
    { name: "Settings", icon: <Settings size={22} />, path: "/admin/settings" },
  ];

  // Detect screen size and collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`bg-gray-800 text-white min-h-screen p-4 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-grow space-y-4">
        {menuItems.map((item, index) => (
          <div key={index} className="group relative">
            <button
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center ${
                collapsed ? "w-12 h-12" : "w-full"
              } space-x-3 p-2 hover:bg-gray-700 rounded-md transition ${
                location.pathname === item.path ? "bg-purple-600 text-white" : ""
              }`}
            >
              <div>{item.icon}</div>
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </button>

            {/* Tooltip on Hover when collapsed */}
            {collapsed && (
              <span className="absolute left-14 top-2 scale-0 group-hover:scale-100 bg-black text-white text-xs rounded-md px-2 py-1 transition-all origin-left">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-xs text-gray-400 text-center">JB Studios Admin</p>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
