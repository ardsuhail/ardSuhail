"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import HireMeModal from "@/component/HireMeModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
<main className="flex flex-col mt-20 xl:mt-22  lg:mt-25 items-center justify-center text-center min-h-screen bg-gradient-to-b from-white to-gray-100 px-6">


  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-3xl"
  >
    <h1 className="text-5xl md:text-6xl font-bold mb-4">
      Hey, I&apos;m{" "}
      <span className="bg-gradient-to-r from-indigo-500 to-sky-500 text-transparent bg-clip-text">
        Suhail
      </span>
    </h1>

    <p className="text-gray-600 text-lg md:text-xl mb-8">
      A passionate{" "}
      <span className="font-semibold text-gray-800">Full Stack Web Developer</span>{" "}
      from India — building scalable, modern, and user-friendly web applications.
      I love creating beautiful digital experiences using{" "}
      <strong>Next.js</strong>, <strong>React.js</strong>, and <strong>Node.js</strong>.
    </p>

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


  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="mt-16 grid sm:grid-cols-3 gap-8 text-gray-700"
  >
    <div>
      <h3 className="text-3xl font-bold text-indigo-600">10+</h3>
      <p className="text-gray-600">Projects Completed</p>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-indigo-600">Full Stack</h3>
      <p className="text-gray-600">Frontend & Backend Expertise</p>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-indigo-600">2+</h3>
      <p className="text-gray-600">Years of Coding Journey</p>
    </div>
  </motion.div>


  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8 }}
    className="mt-20 max-w-5xl text-gray-700"
  >
    <h2 className="text-3xl font-semibold mb-6">What I Offer</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
        <p className="text-gray-600">
          Building responsive, high-performance, and modern UIs with React, Next.js, and Tailwind CSS.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">Backend & APIs</h3>
        <p className="text-gray-600">
          Secure and fast APIs using Node.js, Express, and MongoDB with authentication and database integration.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">Full Stack Solutions</h3>
        <p className="text-gray-600">
          From idea to deployment — I handle complete product development using modern technologies.
        </p>
      </div>
    </div>
  </motion.div>

 <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.7, duration: 0.8 }}
  className="mt-20 max-w-4xl text-center"
>
  <h2 className="text-3xl font-semibold mb-8 text-gray-800">Tech Stack</h2>

  {/* Tech Tags */}
  <div className="flex flex-wrap justify-center gap-4 text-gray-700 text-lg">
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">Next.js</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">React.js</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">Node.js</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">Express</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">MongoDB</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">Tailwind CSS</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">JavaScript</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">HTML 5</span>
    <span className="px-4 py-2 bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition">CSS 3</span>
  </div>


  <div className="mt-10">
    <h3 className="text-xl text-gray-800 mb-3">Want to explore more?</h3>
    <Link
      href="/skills"
      className="inline-block bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-[1.05] transition-all"
    >
      Know More About My Skills →
    </Link>
  </div>
</motion.div>

   

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9, duration: 0.8 }}
    className="mt-20 mb-10 text-center"
  >
    <h2 className="text-3xl font-semibold mb-3">Let&apos;s Build Something Great</h2>
    <p className="text-gray-600 mb-6">
      Want to collaborate or hire me for your next project?
      Check out my work or reach out directly!
    </p>
    <div className="flex gap-4 justify-center">
      <Link
        href="/contact"
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
      >
        Contact Me
      </Link>
      <Link
        href="/about"
        className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition"
      >
        Know More
      </Link>
    </div>
  </motion.div>
</main>


  );
}





