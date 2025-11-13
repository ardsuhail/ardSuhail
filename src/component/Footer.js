"use client";
import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { Mail, FileText, ExternalLink, Heart, Code, Shield, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-white/95  shadow-md backdrop-blur-xl border-t border-gray-400/50 overflow-hidden">
      {/* Light Background Elements matching Navbar */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ArdSuhail
                </h3>
                <p className="text-sm text-gray-600">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Crafting digital experiences with modern technologies and innovative solutions. 
              Let&apos;s build something amazing together.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Available for new projects</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
              <Code className="w-5 h-5 text-blue-600" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Skills", href: "/skills" },
                { name: "Projects", href: "/projects" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 py-2"
                  >
                    <div className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
              <ExternalLink className="w-5 h-5 text-purple-600" />
              Connect
            </h4>
            <ul className="space-y-3">
              {[
                {
                  icon: <FaInstagram className="w-5 h-5" />,
                  name: "Instagram",
                  href: "https://www.instagram.com/ardsuhail",
                  color: "hover:text-pink-600",
                  bgColor: "hover:bg-pink-50"
                },
                {
                  icon: <FaGithub className="w-5 h-5" />,
                  name: "GitHub",
                  href: "https://github.com/ardsuhail",
                  color: "hover:text-gray-900",
                  bgColor: "hover:bg-gray-100"
                },
                {
                  icon: <FaLinkedin className="w-5 h-5" />,
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/in/ardsuhail",
                  color: "hover:text-blue-600",
                  bgColor: "hover:bg-blue-50"
                },
                {
                  icon: <FaFacebook className="w-5 h-5" />,
                  name: "Facebook",
                  href: "https://www.facebook.com/ardsuhail",
                  color: "hover:text-blue-700",
                  bgColor: "hover:bg-blue-50"
                }
              ].map((social) => (
                <li key={social.name}>
                  <Link
                    target="_blank"
                    href={social.href}
                    className={`group flex items-center gap-3 text-gray-600 ${social.color} transition-all duration-300 py-2 px-3 rounded-2xl ${social.bgColor}`}
                  >
                    {social.icon}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {social.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
              <FileText className="w-5 h-5 text-green-600" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 py-2"
                >
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Download Resume
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 py-2"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    View Projects
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@ardsuhail.com"
                  className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 py-2"
                >
                  <Mail className="w-4 h-4 text-yellow-600" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    support@ardsuhail.com
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
     <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  viewport={{ once: true }}
  className="border-t border-gray-300/50 mt-12 pt-6"
>
  <div className="flex flex-col items-center gap-3 text-center">
    
    {/* Availability Badge - Top on Mobile */}
    <div className="w-full flex justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
      <span className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 shadow-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-gray-700 text-sm font-medium">Available for freelance</span>
      </span>
    </div>

    {/* Copyright Section */}
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4 text-gray-600 text-sm w-full justify-between">
      <div className="flex items-center gap-2 order-2 sm:order-1">
        <span>© {currentYear} ArdSuhail</span>
        <span className="text-gray-400">•</span>
        <span>All rights reserved</span>
      </div>
      
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <span>Made with</span>
        <Heart className="w-3 h-3 text-red-500 fill-current" />
        <span>by Suhail</span>
      </div>
    </div>

  </div>
</motion.div>
      </div>
    </footer>
  );
}