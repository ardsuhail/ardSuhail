// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from "react-icons/fa";
// import { SiTailwindcss, SiNextdotjs, SiJavascript, SiMongodb, SiExpress, SiTypescript } from "react-icons/si";
// import Link from "next/link";
// import { ExternalLink, Github, ChevronDown, ChevronUp, Loader2, Eye, Code, Calendar, ArrowRight, Star, Zap, Shield } from "lucide-react";

// const iconMap = {
//   FaReact: <FaReact className="w-5 h-5" />,
//   FaPython: <FaPython className="w-5 h-5" />,
//   FaShopify: <FaShopify className="w-5 h-5" />,
//   FaHtml5: <FaHtml5 className="w-5 h-5" />,
//   FaCss3Alt: <FaCss3Alt className="w-5 h-5" />,
//   FaNodeJs: <FaNodeJs className="w-5 h-5" />,
//   FaGitAlt: <FaGitAlt className="w-5 h-5" />,
//   SiTailwindcss: <SiTailwindcss className="w-5 h-5" />,
//   SiNextdotjs: <SiNextdotjs className="w-5 h-5" />,
//   SiJavascript: <SiJavascript className="w-5 h-5" />,
//   SiMongodb: <SiMongodb className="w-5 h-5" />,
//   SiExpress: <SiExpress className="w-5 h-5" />,
//   SiTypescript: <SiTypescript className="w-5 h-5" />
// };

// const Projects = ({allProjects}) => {
//   const [projects, setProjects] = useState(allProjects || []);
//   const [isExpanded, setIsExpanded] = useState({});
//   const [showButton, setShowButton] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const descRefs = useRef({});

//   useEffect(() => {
//     setLoading(true);
//     setProjects(allProjects || []);
//     setLoading(false);
     
//   }, [allProjects]);

//   useEffect(() => {
//     const newShowButton = {};
//     projects.forEach((project) => {
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

//   const getTechCategory = (techStack) => {
//     if (techStack?.some(tech => ['FaShopify'].includes(tech))) return 'ecommerce';
//     if (techStack?.some(tech => ['SiNextdotjs', 'FaReact'].includes(tech))) return 'frontend';
//     if (techStack?.some(tech => ['FaNodeJs', 'SiExpress', 'SiMongodb'].includes(tech))) return 'fullstack';
//     return 'other';
//   };

//   // const filteredProjects = projects.filter(project => {
//   //   if (filter === "all") return true;
//   //   return getTechCategory(project.tech) === filter;
//   // });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
//           />
//           <h3 className="text-xl font-semibold text-gray-700">Loading Projects...</h3>
//           <p className="text-gray-500 mt-2">Fetching my latest work</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5, type: "spring" }}
//             className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-6 shadow-lg"
//           >
//             <Code className="w-5 h-5 text-blue-600" />
//             <span className="text-sm font-semibold text-gray-700">MY PORTFOLIO</span>
//           </motion.div>

//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
//               Featured Projects
//             </span>
//           </h1>
          
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
//             A collection of my recent work showcasing modern web development, 
//             <strong className="text-blue-600"> innovative solutions</strong>, and 
//             <strong className="text-purple-600"> technical expertise</strong>
//           </p>

//           {/* Filter Buttons
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="flex flex-wrap justify-center gap-4"
//           >
//             {[
//               { key: "all", label: "All Projects", icon: <Zap className="w-4 h-4" /> },
//               { key: "fullstack", label: "Full Stack", icon: <Code className="w-4 h-4" /> },
//               { key: "frontend", label: "Frontend", icon: <Eye className="w-4 h-4" /> },
//               { key: "ecommerce", label: "E-commerce", icon: <Shield className="w-4 h-4" /> }
//             ].map((item) => (
//               <motion.button
//                 key={item.key}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setFilter(item.key)}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
//                   filter === item.key
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
//                     : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 shadow-sm"
//                 }`}
//               >
//                 {item.icon}
//                 {item.label}
//               </motion.button>
//             ))}
//           </motion.div> */}
//         </motion.div>

//         {/* Projects Grid */}
//         {projects.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center py-20"
//           >
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200">
//               <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Found</h3>
//               <p className="text-gray-600 max-w-md mx-auto">
//                 {filter === "all" 
//                   ? "I'm currently working on some amazing projects. Check back soon!"
//                   : `No ${filter} projects available at the moment.`
//                 }
//               </p>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
//           >
//             <AnimatePresence>
//               {projects.map((project) => (
//                 <motion.div
//                   key={project._id}
//                   variants={itemVariants}
//                   layout
//                   className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-500 overflow-hidden"
//                 >
//                   {/* Project Image */}
//                   <div className="relative h-64 overflow-hidden">
//                     <motion.img
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.6 }}
//                       src={project.project_image?.url || "/api/placeholder/400/256"}
//                       alt={project.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
//                     {/* Project Badge */}
//                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-700 font-semibold text-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       {project.duration || "Recent"}
//                     </div>

