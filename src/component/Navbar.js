"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, SidebarOpen } from "lucide-react";
import { useAppContext } from "./Context";
const Navbar = () => {
  const [dropDown, setDropDown] = useState(false)
  const [token, setToken] = useState(null);
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen,adminSidebarOpen,setAdminSidebarOpen } = useAppContext();

  useEffect(() => {
    const t = localStorage.getItem("notlogin");
    setToken(t);
    // setLoading(false);
    // if (!t) router.replace("/");
  }, []);

  

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-300 backdrop-blur-md shadow-md px-6 md:px-10 py-4 flex justify-between items-center">
 
      <div className=" absolute left-2 sidebar flex sm:hidden"> 
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none md:hidden"
        >
        
          <SidebarOpen className="w-8 h-8 text-gray-900 hover:scale-110 transition-transform duration-300" />

        </button>
      </div>
  <div className="logo hover:scale-110 transition-transform duration-300">
  <Link
    href="/"
    className="text-3xl ml-14 sm:ml-0 sm:text-3xl md:text-4xl lg:text-4xl font-mono font-extrabold text-transparent bg-clip-text 
               bg-gradient-to-r from-indigo-500 to-sky-500 tracking-tight"
  >
    &lt;ArdSuhail/&gt;
  </Link>
</div>


      
      <ul className="hidden mr-5 sm:flex gap-6 md:gap-10  lg:mr-5 items-center text-lg font-medium text-gray-200">
        {[
          ["Home", "/"],
          ["About", "/about"],
          ["Skills", "/skills"],
          ["Projects", "/projects"],
          ["Contact", "/contact"],
        ].map(([label, href]) => (
          <li key={label} className="relative text-gray-700 group  hover:scale-x-105 duration-300 transition-all ">
            <Link
              href={href}
              className="transition-all duration-300 hover:text-cyan-600   "
            >
              {label}
              <span className="absolute  left-0 -bottom-1 w-0 h-[2.5px] bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300 group-hover:w-full  "></span>
            </Link>
          </li>
        ))}
      </ul>
      {!token ? "" : (
        <>
         <div className=" absolute right-3  mt-1 sidebar "> 
        <button
          onClick={() => setAdminSidebarOpen(true)}
          className="text-white active:scale-110 focus:outline-none "
        >
        
          <SidebarOpen className="w-8 h-8 text-gray-900 hover:scale-110 transition-transform duration-300" />

        </button>
      </div>
       
        </>
      )}
    </nav>
  );
};

export default Navbar;
