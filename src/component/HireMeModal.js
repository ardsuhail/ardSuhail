"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const HireMeModal = ({ isOpen, onClose }) => {
  const platforms = [
    { name: "Upwork", link: "https://www.upwork.com/freelancers/~01b54162516864c607" },
    { name: "Fiverr", link: "https://fiverr.com/s/yv5K0BZ" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/suhail-ahmed-566a60315/" },
  ];

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
       
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              Let’s Work Together 🤝
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Click a platform to view my profile and hire me directly.
            </p>

 
            <div className="flex flex-col gap-4">
              {platforms.map((p) => (
                <Link
                  key={p.name}
                  href={p.link}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-50 text-gray-900 font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition transform hover:scale-105"
                >
                  {p.name}
                </Link>
              ))}
            </div>


            <p className="text-xs text-gray-400 mt-6 text-center">
              Your information will remain confidential.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HireMeModal;
