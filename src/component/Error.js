"use client";
import React, { useEffect, useState } from "react";

const Error = ({ error, onClose }) => {
  // const [timeLeft, setTimeLeft] = useState(3);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      setShow(true);
      // setTimeLeft(3);



    }
  }, [error]);

  const handleClose = () => {
    setShow(false); // start fade out animation
    setTimeout(() => onClose(), 300); // after animation, close modal
  };

  if (!error) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div
        className={`bg-white rounded-xl shadow-2xl p-6 w-[90%] sm:w-[400px] text-center transform transition-all duration-300 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
      >
        <p className="text-red-600 font-bold text-lg mb-4">{error}</p>
        <button
          onClick={handleClose}
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          OK
        </button>

      </div>
    </div>
  );
};

export default Error;
