"use client"
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
const Message = ({isOpen,Usermessage,onClose}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-20%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white w-[90%] sm:w-[480px] rounded-3xl shadow-2xl p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              Client Queries
            </h2>
            
            {/* Platform Buttons */}
              <div>
                <p>{Usermessage}</p>
              </div>
           
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Message
