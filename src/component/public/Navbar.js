
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import { Menu, X, Settings, Shield } from "lucide-react";
import { useAppContext } from "../Context";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: {
    y: -12,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Navbar = () => {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState(null);

  const {
    sidebarOpen,
    setSidebarOpen,
    adminSidebarOpen,
    setAdminSidebarOpen,
  } = useAppContext();

  // Check admin login status
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("notlogin"));
    };

    syncToken();

    window.addEventListener("storage", syncToken);
    window.addEventListener("focus", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("focus", syncToken);
    };
  }, [pathname]);

  // Lightweight scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Detect active navigation link
  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -24 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed inset-x-0 top-0 z-50 w-full
          border-b backdrop-blur-md
          transition-[background-color,border-color,box-shadow]
          duration-300
          ${
            isScrolled
              ? "border-slate-200/80 bg-white/95 shadow-md shadow-indigo-950/5"
              : "border-slate-200/40 bg-white/85"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex h-[76px] items-center justify-between gap-3">

            {/* ================= LEFT SIDE ================= */}

            <div className="flex shrink-0 items-center gap-3">

              {/* Mobile Menu Button */}

              <button
                type="button"
                aria-label={
                  sidebarOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={sidebarOpen}
                onClick={() => {
                  setSidebarOpen(!sidebarOpen);
                }}
                className="flex size-10 shrink-0 items-center
                  justify-center rounded-xl border border-slate-200
                  bg-linear-to-br from-blue-50 to-purple-50
                  text-slate-700 transition-colors duration-200
                  hover:border-indigo-200 hover:text-indigo-600
                  active:scale-95 lg:hidden
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-indigo-600"
              >
                {sidebarOpen ? (
                  <X size={21} strokeWidth={2} />
                ) : (
                  <Menu size={21} strokeWidth={2} />
                )}
              </button>

              {/* Brand Logo */}

              <Link
                href="/"
                aria-label="ArdSuhail homepage"
                className="group flex items-center gap-2.5 sm:gap-3"
              >
                <div className="relative shrink-0">

                  <div
                    className="flex size-10 items-center
                      justify-center rounded-2xl
                      bg-linear-to-br from-blue-600 via-indigo-600
                      to-purple-600 text-lg font-bold text-white
                      shadow-md shadow-indigo-500/20
                      motion-safe:transition-transform
                      motion-safe:group-hover:scale-105
                      duration-300 sm:size-11"
                  >
                    A
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1
                      -z-10 rounded-2xl bg-indigo-500/20
                      opacity-0 blur-md transition-opacity
                      duration-300 group-hover:opacity-100"
                  />

                </div>

                <div className="flex flex-col justify-center">

                  <span
                    className="bg-linear-to-r from-slate-950
                      to-slate-700 bg-clip-text
                      text-xl font-bold leading-tight tracking-tight
                      text-transparent sm:text-2xl"
                  >
                    ArdSuhail
                  </span>

                  <span
                    className="mt-0.5 text-[10px] font-medium
                      text-slate-500 sm:text-xs"
                  >
                    Full Stack Developer
                  </span>

                </div>
              </Link>
            </div>

            {/* ================= DESKTOP NAVIGATION ================= */}

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden items-center gap-4 lg:flex xl:gap-7"
            >
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <motion.li
                    key={item.href}
                    variants={itemVariants}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center
                        whitespace-nowrap py-2 text-sm font-medium
                        transition-colors duration-200
                        xl:text-[15px]
                        focus-visible:rounded-md
                        focus-visible:outline-2
                        focus-visible:outline-indigo-600
                        ${
                          active
                            ? "text-indigo-600"
                            : "text-slate-600 hover:text-indigo-600"
                        }`}
                    >
                      {item.label}

                      {/* Active / Hover Underline */}

                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0
                          h-0.5 origin-left rounded-full
                          bg-linear-to-r from-blue-600
                          via-indigo-600 to-purple-600
                          motion-safe:transition-transform
                          duration-300
                          ${
                            active
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }`}
                      />

                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* ================= RIGHT SIDE ACTIONS ================= */}

            <div className="flex shrink-0 items-center gap-3">

              {/* Desktop Admin Button */}

              {token && (
                <motion.button
                  type="button"
                  aria-label="Open admin panel"
                  aria-expanded={adminSidebarOpen}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setAdminSidebarOpen(!adminSidebarOpen);
                  }}
                  className="hidden items-center gap-2
                    rounded-xl bg-linear-to-r from-blue-600
                    to-purple-600 px-4 py-2.5
                    text-sm font-semibold text-white
                    shadow-md shadow-indigo-500/15
                    transition-colors duration-200
                    hover:from-blue-700 hover:to-purple-700
                    sm:inline-flex
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-indigo-600"
                >
                  <Shield size={16} strokeWidth={2} />
                  <span>Admin</span>
                </motion.button>
              )}

              {/* Mobile Admin Button */}

              {token && (
                <motion.button
                  type="button"
                  aria-label="Open admin panel"
                  aria-expanded={adminSidebarOpen}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setAdminSidebarOpen(!adminSidebarOpen);
                  }}
                  className="flex size-10 items-center
                    justify-center rounded-xl
                    bg-linear-to-br from-blue-600 to-purple-600
                    text-white shadow-md shadow-indigo-500/15
                    sm:hidden"
                >
                  <Settings size={19} strokeWidth={2} />
                </motion.button>
              )}

              {/* Desktop Contact CTA */}

              {!token && (
                <Link
                  href="/contact"
                  className="group hidden items-center
                    justify-center gap-2 whitespace-nowrap
                    rounded-xl bg-linear-to-r
                    from-indigo-600 to-blue-600
                    px-4 py-2.5 text-sm font-semibold text-white
                    shadow-md shadow-indigo-500/20
                    motion-safe:transition-transform
                    motion-safe:hover:-translate-y-0.5
                    motion-safe:active:translate-y-0
                    duration-200 lg:inline-flex xl:px-5
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-indigo-600"
                >
                  Let&apos;s Talk

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="motion-safe:transition-transform
                      motion-safe:group-hover:translate-x-0.5
                      motion-safe:group-hover:-translate-y-0.5
                      duration-200"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              )}

            </div>
          </div>
        </div>
      </motion.nav>
    </MotionConfig>
  );
};

export default Navbar;
