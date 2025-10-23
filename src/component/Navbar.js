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

  const handleLogout = (e) => {
    localStorage.removeItem("notlogin")
    setToken(null)
    window.location.href = "/"

  }

  return (
    <nav className="relative w-full z-50 bg-gradient-to-r from-blue-600 via-indigo-700 to-emerald-600 shadow-lg backdrop-blur-lg bg-opacity-80 px-10 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className=" absolute left-2 sidebar flex sm:hidden"> 
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none md:hidden"
        >
        
          <SidebarOpen className="w-8 h-8 hover:scale-110 transition-transform duration-300" />

        </button>
      </div>
      <div className="logo   hover:scale-110 transition-transform duration-300 ">
        <Link
          href="/"
          className=" text-3xl ml-10 md:ml-0 lg:ml-4 sm:text-3xl md:text-4xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 tracking-tight    "
        >
          &lt;ArdSuhail/&gt;
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden mr-5 sm:flex gap-6 md:gap-10 items-center text-lg font-medium text-gray-200">
        {[
          ["Home", "/"],
          ["About", "/about"],
          ["Skills", "/skills"],
          ["Projects", "/projects"],
          ["Contact", "/contact"],
        ].map(([label, href]) => (
          <li key={label} className="relative group  hover:scale-x-105 duration-300 transition-all ">
            <Link
              href={href}
              className="transition-all duration-300 hover:text-cyan-300   "
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
        
          <SidebarOpen className="w-8 h-8 hover:scale-110 transition-transform duration-300" />

        </button>
      </div>
          {/* <button
            onClick={() => setDropDown(!dropDown)} onBlur={() => {
              setTimeout(() => {
                setDropDown(false)
              }, 500);
            }}
            className=" group    cursor-pointer flex gap-2 items-center justify-center
                    px-2  py-1 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600
                     text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Dashboard <span className="text-white">{dropDown ? <ChevronUp /> : <ChevronDown className="animate-bounce" />}</span>
          </button> */}
          {/* {dropDown && (
            <div className="absolute top-20 right-5 z-50">
              <ul
                className="flex flex-col gap-2 bg-white/90 backdrop-blur-md shadow-2xl
                 items-start w-44 py-4 rounded-2xl border border-white/30
                 transition-all duration-300 ease-in-out animate-slideDown"
              >
                <li className="w-full">
                  <Link
                    href="/admin/queries"
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
            </div>
          )} */}

        </>
      )}
    </nav>
  );
};

export default Navbar;
