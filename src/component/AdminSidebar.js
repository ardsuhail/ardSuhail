"use client";
import React from "react";
import Link from "next/link";
import { SidebarClose } from "lucide-react";
import { useAppContext } from "./Context";

const AdminSidebar = () => {
  const { adminSidebarOpen, setAdminSidebarOpen } = useAppContext();

  return (
    <nav
      className={`fixed top-0 right-0 h-full w-[80vw]  
      bg-white/15 backdrop-blur-xl border-r border-white/20
      shadow-2xl z-[999]
      flex flex-col gap-10 px-8 py-8 transition-transform duration-500
    ${adminSidebarOpen ? "translate-x-0" : "translate-x-full"}

    `}
    >
     <div  className="flex items-center justify-between">

      {/* Logo */}
      <Link
        href="/"
        onClick={() => setAdminSidebarOpen(false)}
        className="text-2xl  relative right-3 font-extrabold font-mono text-transparent
        bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300
        active:scale-110 transition-transform"
      >
        &lt; ArdSuhail /&gt;
      </Link>

      <button
        onClick={() => setAdminSidebarOpen(false)}
        className="text-white absolute right-2   hover:rotate-180 transition-all duration-300"
        >
        <SidebarClose size={32} />
      </button>
          </div>
      {/* Navigation Links */}
      <ul className="flex flex-col gap-6 text-xl">
    <li className="w-full">
                    <Link
                        href="/admin/queries"
                        onClick={()=>setAdminSidebarOpen(false)}
                        className="block w-full text-lg text-gray-800 font-medium px-3 py-2 rounded-lg
                     hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500
                     hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Quries
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        href="/admin/add-project"
                          onClick={()=>setAdminSidebarOpen(false)}
                        className="block w-full text-lg text-gray-800 font-medium px-3 py-2 rounded-lg
                     hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500
                     hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Add Projects
                    </Link>
                </li>
                <li className="w-full">
                    <Link
                        href="/admin/your-projects"
                          onClick={()=>setAdminSidebarOpen(false)}
                        className="block w-full text-lg text-gray-800 font-medium px-3 py-2 rounded-lg
                     hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500
                     hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Your  Projects
                    </Link>
                </li>

                <li className="w-full">
                    <Link
                        href="/admin/setting"
                          onClick={()=>setAdminSidebarOpen(false)}
                        className="block w-full text-lg text-gray-800 font-medium px-3 py-2 rounded-lg
                     hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500
                     hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Settings
                    </Link>

                </li>

                <button
                    onClick={async () => {
                        await fetch("/api/logout", { method: "POST" });
                        localStorage.removeItem("notlogin"); // agar use kiya ho
                        window.location.href = "/"; // redirect homepage or login page
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>

      </ul>
    </nav>
  );
};

export default AdminSidebar;
