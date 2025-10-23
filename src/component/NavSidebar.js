"use client";
import React from "react";
import Link from "next/link";
import { SidebarClose } from "lucide-react";
import { useAppContext } from "./Context";

const NavSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <nav
      className={`fixed top-0 left-0 h-full w-[80vw] sm:hidden 
      bg-black/80 backdrop-blur-xl border-r border-white/20
      shadow-2xl z-[999]
      flex flex-col gap-10 px-8 py-8 transition-transform duration-500
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
     <div  className="flex items-center justify-between">

      {/* Logo */}
      <Link
        href="/"
        onClick={() => setSidebarOpen(false)}
        className="text-2xl  relative right-3 font-extrabold font-mono text-transparent
        bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300
        active:scale-110 transition-transform"
      >
        &lt; ArdSuhail /&gt;
      </Link>

      <button
        onClick={() => setSidebarOpen(false)}
        className="text-white absolute right-2   hover:rotate-180 transition-all duration-300"
        >
        <SidebarClose size={32} />
      </button>
          </div>
      {/* Navigation Links */}
      <ul className="flex flex-col gap-6 text-xl">
        {[
          ["Home", "/"],
          ["Projects", "/projects"],
          ["Skills", "/skills"],
          ["Contact Me", "/contact"],
          ["About Me", "/about"],
        ].map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="block px-4 py-3 rounded-xl text-white font-medium
              hover:bg-white/20 hover:backdrop-blur-md hover:shadow-lg
              transition-all duration-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavSidebar;