//                     {/* Overlay Links */}
//                     <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
//                       <Link
//                         href={project.proj_Link}
//                         target="_blank"
//                         className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
//                       >
//                         <ExternalLink className="w-4 h-4" />
//                         Live Demo
//                       </Link>
//                       {project.github_code_link && (
//                         <Link
//                           href={project.github_code_link}
//                           target="_blank"
//                           className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
//                         >
//                           <Github className="w-4 h-4" />
//                           Code
//                         </Link>
//                       )}
//                     </div>
//                   </div>

//                   {/* Project Content */}
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
//                       {project.title}
//                     </h3>
//                    {/* view details */}
//                     <div className="flex items-center gap-2 mb-4">
//                       <Link
//                         href={`/projects/info?id=${project._id}`}
//                         className="text-blue-600 hover:text-blue-800 transition-colors"
//                       >
//                         View Details
//                       </Link>
//                     </div>

//                     {/* Description */}
//                     <div className="mb-4">
//                       <p
//                         ref={(el) => (descRefs.current[project._id] = el)}
//                         className={`text-gray-600 leading-relaxed transition-all duration-300 ${
//                           isExpanded[project._id] ? "line-clamp-none" : "line-clamp-3"
//                         }`}
//                       >
//                         {project.description}
//                       </p>
//                       {showButton[project._id] && (
//                         <button
//                           onClick={() => toggleDesc(project._id)}
//                           className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 mt-2"
//                         >
//                           {isExpanded[project._id] ? (
//                             <>Show Less <ChevronUp className="w-4 h-4" /></>
//                           ) : (
//                             <>Read More <ChevronDown className="w-4 h-4" /></>
//                           )}
//                         </button>
//                       )}
//                     </div>

//                     {/* Tech Stack */}
//                     <div className="mb-6">
//                       <p className="text-sm font-medium text-gray-500 mb-3">Built With</p>
//                       <div className="flex flex-wrap gap-2">
//                         {(project.tech || []).map((iconName, i) => (
//                           <motion.div
//                             key={i}
//                             whileHover={{ scale: 1.1, y: -2 }}
//                             className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 rounded-lg text-gray-700 border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm"
//                             title={iconName.replace(/^[A-Z]/, "")}
//                           >
//                             {iconMap[iconName]}
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Action Buttons - Mobile */}
//                     <div className="flex gap-3 lg:hidden">
//                       <Link
//                         href={project.proj_Link}
//                         target="_blank"
//                         className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
//                       >
//                         <ExternalLink className="w-4 h-4" />
//                         View
//                       </Link>
//                       {project.github_code_link && (
//                         <Link
//                           href={project.github_code_link}
//                           target="_blank"
//                           className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
//                         >
//                           <Github className="w-4 h-4" />
//                           Code
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mt-20"
//         >
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
//             <Star className="w-12 h-12 text-yellow-300 mx-auto mb-6" />
//             <h3 className="text-3xl font-bold mb-4">
//               Ready to Start Your Project?
//             </h3>
//             <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
//               Let&apos;s collaborate to bring your ideas to life with modern technologies and innovative solutions.
//             </p>
//             <Link href={"/contact"} >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
//             >
//               <Code className="w-5 h-5" />

//               Start a Project
//               <ArrowRight className="w-5 h-5" />
//             </motion.div>
//               </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Projects;


"use client"
import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt, FaNodeJs,
  FaGitAlt, FaDocker, FaAws, FaVuejs, FaAngular, FaPhp, FaJava,
  FaWordpress, FaFigma, FaLinux
} from "react-icons/fa"
import {
  SiTailwindcss, SiNextdotjs, SiJavascript, SiMongodb, SiExpress,
  SiTypescript, SiPostgresql, SiMysql, SiRedis, SiFirebase,
  SiSupabase, SiPrisma, SiGraphql, SiVercel, SiNetlify, SiSanity,
  SiStripe, SiCloudflare, SiSvelte, SiNuxt, SiDjango, SiFlask,
  SiSpring, SiLaravel, SiRust, SiGo, SiKubernetes, SiElasticsearch, SiShadcnui
} from "react-icons/si"
import {
  ExternalLink, Github, ChevronDown, ChevronUp, Eye, Code,
  Calendar, ArrowRight, Star, Zap, Shield, Clock, Layers,
  TrendingUp, Filter
} from "lucide-react"

