"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import HireMeModal from "@/component/HireMeModal";
import { 
  Code, 
  Server, 
  Layers, 
  ChevronRight, 
  Award, 
  Clock, 
  TrendingUp,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Palette
} from "lucide-react";

// ✅ SEO Component alag se banayein
const SEOHead = () => {
  return (
    <>
      <title>Suhail - Full Stack Web Developer | React & Next.js Expert</title>
      <meta 
        name="description" 
        content="Professional Full Stack Web Developer specializing in React.js, Next.js, Node.js. Building scalable web applications with modern technologies. Available for hire." 
      />
      <meta name="keywords" content="Full Stack Developer, React Developer, Next.js, Node.js, MongoDB, Web Development, Hire Developer" />
      <meta name="author" content="Suhail" />
      <meta property="og:title" content="Suhail - Full Stack Web Developer" />
      <meta property="og:description" content="Professional Full Stack Web Developer building modern web applications with React, Next.js & Node.js" />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://yoursite.com" />
    </>
  );
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { icon: <Award className="w-6 h-6" />, number: "10+", label: "Projects Delivered" },
    { icon: <Clock className="w-6 h-6" />, number: "2+", label: "Years Experience" },
    { icon: <TrendingUp className="w-6 h-6" />, number: "100%", label: "Client Satisfaction" },
    { icon: <CheckCircle className="w-6 h-6" />, number: "50K+", label: "Lines of Code" }
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Building responsive, high-performance UIs with React, Next.js & Tailwind CSS. Pixel-perfect implementation with SEO optimization.",
      features: ["SEO Optimized", "Mobile First", "Fast Loading"]
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend & APIs",
      description: "Secure, scalable APIs using Node.js, Express & MongoDB. Robust authentication & real-time features.",
      features: ["REST APIs", "Authentication", "Database Design"]
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Full Stack Solutions",
      description: "End-to-end development from concept to deployment. Clean architecture & maintainable code.",
      features: ["End-to-End", "Clean Code", "Deployment Ready"]
    }
  ];

  const techStack = [
    { name: "Next.js", category: "Framework", level: "Expert" },
    { name: "React.js", category: "Library", level: "Expert" },
    { name: "Node.js", category: "Runtime", level: "Advanced" },
    // { name: "TypeScript", category: "Language", level: "Advanced" },
    { name: "MongoDB", category: "Database", level: "Advanced" },
    { name: "Tailwind CSS", category: "Styling", level: "Expert" },
    { name: "Express.js", category: "Backend", level: "Advanced" },
    { name: "PostgreSQL", category: "Database", level: "Intermediate" }
  ];

  return (
    <>
      {/* ✅ SEO Meta Tags - Layout mein ya next/head use karein */}
      {/* Ye tags aapke layout.js mein ya next/head component mein hona chahiye */}

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-200 to-sky-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-sky-200 to-indigo-200 rounded-full blur-3xl opacity-30"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative max-w-6xl mx-auto text-center z-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Available for new projects</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block text-gray-900">Transforming Ideas</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 bg-clip-text text-transparent">
                Into Digital Reality
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              I&apos;m <strong className="text-gray-800">Suhail</strong>, a passionate{" "}
              <strong className="text-gray-800">Full Stack Developer</strong> crafting 
              scalable, high-performance web applications with modern technologies.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                href="/projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  View My Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <button
                onClick={() => setShowModal(true)}
                className="group px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Hire Me <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure & Scalable</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span>High Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>SEO Optimized</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-indigo-600 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What I <span className="bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">Offer</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive web development services tailored to bring your digital vision to life
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="text-indigo-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                My <span className="bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">Tech Stack</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Modern technologies I use to build fast, scalable, and maintainable applications
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {tech.name}
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      {tech.category}
                    </div>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      tech.level === 'Expert' 
                        ? 'bg-green-100 text-green-800' 
                        : tech.level === 'Advanced'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tech.level}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/skills"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <Palette className="w-5 h-5" />
                Explore Detailed Skills & Expertise
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-600 to-sky-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Ready to Bring Your Idea to Life?
              </h2>
              <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Let&apos;s collaborate to create something extraordinary. From concept to deployment, I&apos;ll be with you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start a Project
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300"
                >
                  Learn More About Me
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hire Me Modal */}
        <HireMeModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </main>
    </>
  );
}