"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaReact, 
  FaPython, 
  FaShopify,
  FaNodeJs,
  FaGitAlt
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiNextdotjs, 
  SiJavascript, 
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiPostgresql
} from "react-icons/si";
import { 
  Code, 
  Database, 
  Palette, 
  Server, 
  Zap, 
  Shield, 
  Globe,
  Smartphone,
  Rocket,
  Award,
  CheckCircle,
  Star
} from "lucide-react";

const skillsData = {
  frontend: {
    title: "Frontend Development",
    icon: <Palette className="w-6 h-6" />,
    description: "Creating responsive, accessible, and high-performance user interfaces",
    skills: [
      {
        name: "HTML5",
        icon: <FaHtml5 className="w-8 h-8 text-orange-600" />,
        level: 98,
        description: "Semantic markup, accessibility standards, modern HTML5 features",
        color: "from-orange-500 to-red-500",
        features: ["Semantic HTML", "Accessibility", "SEO Friendly"]
      },
      {
        name: "CSS3/Tailwind",
        icon: <SiTailwindcss className="w-8 h-8 text-cyan-500" />,
        level: 96,
        description: "Responsive design, modern layouts, utility-first CSS framework",
        color: "from-cyan-500 to-blue-500",
        features: ["Responsive Design", "Flexbox/Grid", "Tailwind CSS"]
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className="w-8 h-8 text-yellow-500" />,
        level: 95,
        description: "Modern ES6+, asynchronous programming, DOM manipulation",
        color: "from-yellow-500 to-amber-500",
        features: ["ES6+ Features", "Async/Await", "Modern Syntax"]
      },
      {
        name: "React.js",
        icon: <FaReact className="w-8 h-8 text-blue-500" />,
        level: 94,
        description: "Component-based architecture, hooks, state management",
        color: "from-blue-500 to-cyan-500",
        features: ["Hooks", "Components", "State Management"]
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="w-8 h-8 text-gray-900" />,
        level: 92,
        description: "Full-stack React framework with SSR and optimal performance",
        color: "from-gray-900 to-gray-700",
        features: ["SSR/SSG", "App Router", "API Routes"]
      },
      // {
      //   name: "TypeScript",
      //   icon: <SiTypescript className="w-8 h-8 text-blue-600" />,
      //   level: 85,
      //   description: "Type-safe JavaScript development for scalable applications",
      //   color: "from-blue-600 to-blue-800",
      //   features: ["Type Safety", "Interfaces", "Better DX"]
      // }
    ]
  },
  backend: {
    title: "Backend & Database",
    icon: <Server className="w-6 h-6" />,
    description: "Building robust server-side applications and database management",
    skills: [
      {
        name: "Node.js",
        icon: <FaNodeJs className="w-8 h-8 text-green-600" />,
        level: 90,
        description: "JavaScript runtime for building scalable server-side applications",
        color: "from-green-600 to-emerald-500",
        features: ["Runtime", "NPM Ecosystem", "Scalability"]
      },
      {
        name: "Express.js",
        icon: <SiExpress className="w-8 h-8 text-gray-700" />,
        level: 88,
        description: "Minimal and flexible Node.js web application framework",
        color: "from-gray-700 to-gray-900",
        features: ["REST APIs", "Middleware", "Routing"]
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-8 h-8 text-green-500" />,
        level: 85,
        description: "NoSQL database for modern web applications",
        color: "from-green-500 to-green-700",
        features: ["NoSQL", "Mongoose ODM", "Aggregation"]
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="w-8 h-8 text-blue-700" />,
        level: 80,
        description: "Powerful open-source relational database system",
        color: "from-blue-700 to-blue-900",
        features: ["SQL", "Relations", "Performance"]
      }
    ]
  },
  specialized: {
    title: "Specialized Skills",
    icon: <Zap className="w-6 h-6" />,
    description: "Advanced technologies and platforms for specific use cases",
    skills: [
      {
        name: "Shopify",
        icon: <FaShopify className="w-8 h-8 text-green-600" />,
        level: 92,
        description: "Custom store development and API integrations",
        color: "from-green-600 to-green-800",
        features: ["Storefront API", "Custom Themes", "App Development"]
      },
      {
        name: "Python",
        icon: <FaPython className="w-8 h-8 text-blue-700" />,
        level: 82,
        description: "Versatile programming for automation and backend development",
        color: "from-blue-700 to-purple-600",
        features: ["Scripting", "Automation", "Backend Logic"]
      },
      {
        name: "Data Structures",
        icon: <Code className="w-8 h-8 text-purple-600" />,
        level: 85,
        description: "Algorithmic thinking and efficient problem-solving",
        color: "from-purple-600 to-pink-500",
        features: ["Algorithms", "Optimization", "Problem Solving"]
      },
      {
        name: "Git & Deployment",
        icon: <FaGitAlt className="w-8 h-8 text-orange-600" />,
        level: 90,
        description: "Version control and modern deployment practices",
        color: "from-orange-600 to-red-500",
        features: ["Version Control", "CI/CD", "Production Deployment"]
      }
    ]
  }
};

const SkillCard = ({ skill }) => {
  const circumference = 2 * Math.PI * 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
    >
      {/* Header with Icon and Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border">
          {skill.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color}`}></div>
            <span className={`text-xs font-semibold ${
              skill.level >= 90 ? 'text-green-600' :
              skill.level >= 80 ? 'text-blue-600' :
              'text-yellow-600'
            }`}>
              {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {skill.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Proficiency</span>
          <span className="text-sm font-semibold text-gray-700">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        {skill.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 mb-6 shadow-sm"
          >
            <Code className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">TECHNICAL SKILLSET</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              My Skills
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and the technologies 
            I use to build <strong className="text-blue-600">modern, scalable, and high-performance</strong> web applications.
          </p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {[
              { icon: <Shield className="w-4 h-4" />, text: "Production Ready" },
              { icon: <Globe className="w-4 h-4" />, text: "SEO Optimized" },
              { icon: <Smartphone className="w-4 h-4" />, text: "Mobile First" },
              { icon: <Rocket className="w-4 h-4" />, text: "High Performance" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="text-blue-600">{badge.icon}</div>
                <span className="text-sm font-medium text-gray-700">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills Categories */}
        {Object.entries(skillsData).map(([categoryKey, category], categoryIndex) => (
          <motion.section
            key={categoryKey}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600 mt-1">{category.description}</p>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill}
                />
              ))}
            </div>
          </motion.section>
        ))}

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Ready to turn your ideas into reality with modern technologies and best practices?
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <Award className="w-5 h-5" />
              Start Your Project
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;