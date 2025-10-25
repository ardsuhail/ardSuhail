"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiJavascript } from "react-icons/si";
import Link from "next/link";
import { ExternalLink,ExternalLinkIcon,GithubIcon,ChevronDownIcon,ChevronUpIcon,LoaderCircle    } from "lucide-react";

const iconMap = {
  FaReact: <FaReact />,
  FaPython: <FaPython />,
  FaShopify: <FaShopify />,
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
  SiTailwindcss: <SiTailwindcss />,
  SiNextdotjs: <SiNextdotjs />,
  SiJavascript: <SiJavascript />,
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [showButton, setShowButton] = useState({});
  const [loading, setLoading] = useState(false)
  const descRefs = useRef({});


  useEffect(() => {
    setLoading(true)
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setLoading(false)

        setProjects(Array.isArray(data.projects) ? data.projects : Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);


  useEffect(() => {
    const newShowButton = {};
    (projects || []).forEach((project) => {
      const desc = descRefs.current[project._id];
      if (desc) {
        newShowButton[project._id] = desc.scrollHeight > desc.clientHeight;
      }
    });
    setShowButton(newShowButton);
  }, [projects]);

  const toggleDesc = (id) => {
    setIsExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="p-8 mt-14 overflow-y-scroll h-[90vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 ">
    {loading && <div className="flex justify-center items-center    h-[60vh] "><LoaderCircle className="animate-spin  w-14 h-14 " /></div>}
<div className="  grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {(projects || []).map((project) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100"
        >

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          

          <div className="relative w-full h-56 overflow-hidden">
            <img
              src={project.project_image?.url || "/placeholder.png"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-purple-700 font-semibold text-xs px-3 py-1.5 rounded-full shadow-md">
              Time To Take: {project.duration || "N/A"}
            </div>
          </div>

          <div className="p-6 flex flex-col justify-between flex-1">
            <div>

              <h3 className="text-xl font-bold text-gray-800 mb-3  group-hover:text-purple-700 transition-colors">
                {project.title}
              </h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                <p
                  ref={(el) => (descRefs.current[project._id] = el)}
                  className={`text-gray-700 text-sm leading-relaxed transition-all duration-300 ${
                    isExpanded[project._id] ? "line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {project.description}
                </p>
              </div>

              {showButton[project._id] && (
                <button
                  onClick={() => toggleDesc(project._id)}
                  className="text-sm cursor-pointer font-medium text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1 mb-4"
                >
                  {isExpanded[project._id] ? (
                    <>Read Less <ChevronUpIcon className="w-4 h-4" /></>
                  ) : (
                    <>Read More <ChevronDownIcon className="w-4 h-4" /></>
                  )}
                </button>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {(project.tech || []).map((iconName, i) => (
                    <div 
                      key={i} 
                      className="bg-gray-100 p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                      title={iconName}
                    >
                      {iconMap[iconName]}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
              <Link
                href={project.proj_Link}
                target="_blank"
                className="text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                View Project
              </Link>

              {project.github_code_link && (
                <Link
                  href={project.github_code_link}
                  target="_blank"
                  className="text-center bg-gray-800 text-white px-5 py-3 rounded-xl shadow hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub Code
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>



    </main>
  );
};

export default Projects;