// ===== ICON MAP =====
export const iconMap = {
  FaReact: { component: FaReact, color: "#61DAFB" },
  FaPython: { component: FaPython, color: "#3776AB" },
  // FaShopify: { component: FaShopify, color: "#96BF48" },
  FaHtml5: { component: FaHtml5, color: "#E34F26" },
  FaCss3Alt: { component: FaCss3Alt, color: "#1572B6" },
  FaNodeJs: { component: FaNodeJs, color: "#339933" },
  FaGitAlt: { component: FaGitAlt, color: "#F05032" },
  FaDocker: { component: FaDocker, color: "#2496ED" },
  FaAws: { component: FaAws, color: "#FF9900" },
  FaVuejs: { component: FaVuejs, color: "#4FC08D" },
  FaAngular: { component: FaAngular, color: "#DD0031" },
  FaPhp: { component: FaPhp, color: "#777BB4" },
  FaJava: { component: FaJava, color: "#ED8B00" },
  FaWordpress: { component: FaWordpress, color: "#21759B" },
  FaFigma: { component: FaFigma, color: "#F24E1E" },
  FaLinux: { component: FaLinux, color: "#FCC624" },
  SiTailwindcss: { component: SiTailwindcss, color: "#06B6D4" },
  SiNextdotjs: { component: SiNextdotjs, color: "#000000" },
  SiJavascript: { component: SiJavascript, color: "#F7DF1E" },
  SiMongodb: { component: SiMongodb, color: "#47A248" },
  SiExpress: { component: SiExpress, color: "#000000" },
  SiTypescript: { component: SiTypescript, color: "#3178C6" },
  SiPostgresql: { component: SiPostgresql, color: "#336791" },
  SiMysql: { component: SiMysql, color: "#4479A1" },
  SiRedis: { component: SiRedis, color: "#DC382D" },
  SiFirebase: { component: SiFirebase, color: "#FFCA28" },
  SiSupabase: { component: SiSupabase, color: "#3ECF8E" },
  SiPrisma: { component: SiPrisma, color: "#2D3748" },
  SiGraphql: { component: SiGraphql, color: "#E10098" },
  SiVercel: { component: SiVercel, color: "#000000" },
  SiNetlify: { component: SiNetlify, color: "#00C7B7" },
  SiSanity: { component: SiSanity, color: "#F03E2F" },
  SiStripe: { component: SiStripe, color: "#008CDD" },
  SiCloudflare: { component: SiCloudflare, color: "#F38020" },
  SiSvelte: { component: SiSvelte, color: "#FF3E00" },
  SiNuxt: { component: SiNuxt, color: "#00C58E" },
  SiDjango: { component: SiDjango, color: "#092E20" },
  SiFlask: { component: SiFlask, color: "#000000" },
  SiSpring: { component: SiSpring, color: "#6DB33F" },
  SiLaravel: { component: SiLaravel, color: "#FF2D20" },
  SiRust: { component: SiRust, color: "#000000" },
  SiGo: { component: SiGo, color: "#00ADD8" },
  SiKubernetes: { component: SiKubernetes, color: "#326CE5" },
  SiElasticsearch: { component: SiElasticsearch, color: "#005571" },
  SiShadcnui: { component: SiShadcnui, color: "#000000" },
}

const CATEGORY_LABELS = {
  all: "All Projects",
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  ecommerce: "E-commerce",
  mobile: "Mobile",
  "ai-ml": "AI / ML",
  other: "Other",
}

const STATUS_CONFIG = {
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-700" },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-700" },
  planned: { label: "Planned", color: "bg-amber-100 text-amber-700" },
  "on-hold": { label: "On Hold", color: "bg-gray-100 text-gray-600" },
}

const DIFFICULTY_CONFIG = {
  beginner: { label: "Beginner", color: "text-green-600" },
  intermediate: { label: "Intermediate", color: "text-amber-600" },
  advanced: { label: "Advanced", color: "text-red-600" },
}

