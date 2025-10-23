"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-24 px-6 flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex md:hidden justify-center "
        >
          <img
            src="/hi.gif"
            alt="Suhail"
            className="rounded-2xl  w-[280px] md:w-[320px]  hover:scale-105 transition-all duration-300 object-cover object-top max-h-[380px]"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Hey there 👋 I’m <span className="text-blue-400 font-semibold">Suhail</span>,
            a passionate <span className="text-emerald-400">Web Developer</span> from India.
            I’m currently pursuing my <span className="text-blue-400">B.Tech in Computer Science</span> (2024–2028)
            and building my skills in <span className="text-emerald-400">Full Stack Development</span> and
            <span className="text-emerald-400"> Python DSA</span>.
          </p>

          <p className="text-gray-400 leading-relaxed mb-8">
            I love crafting responsive, modern, and performance-optimized web apps using
            <span className="text-blue-400"> Next.js, React, and Tailwind CSS</span>.
            My goal is to turn creative ideas into digital reality while continuously learning new technologies.
          </p>

          <div className="flex gap-4 items-center">
            <Link
              href="/resume.pdf" // apna resume public folder me `resume.pdf` naam se daal dena
              target="_blank"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.05] transition-all duration-300 text-white px-5 py-3 rounded-lg font-semibold shadow-lg"
            >
              <Download className="w-5 h-5" /> Download Resume
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-gray-500 hover:bg-gray-800 transition-all duration-300 px-5 py-3 rounded-lg font-semibold text-gray-300 hover:text-white"
            >
              View Projects →
            </Link>
          </div>
        </motion.div >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" hidden md:flex justify-center mt-10 md:mt-5"
        >
          <img
            src="/hi.gif"
            alt="Suhail"
            className="rounded-2xl  w-[280px] md:w-[320px]  hover:scale-105 transition-all duration-300 object-cover object-top max-h-[380px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
