"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Code, Rocket, Target, Heart, Sparkles, Award, Clock, Users, Zap } from "lucide-react";
import Image from "next/image";

const About = () => {
    const stats = [
        { icon: <Code className="w-5 h-5" />, number: "10+", label: "Projects Built" },
        { icon: <Clock className="w-5 h-5" />, number: "2+", label: "Years Coding" },
        { icon: <Users className="w-5 h-5" />, number: "100%", label: "Client Satisfaction" },
        { icon: <Zap className="w-5 h-5" />, number: "50K+", label: "Lines of Code" }
    ];

    const coreSkills = [
        { name: "Next.js", level: "Expert", color: "bg-gray-800 text-white" },
        { name: "React.js", level: "Expert", color: "bg-blue-600 text-white" },
        { name: "Node.js", level: "Advanced", color: "bg-green-600 text-white" },
        { name: "Tailwind CSS", level: "Expert", color: "bg-cyan-500 text-white" },
        { name: "MongoDB", level: "Advanced", color: "bg-green-700 text-white" },
        { name: "Shopify API", level: "Advanced", color: "bg-green-500 text-white" },
        { name: "TypeScript", level: "Intermediate", color: "bg-blue-700 text-white" },
        { name: "Express.js", level: "Advanced", color: "bg-gray-600 text-white" }
    ];

    const passions = [
        { icon: <Rocket className="w-5 h-5" />, text: "Building Scalable Web Apps" },
        { icon: <Target className="w-5 h-5" />, text: "SEO-Optimized Development" },
        { icon: <Heart className="w-5 h-5" />, text: "Clean & Maintainable Code" },
        { icon: <Sparkles className="w-5 h-5" />, text: "Modern UI/UX Design" }
    ];

    return (
        <>
            {/* Hero About Section */}
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-100/50 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-40"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Image Section - Mobile First */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1 flex justify-center lg:justify-end"
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative">
                                    <Image
                                        src="/hi.gif"
                                        height={400}
                                        width={400}
                                        unoptimized
                                        alt="ArdSuhail - Full Stack Web Developer"
                                        className="rounded-2xl w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] hover:scale-105 transition-all duration-500 object-cover object-top shadow-2xl border-4 border-white"
                                    />
                                    {/* Floating Elements */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border"
                                    >
                                        <Code className="w-6 h-6 text-blue-600" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg border"
                                    >
                                        <Rocket className="w-6 h-6 text-green-600" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2"
                        >
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-center lg:text-left mb-8"
                            >
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                        About Me
                                    </span>
                                </h1>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto lg:mx-0"></div>
                            </motion.div>

                            {/* Introduction */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="space-y-6 mb-8"
                            >
                                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                                    Hey <span className="text-2xl">👋</span> I&apos;m{" "}
                                    <strong className="text-blue-600 font-semibold">Suhail</strong> (@ardsuhail), a passionate{" "}
                                    <strong className="text-emerald-600">Full Stack Developer</strong> and{" "}
                                    <strong className="text-blue-500">AI Enthusiast</strong> crafting digital experiences that make an impact.
                                </p>

                                <p className="text-gray-600 leading-relaxed">
                                    Currently pursuing my <strong className="text-blue-600">BCA (2025–2028)</strong>, 
                                    I specialize in building <strong>high-performance, SEO-optimized web applications</strong> using modern 
                                    technologies like <strong>Next.js, React, Node.js, and MongoDB</strong>.
                                </p>

                                <p className="text-gray-600 leading-relaxed">
                                    I have extensive experience in <strong>Shopify API integrations</strong>, creating custom eCommerce 
                                    solutions that combine beautiful design with powerful functionality and superior SEO performance.
                                </p>
                            </motion.div>

                            {/* Stats Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="text-blue-600 mb-2 flex justify-center">
                                            {stat.icon}
                                        </div>
                                        <div className="text-xl font-bold text-gray-900 mb-1">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Core Skills */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mb-8"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Core Technologies</h3>
                                <div className="flex flex-wrap gap-3">
                                    {coreSkills.map((skill, index) => (
                                        <motion.span
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            className={`px-4 py-2 ${skill.color} rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-default`}
                                        >
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 items-center"
                            >
                                <Link
                                    href="/resume.pdf"
                                    target="_blank"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center gap-3">
                                        <Download className="w-5 h-5" />
                                        Download Resume
                                    </span>
                                </Link>

                                <Link
                                    href="/projects"
                                    className="group px-8 py-4 border-2 border-gray-800 text-gray-800 font-semibold rounded-2xl hover:bg-gray-800 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg"
                                >
                                    <span className="flex items-center gap-2">
                                        View My Work <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Passion Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            My <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Mission</span> & Passion
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            I believe in creating digital experiences that not only look amazing but also deliver 
                            exceptional performance and real business results.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg border border-blue-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-600 rounded-2xl">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">My Mission</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                To build <strong>SEO-friendly, high-performance web applications</strong> that help 
                                businesses thrive in the digital space. I focus on creating solutions that are 
                                <strong> scalable, maintainable, and user-centric</strong> — ensuring every project 
                                I deliver not only meets but exceeds expectations.
                            </p>
                        </motion.div>

                        {/* Passion */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg border border-emerald-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-emerald-600 rounded-2xl">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">What Drives Me</h3>
                            </div>
                            <div className="space-y-4">
                                {passions.map((passion, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 p-3 bg-white/50 rounded-xl hover:bg-white transition-all duration-300"
                                    >
                                        <div className="text-blue-600">
                                            {passion.icon}
                                        </div>
                                        <span className="text-gray-700 font-medium">{passion.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Skills CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/skills"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                        >
                            <Award className="w-5 h-5" />
                            Explore My Skills in Detail
                            <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                            Ready to Build Something Amazing?
                        </h2>
                        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Let&apos;s collaborate to turn your ideas into reality. I&apos;m passionate about creating 
                            digital solutions that drive results and make an impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Start a Conversation
                            </Link>
                            <Link
                                href="/projects"
                                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-300"
                            >
                                See My Work
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default About;