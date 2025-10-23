"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaPython, FaShopify } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiJavascript, SiCplusplus } from "react-icons/si";

const skills = [
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-600 w-10 h-10" />,
    desc: "Structured, semantic, and accessible web markup.",
    level: 95,
  },
  {
    name: "CSS / Tailwind",
    icon: <SiTailwindcss className="text-blue-400 w-10 h-10" />,
    desc: "Beautiful, responsive, modern styling with Tailwind CSS.",
    level: 95,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-500 w-10 h-10" />,
    desc: "Dynamic functionality and interactivity for websites.",
    level: 95,
  },
  {
    name: "React",
    icon: <FaReact className="text-blue-500 w-10 h-10" />,
    desc: "Modern frontend development with reusable components.",
    level: 90,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-gray-800 w-10 h-10" />,
    desc: "Fullstack React framework with SSR and SEO-friendly pages.",
    level: 95,
  },
  {
    name: "Python",
    icon: <FaPython className="text-blue-700 w-10 h-10" />,
    desc: "Programming, scripting, and backend logic.",
    level: 75,
  },
  {
    name: "DSA",
    icon: <SiCplusplus className="text-purple-700 w-10 h-10" />,
    desc: "Problem solving with algorithms and data structures.",
    level: 75,
  },
  {
    name: "Shopify / E-commerce",
    icon: <FaShopify className="text-green-600 w-10 h-10" />,
    desc: "Building and managing online stores with Shopify.",
    level: 90,
  },
];

const CircularSkill = ({ skill }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <div className="mb-3">{skill.icon}</div>
       {/* write confident in middle of the circle */}
      {/* Circular Progress */}
      <svg className="w-24 h-24 mb-3">

        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className="stroke-gray-200"
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset="0"

        />
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          className="stroke-purple-600"
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          
        />
        
      </svg>

      {/* Name & % */}
      <h3 className="text-lg font-semibold text-gray-800">
        {skill.name} - {skill.level}%
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center text-sm mt-1">{skill.desc}</p>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className="text-4xl mt-3 md:text-5xl font-bold text-center text-purple-700 mb-12">
        My Skills
      </h2>
    <div className=" overflow-y-scroll h-[90vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 bg-gradient-to-b from-[#f0f0f0] to-white py-16 px-5 md:px-16">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {skills.map((skill, index) => (
          <CircularSkill key={index} skill={skill} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Skills;
