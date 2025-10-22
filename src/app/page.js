"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HireMeModal from "@/component/HireMeModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col justify-center">
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-emerald-500 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold">
            Hey, I'm <span className="text-yellow-300">Suhail</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light">
            A Passionate <span className="font-semibold">Web Developer</span>, Next.js & Shopify Expert
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
            >
              Hire Me
            </button>
            <Link href="/projects">
              <button className="border-2 cursor-pointer border-yellow-300 px-6 py-2 rounded-xl hover:bg-yellow-300 hover:text-black duration-300">
                View Projects
              </button>
            </Link>
            <HireMeModal isOpen={showModal} onClose={() => setShowModal(false)} />
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img src="/coding.gif" alt="Coding Illustration" className="w-80 md:w-96 drop-shadow-2xl" />
        </div>
      </section>

   

    </main>
  );
}
