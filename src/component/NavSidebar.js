"use client";
import React from "react";
import Link from "next/link";
import { SidebarClose } from "lucide-react";
import { useAppContext } from "./Context";
import { Home, Code, FileText, Mail, User } from "lucide-react";
import { usePathname } from "next/navigation";
const NavSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const pathname = usePathname();
  return (
    <nav
      className={`fixed top-0 left-0 h-full w-[80vw] sm:hidden
    bg-white/95 backdrop-blur-lg border-r border-gray-200
    shadow-xl z-[999]
    flex flex-col transition-transform duration-500
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      {/* Logo */}
      <div className="flex flex-col items-center px-6 py-6">
        <div className="flex items-center justify-between w-full">

        <Link
          href="/"
          onClick={() => setSidebarOpen(false)}
          className="text-2xl font-extrabold font-mono text-transparent
        bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500
        active:scale-110 transition-transform"
        >
          &lt; ArdSuhail /&gt;
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gblack hover:text-gray-900 hover:rotate-180 transition-all duration-300"
        >
          <SidebarClose size={32} />
        </button>
          </div>
        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-6 shadow-sm"></div>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-4 text-lg px-6">
        {[
          { label: "Home", href: "/", icon: <Home size={20} /> },
          { label: "Projects", href: "/projects", icon: <Code size={20} /> },
          { label: "Skills", href: "/skills", icon: <FileText size={20} /> },
          { label: "Contact Me", href: "/contact", icon: <Mail size={20} /> },
          { label: "About Me", href: "/about", icon: <User size={20} /> },
        ].map(({ label, href, icon }) => {
          const isActive = pathname === href; // check active link
          return (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300
              ${isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-emerald-100 hover:shadow-md"
                  }`}
              >
                {icon} {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

  );
};

export default NavSidebar;