// ===== ANIMATIONS =====
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// ===== PROJECT CARD =====
const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const descRef = useRef(null)

  useEffect(() => {
    if (descRef.current) {
      setShowBtn(descRef.current.scrollHeight > descRef.current.clientHeight)
    }
  }, [])

  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.completed
  const difficulty = DIFFICULTY_CONFIG[project.difficulty] || DIFFICULTY_CONFIG.intermediate

  return (
    <motion.div
      variants={item}
      layout
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-400 overflow-hidden flex flex-col"
    >
      {/* Featured Badge */}
      {project.isFeatured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
          <Star className="w-3 h-3" /> Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
          src={project.project_image?.url || "/placeholder.jpg"}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Hover CTA */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
        {
        project?.proj_Link && (
          <Link
            href={project.proj_Link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white text-gray-900 text-sm font-semibold px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors shadow-lg"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
          </Link>
        )
        }  
          {project.github_code_link && (
            <Link
              href={project.github_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-900 text-white text-sm font-semibold px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-colors shadow-lg"
            >
              <Github className="w-3.5 h-3.5" /> Code
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
            {status.label}
          </span>
     {project.category && project.category.length > 0 && (
    <div className="flex flex-wrap gap-1.5">
        {project.category.map((cat, index) => (
            <span 
                key={index}
                className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full capitalize"
            >
                {CATEGORY_LABELS[cat] || cat}
            </span>
        ))}
    </div>
)}
          <span className={`text-xs font-medium ml-auto ${difficulty.color}`}>
            {difficulty.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight line-clamp-2">
          {project.title}
        </h3>

        {/* Short Description (card view) */}
        {project.shortDescription && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        )}

        {/* Full Description (expandable - fallback) */}
        {!project.shortDescription && (
          <div>
            <p
              ref={descRef}
              className={`text-sm text-gray-500 leading-relaxed transition-all ${expanded ? '' : 'line-clamp-3'}`}
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            {showBtn && (
              <button
                onClick={() => setExpanded(p => !p)}
                className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-1.5 hover:text-blue-800"
              >
                {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> Less</> : <><ChevronDown className="w-3.5 h-3.5" /> More</>}
              </button>
            )}
          </div>
        )}

        {/* Duration */}
        {project.duration && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {project.duration}
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 8).map((tech, i) => {
              const entry = iconMap[tech.icon]
              if (!entry) return null
              const Icon = entry.component
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15, y: -1 }}
                  title={tech.name}
                  className="bg-gray-50 border border-gray-100 p-1.5 rounded-lg hover:border-gray-300 transition-all"
                >
                  <Icon className="w-4 h-4" style={{ color: entry.color }} />
                </motion.div>
              )
            })}
            {project.techStack.length > 8 && (
              <div className="bg-gray-50 border border-gray-100 px-2 py-1.5 rounded-lg text-xs text-gray-400 font-medium">
                +{project.techStack.length - 8}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <Link
            href={`/projects/info?id=${project._id}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group/link"
          >
            <Eye className="w-4 h-4" />
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {/* Mobile only links */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href={project.proj_Link} target="_blank" className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </Link>
            {project.github_code_link && (
              <Link href={project.github_code_link} target="_blank" className="p-1.5 text-gray-400 hover:text-gray-800 transition-colors">
                <Github className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ===== MAIN PROJECTS COMPONENT =====
const Projects = ({ allProjects = [] }) => {
  const [filter, setFilter] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState(6) // Start with 6 projects

  // Get unique categories from projects
// Agar ek project multiple categories mein ho sakta hai
const usedCategories = [
  "all", 
  ...new Set(
    allProjects.reduce((acc, p) => {
      if (p.category && Array.isArray(p.category)) {
        acc.push(...p.category);
      }
      return acc;
    }, [])
  )
];
  const filtered = filter === "all"
    ? allProjects
    : allProjects.filter(p => p.category && p.category.includes(filter))

  const displayedProjects = filtered.slice(0, visibleProjects)
  const hasMore = visibleProjects < filtered.length

  const loadMore = () => {
    setVisibleProjects(prev => prev + 6)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 mb-6 shadow-sm"
          >
            <Code className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Portfolio</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            A showcase of what I&apos;ve built — from full-stack apps to e-commerce solutions and everything in between.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { icon: Layers, label: "Projects", value: allProjects.length },
              { icon: TrendingUp, label: "Featured", value: allProjects.filter(p => p.isFeatured).length },
              { icon: Zap, label: "Completed", value: allProjects.filter(p => p.status === 'completed').length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                  <Icon className="w-5 h-5 text-blue-500" />
                  {value}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter Tabs */}
        {usedCategories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 flex-wrap justify-center mb-10"
          >
            {usedCategories.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filter === cat
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 max-w-md mx-auto">
              <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Projects Found</h3>
              <p className="text-gray-500 text-sm">
                {filter === "all"
                  ? "I'm working on some amazing projects. Check back soon!"
                  : `No ${CATEGORY_LABELS[filter] || filter} projects yet.`}
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="mt-4 text-sm text-blue-600 font-medium hover:text-blue-800"
                >
                  View all projects →
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={filter}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {displayedProjects.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Load More Projects
            </motion.button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent_60%)]" />
            <Star className="w-10 h-10 text-yellow-300 mx-auto mb-5" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Have a project in mind?</h3>
            <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Let&apos;s work together to turn your ideas into reality with modern tech and clean code.
            </p>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <Code className="w-5 h-5" />
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects