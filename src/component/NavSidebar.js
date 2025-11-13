"use client";
import React from "react";
import Link from "next/link";
import { SidebarClose } from "lucide-react";
import { useAppContext } from "./Context";
import { Home, Code, FileText, Mail, User, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";

const NavSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-opacity duration-500 sm:hidden
          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-sm sm:hidden
          bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-2xl
          border-r border-gray-100/80
          shadow-2xl shadow-blue-500/10 z-[999]
          flex flex-col transition-all duration-500 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center px-6 py-8">
          <div className="flex items-center justify-between w-full mb-2">
            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className="group flex items-center gap-2"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-lg p-1">
                  <Sparkles size={20} className="text-cyan-500" />
                </div>
              </div>
              <span className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">
                &lt;ArdSuhail/&gt;
              </span>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 
                         hover:scale-110 hover:rotate-90 active:scale-95 group"
            >
              <X
                size={28}
                className="text-gray-600 group-hover:text-gray-900 transition-colors"
              />
            </button>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-6 pb-8">
          <ul className="flex flex-col gap-3">
            {[
              { label: "Home", href: "/", icon: <Home size={22} /> },
              { label: "Projects", href: "/projects", icon: <Code size={22} /> },
              { label: "Skills", href: "/skills", icon: <FileText size={22} /> },
              { label: "Contact", href: "/contact", icon: <Mail size={22} /> },
              { label: "About", href: "/about", icon: <User size={22} /> },
            ].map(({ label, href, icon }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-4 px-4 py-4 rounded-2xl font-semibold 
                               transition-all duration-300 relative overflow-hidden
                              ${isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 border border-transparent hover:border-gray-100"
                      }`}
                  >
                    {/* Animated Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 transition-opacity duration-300
                                   ${isActive ? "opacity-100" : "group-hover:opacity-5"}`} />

                    {/* Icon with Gradient */}
                    <div className={`relative z-10 transition-transform duration-300 
                                   ${isActive ? "text-white scale-110" : "text-gray-600 group-hover:text-cyan-600 group-hover:scale-110"}`}>
                      {icon}
                    </div>

                    {/* Label */}
                    <span className="relative z-10 transition-all duration-300">
                      {label}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer Section */}
        <div className="px-6 py-6 border-t border-gray-200/60">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium">
              Let&apos;s build something amazing
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavSidebar;