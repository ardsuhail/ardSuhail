"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaPython, FaShopify } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiJavascript, SiCplusplus, SiExpress } from "react-icons/si";

const skills = [
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-600 w-12 h-12" />,
    level: 95,
    desc: "Structured, semantic, and accessible web markup for building websites."
  },
  {
    name: "CSS / Tailwind",
    icon: <SiTailwindcss className="text-blue-400 w-12 h-12" />,
    level: 95,
    desc: "Styling and responsive design using CSS and Tailwind for modern UI."
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-500 w-12 h-12" />,
    level: 95,
    desc: "Dynamic functionality and interactivity for web applications."
  },
  {
    name: "React",
    icon: <FaReact className="text-blue-500 w-12 h-12" />,
    level: 90,
    desc: "Building reusable frontend components for modern web apps."
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-gray-800 w-12 h-12" />,
    level: 95,
    desc: "Fullstack React framework with SSR, static generation, and SEO-friendly pages."
  },
  {
    name: "Python",
    icon: <FaPython className="text-blue-700 w-12 h-12" />,
    level: 75,
    desc: "Programming, scripting, and backend logic for versatile applications."
  },
  {
    name: "DSA",
    icon: <SiCplusplus className="text-purple-700 w-12 h-12" />,
    level: 75,
    desc: "Problem-solving using algorithms and data structures."
  },
  {
    name: "Express.js",
    icon: <SiExpress className="text-gray-700 w-12 h-12" />,
    level: 90,
    desc: "Backend framework for Node.js to build APIs and server-side logic."
  },
    { name: "Shopify / E-commerce", icon: <FaShopify className="text-green-600 w-10 h-10" />, level: 90, desc: "Building and managing online stores with Shopify, integrating APIs, customizing themes, and optimizing for sales and SEO." },
];

const CircularSkill = ({ skill }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-3">{skill.icon}</div>

      <div className="relative w-24 h-24 mb-3">
        <svg className="w-24 h-24">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-gray-200"
            strokeWidth="8"
            fill="transparent"
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
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-gray-800">
          Confident
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">{skill.name} - {skill.level}%</h3>
      <p className="text-gray-600 text-center text-sm mt-2">{skill.desc}</p>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#f0f0f0] to-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-12">
        My Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <CircularSkill key={index} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
