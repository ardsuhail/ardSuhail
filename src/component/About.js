"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

const About = () => {
    return (
        <>

            <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100 py-20 px-6 flex flex-col justify-center items-center">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex md:hidden justify-center"
                    >
                        <Image
                            src="/hi.gif"
                            height={100}
                            width={100}
                            unoptimized
                            alt="ardsuhail - Full Stack Developer"
                            className="rounded-2xl w-[280px] md:w-[320px] hover:scale-105 transition-all duration-300 object-cover object-top max-h-[380px]"
                        />
                    </motion.div>

          
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                            About <span className="text-blue-600">Me</span>
                        </h1>

                        <p className="text-gray-800 leading-relaxed text-lg mb-6">
                            Hey 👋 I’m <span className="font-semibold text-blue-600">ardsuhail</span>, a passionate{" "}
                            <span className="text-emerald-500 font-semibold">Full Stack Web Developer</span> and{" "}
                            <span className="text-blue-500 font-semibold">AI enthusiast</span> from India.
                            I’m currently pursuing my{" "}
                            <span className="text-blue-500 font-semibold">B.Tech in Computer Science (2024–2028)</span>
                            and love building fast, SEO-optimized, and modern digital products.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            I specialize in developing high-performance web apps using{" "}
                            <strong>Next.js, React.js, Node.js, MongoDB, and Tailwind CSS</strong>.
                            I also integrate <strong>Shopify APIs</strong> to create fully customizable,
                            high-conversion eCommerce stores with modern UI, better SEO, and advanced backend logic.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            My passion lies in creating clean, responsive, and scalable solutions
                            that bring real-world impact — from AI-driven tools to full-stack apps
                            that perform great and rank even better on Google.
                        </p>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-3 text-gray-900">My Mission & Vision</h2>
                            <p className="text-gray-700 leading-relaxed">
                                My goal is to build digital experiences that blend creativity, speed, and
                                technical excellence. I focus on <strong>SEO-friendly Next.js development</strong>,
                                <strong>Shopify API integrations</strong>, and <strong>modern UX design</strong> —
                                so every project I create not only looks good but also performs and ranks better.
                            </p>
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Some of My Skills</h2>

                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:scale-105 transition-transform duration-300 cursor-default">
                                Next.js
                            </span>
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium hover:scale-105 transition-transform duration-300 cursor-default">
                                React.js
                            </span>
                            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium hover:scale-105 transition-transform duration-300 cursor-default">
                                Tailwind CSS
                            </span>
                            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-medium hover:scale-105 transition-transform duration-300 cursor-default">
                                Shopify APIs
                            </span>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-6" > <Link href="/skills" className="inline-block mb-6 mt-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg font-semibold shadow-md" > Know About My Skills → </Link> </motion.div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <Link
                                href="/resume.pdf"
                                target="_blank"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 text-white px-5 py-3 rounded-lg font-semibold shadow-md"
                            >
                                <Download className="w-5 h-5" /> Download Resume
                            </Link>

                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 border border-gray-500 hover:bg-gray-900 transition-all duration-300 px-5 py-3 rounded-lg font-semibold text-gray-700 hover:text-white"
                            >
                                View Projects →
                            </Link>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:flex justify-center mt-10 md:mt-0"
                    >
                        <Image 
                            width={100}
                            height={100}
                            unoptimized
                            src="/hi.gif"
                            alt="ardsuhail - Full Stack Developer"
                            className="rounded-2xl w-[300px] md:w-[360px] hover:scale-105 transition-all duration-300 object-cover object-top max-h-[400px]"
                            
                        />
                    </motion.div>
                </div>
            </section>

        </>
    );
};

export default About;
