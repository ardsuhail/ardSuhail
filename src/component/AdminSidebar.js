"use client";
import React from "react";
import Link from "next/link";
import { SidebarClose } from "lucide-react";
import { useAppContext } from "./Context";

const AdminSidebar = () => {
  const { adminSidebarOpen, setAdminSidebarOpen } = useAppContext();

  return (
  <nav
  className={`fixed top-0 right-0 h-full w-[90vw] sm:w-[60vw]  md:w-[40vw] lg:w-[25vw] bg-white/95 backdrop-blur-lg border-l border-gray-200
    shadow-xl z-[999] flex flex-col gap-10 px-6 py-8 transition-transform duration-500
    ${adminSidebarOpen ? "translate-x-0" : "translate-x-full"}
  `}
>
  <div className="flex items-center justify-between">

    {/* Logo */}
    <Link
      href="/"
      onClick={() => setAdminSidebarOpen(false)}
      className="text-2xl font-extrabold font-mono text-transparent bg-clip-text 
                 bg-gradient-to-r from-indigo-500 to-sky-500 tracking-tight
                 active:scale-110 transition-transform"
    >
      &lt; ArdSuhail /&gt;
    </Link>

    <button
      onClick={() => setAdminSidebarOpen(false)}
      className="text-gray-600 hover:text-gray-900 hover:rotate-180 transition-all duration-300"
    >
      <SidebarClose size={32} />
    </button>
  </div>

  {/* Navigation Links */}
  <ul className="flex flex-col gap-4 text-lg mt-6">
    <li>
      <Link
        href="/admin/queries"
        onClick={() => setAdminSidebarOpen(false)}
        className="block w-full text-gray-800 font-medium px-4 py-2 rounded-lg
                   hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-200
                   transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Queries
      </Link>
    </li>
    <li>
      <Link
        href="/admin/add-project"
        onClick={() => setAdminSidebarOpen(false)}
        className="block w-full text-gray-800 font-medium px-4 py-2 rounded-lg
                   hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-200
                   transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Add Projects
      </Link>
    </li>
    <li>
      <Link
        href="/admin/your-projects"
        onClick={() => setAdminSidebarOpen(false)}
        className="block w-full text-gray-800 font-medium px-4 py-2 rounded-lg
                   hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-200
                   transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Your Projects
      </Link>
    </li>
    <li>
      <Link
        href="/admin/setting"
        onClick={() => setAdminSidebarOpen(false)}
        className="block w-full text-gray-800 font-medium px-4 py-2 rounded-lg
                   hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-200
                   transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Settings
      </Link>
    </li>

    {/* Logout Button */}
    <button
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        localStorage.removeItem("notlogin"); 
        window.location.href = "/";
      }}
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
    >
      Logout
    </button>
  </ul>
</nav>

  );
};

export default AdminSidebar;
