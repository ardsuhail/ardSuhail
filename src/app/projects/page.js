// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt } from "react-icons/fa";
// import { SiTailwindcss, SiNextdotjs, SiJavascript } from "react-icons/si";
// import Link from "next/link";
// import { ExternalLink,ExternalLinkIcon,GithubIcon,ChevronDownIcon,ChevronUpIcon,LoaderCircle    } from "lucide-react";

// const iconMap = {
//   FaReact: <FaReact />,
//   FaPython: <FaPython />,
//   FaShopify: <FaShopify />,
//   FaHtml5: <FaHtml5 />,
//   FaCss3Alt: <FaCss3Alt />,
//   SiTailwindcss: <SiTailwindcss />,
//   SiNextdotjs: <SiNextdotjs />,
//   SiJavascript: <SiJavascript />,
// };

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [isExpanded, setIsExpanded] = useState({});
//   const [showButton, setShowButton] = useState({});
//   const [loading, setLoading] = useState(false)
//   const descRefs = useRef({});


//   useEffect(() => {
//     setLoading(true)
//     fetch("/api/project")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API response:", data);
//         setLoading(false)

//         setProjects(Array.isArray(data.projects) ? data.projects : Array.isArray(data) ? data : []);
//       })
//       .catch((err) => console.error("Error fetching projects:", err));
//   }, []);


//   useEffect(() => {
//     const newShowButton = {};
//     (projects || []).forEach((project) => {
//       const desc = descRefs.current[project._id];
//       if (desc) {
//         newShowButton[project._id] = desc.scrollHeight > desc.clientHeight;
//       }
//     });
//     setShowButton(newShowButton);
//   }, [projects]);

//   const toggleDesc = (id) => {
//     setIsExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <main className="p-8 mt-14 overflow-y-scroll h-[90vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 ">
//     {loading && <div className="flex justify-center items-center    h-[60vh] "><LoaderCircle className="animate-spin  w-14 h-14 " /></div>}
// <div className="  grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//       {(projects || []).map((project) => (
//         <motion.div
//           key={project._id}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true, amount: 0.2 }}
//           className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100"
//         >

//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          

//           <div className="relative w-full h-56 overflow-hidden">
//             <img
//               src={project.project_image?.url || "/placeholder.png"}
//               alt={project.title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-purple-700 font-semibold text-xs px-3 py-1.5 rounded-full shadow-md">
//               Time To Take: {project.duration || "N/A"}
//             </div>
//           </div>

//           <div className="p-6 flex flex-col justify-between flex-1">
//             <div>

//               <h3 className="text-xl font-bold text-gray-800 mb-3  group-hover:text-purple-700 transition-colors">
//                 {project.title}
//               </h3>

//               <div className="mb-4">
//                 <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
//                 <p
//                   ref={(el) => (descRefs.current[project._id] = el)}
//                   className={`text-gray-700 text-sm leading-relaxed transition-all duration-300 ${
//                     isExpanded[project._id] ? "line-clamp-none" : "line-clamp-3"
//                   }`}
//                 >
//                   {project.description}
//                 </p>
//               </div>

//               {showButton[project._id] && (
//                 <button
//                   onClick={() => toggleDesc(project._id)}
//                   className="text-sm cursor-pointer font-medium text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1 mb-4"
//                 >
//                   {isExpanded[project._id] ? (
//                     <>Read Less <ChevronUpIcon className="w-4 h-4" /></>
//                   ) : (
//                     <>Read More <ChevronDownIcon className="w-4 h-4" /></>
//                   )}
//                 </button>
//               )}

//               <div className="mb-6">
//                 <p className="text-sm font-medium text-gray-500 mb-2">Tech Stack</p>
//                 <div className="flex flex-wrap gap-2">
//                   {(project.tech || []).map((iconName, i) => (
//                     <div 
//                       key={i} 
//                       className="bg-gray-100 p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
//                       title={iconName}
//                     >
//                       {iconMap[iconName]}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>


//             <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
//               <Link
//                 href={project.proj_Link}
//                 target="_blank"
//                 className="text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-medium flex items-center justify-center gap-2"
//               >
//                 <ExternalLinkIcon className="w-4 h-4" />
//                 View Project
//               </Link>

//               {project.github_code_link && (
//                 <Link
//                   href={project.github_code_link}
//                   target="_blank"
//                   className="text-center bg-gray-800 text-white px-5 py-3 rounded-xl shadow hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 font-medium flex items-center justify-center gap-2"
//                 >
//                   <GithubIcon className="w-4 h-4" />
//                   GitHub Code
//                 </Link>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>



//     </main>
//   );
// };

// export default Projects;


"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiJavascript, SiMongodb, SiExpress, SiTypescript } from "react-icons/si";
import Link from "next/link";
import { ExternalLink, Github, ChevronDown, ChevronUp, Loader2, Eye, Code, Calendar, ArrowRight, Star, Zap, Shield } from "lucide-react";

const iconMap = {
  FaReact: <FaReact className="w-5 h-5" />,
  FaPython: <FaPython className="w-5 h-5" />,
  FaShopify: <FaShopify className="w-5 h-5" />,
  FaHtml5: <FaHtml5 className="w-5 h-5" />,
  FaCss3Alt: <FaCss3Alt className="w-5 h-5" />,
  FaNodeJs: <FaNodeJs className="w-5 h-5" />,
  FaGitAlt: <FaGitAlt className="w-5 h-5" />,
  SiTailwindcss: <SiTailwindcss className="w-5 h-5" />,
  SiNextdotjs: <SiNextdotjs className="w-5 h-5" />,
  SiJavascript: <SiJavascript className="w-5 h-5" />,
  SiMongodb: <SiMongodb className="w-5 h-5" />,
  SiExpress: <SiExpress className="w-5 h-5" />,
  SiTypescript: <SiTypescript className="w-5 h-5" />
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [showButton, setShowButton] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const descRefs = useRef({});

  useEffect(() => {
    setLoading(true);
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setProjects(Array.isArray(data.projects) ? data.projects : Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const newShowButton = {};
    projects.forEach((project) => {
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

  const getTechCategory = (techStack) => {
    if (techStack?.some(tech => ['FaShopify'].includes(tech))) return 'ecommerce';
    if (techStack?.some(tech => ['SiNextdotjs', 'FaReact'].includes(tech))) return 'frontend';
    if (techStack?.some(tech => ['FaNodeJs', 'SiExpress', 'SiMongodb'].includes(tech))) return 'fullstack';
    return 'other';
  };

  // const filteredProjects = projects.filter(project => {
  //   if (filter === "all") return true;
  //   return getTechCategory(project.tech) === filter;
  // });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-700">Loading Projects...</h3>
          <p className="text-gray-500 mt-2">Fetching my latest work</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-6 shadow-lg"
          >
            <Code className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">MY PORTFOLIO</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            A collection of my recent work showcasing modern web development, 
            <strong className="text-blue-600"> innovative solutions</strong>, and 
            <strong className="text-purple-600"> technical expertise</strong>
          </p>

          {/* Filter Buttons
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { key: "all", label: "All Projects", icon: <Zap className="w-4 h-4" /> },
              { key: "fullstack", label: "Full Stack", icon: <Code className="w-4 h-4" /> },
              { key: "frontend", label: "Frontend", icon: <Eye className="w-4 h-4" /> },
              { key: "ecommerce", label: "E-commerce", icon: <Shield className="w-4 h-4" /> }
            ].map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(item.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  filter === item.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 shadow-sm"
                }`}
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
          </motion.div> */}
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {filter === "all" 
                  ? "I'm currently working on some amazing projects. Check back soon!"
                  : `No ${filter} projects available at the moment.`
                }
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  layout
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={project.project_image?.url || "/api/placeholder/400/256"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Project Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-700 font-semibold text-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {project.duration || "Recent"}
                    </div>

                    {/* Overlay Links */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <Link
                        href={project.proj_Link}
                        target="_blank"
                        className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Link>
                      {project.github_code_link && (
                        <Link
                          href={project.github_code_link}
                          target="_blank"
                          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <div className="mb-4">
                      <p
                        ref={(el) => (descRefs.current[project._id] = el)}
                        className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                          isExpanded[project._id] ? "line-clamp-none" : "line-clamp-3"
                        }`}
                      >
                        {project.description}
                      </p>
                      {showButton[project._id] && (
                        <button
                          onClick={() => toggleDesc(project._id)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 mt-2"
                        >
                          {isExpanded[project._id] ? (
                            <>Show Less <ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <>Read More <ChevronDown className="w-4 h-4" /></>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 mb-3">Built With</p>
                      <div className="flex flex-wrap gap-2">
                        {(project.tech || []).map((iconName, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 rounded-lg text-gray-700 border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm"
                            title={iconName.replace(/^[A-Z]/, "")}
                          >
                            {iconMap[iconName]}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons - Mobile */}
                    <div className="flex gap-3 lg:hidden">
                      <Link
                        href={project.proj_Link}
                        target="_blank"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Link>
                      {project.github_code_link && (
                        <Link
                          href={project.github_code_link}
                          target="_blank"
                          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <Star className="w-12 h-12 text-yellow-300 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Let&apos;s collaborate to bring your ideas to life with modern technologies and innovative solutions.
            </p>
            <Link href={"/contact"} >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <Code className="w-5 h-5" />

              Start a Project
              <ArrowRight className="w-5 h-5" />
            </motion.div>
              </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;