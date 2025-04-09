// BaseModal.jsx
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const BaseModal = ({ open, onOpenChange, children, title }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0 z-40 backdrop-blur-sm" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-gray-900 border border-gray-700 backdrop-blur-md relative"
              style={{ boxShadow: "0 0 20px 2px rgba(168, 85, 247, 0.5)" }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-white text-2xl font-bold tracking-tight">{title}</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </div>

              {/* Modal Body */}
              {children}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BaseModal;
