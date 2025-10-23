"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HireMeModal from "@/component/HireMeModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
     <main className="flex flex-col  mt-20 xl:mt-5 sm:mt-0 items-center justify-center text-center min-h-screen bg-gradient-to-b from-white to-gray-100 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hey, I'm{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-sky-500 text-transparent bg-clip-text">
            Suhail
          </span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          A passionate <span className="font-semibold text-gray-800">Web Developer</span> creating clean and modern websites.  
          I love building user-friendly digital experiences using modern web technologies.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/projects"
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-md hover:bg-indigo-700 transition"
          >
            View Projects
          </Link>
          <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
            >
              Hire Me
            </button>
             <HireMeModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16 max-w-4xl text-gray-700"
      >
        <h2 className="text-3xl font-semibold mb-4">What I Do</h2>
        <p className="text-base md:text-lg leading-relaxed">
          I specialize in front-end development using <strong>React.js</strong> and <strong>Next.js</strong>.  
          I also focus on responsive UI with <strong>Tailwind CSS</strong> and aim to deliver visually appealing designs.  
          Let's collaborate to build something amazing together.
        </p>
      </motion.div>

      {/* Footer Hint */}
    
    </main>
  );
}





