
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";

import {
  Home,
  User,
  Code2,
  Layers,
  BriefcaseBusiness,
  Mail,
  X,
  ArrowUpRight,
  ChevronRight,
  Globe,
} from "lucide-react";

import { useAppContext } from "../Context";

// Navigation Items

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    description: "Back to homepage",
  },
  {
    label: "About",
    href: "/about",
    icon: User,
    description: "Get to know me",
  },
  {
    label: "Skills",
    href: "/skills",
    icon: Layers,
    description: "Technologies & expertise",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Code2,
    description: "Explore my recent work",
  },
  {
    label: "Services",
    href: "/services",
    icon: BriefcaseBusiness,
    description: "Web & digital solutions",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
    description: "Let's get in touch",
  },
];

// Animation Configuration

const ease = [0.22, 1, 0.36, 1];

const sidebarVariants = {
  hidden: {
    x: "-100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease,
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 0.28,
      ease: "easeInOut",
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.055,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

const NavSidebar = () => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const sidebarRef = useRef(null);
  const closeButtonRef = useRef(null);

  const {
    sidebarOpen,
    setSidebarOpen,
  } = useAppContext();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when switching to desktop

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px)"
    );

    const handleResize = () => {
      if (mediaQuery.matches) {
        setSidebarOpen(false);
      }
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleResize
      );
    };
  }, [setSidebarOpen]);

  // Escape key, scroll lock and keyboard focus

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }

      // Keep keyboard focus inside the sidebar

      if (event.key === "Tab" && sidebarRef.current) {
        const elements =
          sidebarRef.current.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex="0"]'
          );

        if (!elements.length) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (!sidebarRef.current.contains(document.activeElement)) {
          event.preventDefault();

          if (event.shiftKey) {
            last.focus();
          } else {
            first.focus();
          }

          return;
        }

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);

      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [sidebarOpen, setSidebarOpen]);

  // Active navigation link

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
      <AnimatePresence>

        {sidebarOpen && (
          <>

            {/* ================= BACKDROP ================= */}

            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.25,
              }}
              onClick={closeSidebar}
              aria-hidden="true"
              className="fixed inset-0 z-[998]
                bg-slate-950/40 lg:hidden"
            />

            {/* ================= SIDEBAR ================= */}

            <motion.aside
              key="navigation-sidebar"
              ref={sidebarRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-[999]
                flex h-dvh w-[88vw] max-w-[360px]
                flex-col overflow-hidden
                border-r border-slate-200
                bg-white shadow-2xl lg:hidden"
            >

              {/* ================= HEADER ================= */}

              <header
                className="relative shrink-0 overflow-hidden
                  border-b border-slate-100
                  bg-linear-to-br from-indigo-50/80
                  via-white to-blue-50/60
                  px-5 pb-6 pt-7"
              >

                {/* Decorative background */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute
                    -right-16 -top-16 size-40 rounded-full
                    bg-purple-100/60 blur-2xl"
                />

                <div className="relative flex items-center justify-between gap-3">

                  {/* Brand */}

                  <Link
                    href="/"
                    onClick={closeSidebar}
                    className="group flex min-w-0 items-center gap-3"
                  >
                    <div
                      className="flex size-12 shrink-0
                        items-center justify-center rounded-2xl
                        bg-linear-to-br from-blue-600
                        via-indigo-600 to-purple-600
                        text-xl font-bold text-white
                        shadow-lg shadow-indigo-500/20"
                    >
                      A
                    </div>

                    <div className="min-w-0">
                      <span
                        className="block text-2xl font-bold
                          leading-tight tracking-tight
                          text-slate-900"
                      >
                        ArdSuhail
                      </span>

                      <span
                        className="mt-1 block text-xs
                          font-medium text-slate-500"
                      >
                        Full Stack Developer
                      </span>
                    </div>
                  </Link>

                  {/* Close button */}

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeSidebar}
                    aria-label="Close navigation menu"
                    className="group flex size-10 shrink-0
                      items-center justify-center rounded-xl
                      border border-slate-200 bg-white
                      text-slate-500 transition-colors
                      duration-200 hover:border-indigo-200
                      hover:bg-indigo-50 hover:text-indigo-600
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-indigo-600"
                  >
                    <X
                      size={21}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="motion-safe:transition-transform
                        motion-safe:group-hover:rotate-90
                        duration-300"
                    />
                  </button>
                </div>

                {/* Availability */}

                <div
                  className="relative mt-6 flex w-fit items-center
                    gap-2 rounded-full border border-emerald-100
                    bg-white px-3 py-1.5 text-xs
                    font-medium text-emerald-700"
                >
                  <span className="size-2 rounded-full bg-emerald-500" />

                  Available for new projects
                </div>
              </header>

              {/* ================= NAVIGATION ================= */}

              <nav
                aria-label="Mobile navigation"
                className="min-h-0 flex-1 overflow-y-auto
                  overscroll-contain px-4 py-6"
              >
                <p
                  className="mb-4 px-3 text-[11px]
                    font-bold uppercase tracking-[0.18em]
                    text-slate-400"
                >
                  Navigation
                </p>

                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-2"
                >
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <motion.li
                        key={item.href}
                        variants={itemVariants}
                      >
                        <Link
                          href={item.href}
                          onClick={closeSidebar}
                          aria-current={
                            active ? "page" : undefined
                          }
                          className={`group relative flex
                            items-center gap-3 overflow-hidden
                            rounded-2xl border p-3
                            transition-colors duration-200
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-indigo-600
                            ${
                              active
                                ? `border-transparent
                                  bg-linear-to-r
                                  from-indigo-600 to-blue-600
                                  text-white shadow-lg
                                  shadow-indigo-500/15`
                                : `border-transparent
                                  text-slate-700
                                  hover:border-indigo-100
                                  hover:bg-indigo-50/70`
                            }`}
                        >

                          {/* Icon */}

                          <div
                            className={`flex size-11 shrink-0
                              items-center justify-center
                              rounded-xl transition-colors
                              duration-200
                              ${
                                active
                                  ? "bg-white/15 text-white"
                                  : `bg-slate-100 text-slate-500
                                    group-hover:bg-indigo-100
                                    group-hover:text-indigo-600`
                              }`}
                          >
                            <Icon
                              size={21}
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                          </div>

                          {/* Label & Description */}

                          <div className="min-w-0 flex-1">
                            <span
                              className={`block text-[15px]
                                font-semibold
                                ${
                                  active
                                    ? "text-white"
                                    : `text-slate-800
                                      group-hover:text-indigo-700`
                                }`}
                            >
                              {item.label}
                            </span>

                            <span
                              className={`mt-0.5 block text-xs
                                ${
                                  active
                                    ? "text-indigo-100"
                                    : "text-slate-500"
                                }`}
                            >
                              {item.description}
                            </span>
                          </div>

                          {/* Active / Hover Indicator */}

                          {active ? (
                            <span
                              aria-hidden="true"
                              className="size-2 shrink-0
                                rounded-full bg-white"
                            />
                          ) : (
                            <ChevronRight
                              size={17}
                              aria-hidden="true"
                              className="shrink-0 text-slate-300
                                transition-colors
                                group-hover:text-indigo-500
                                motion-safe:transition-transform
                                motion-safe:group-hover:translate-x-1"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                {/* ================= PROJECT CTA ================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.2,
                    ease,
                  }}
                  className="relative isolate mt-7
                    overflow-hidden rounded-2xl
                    bg-linear-to-br from-indigo-50
                    to-blue-50 p-5
                    border border-indigo-100"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute
                      -right-8 -top-8 -z-10 size-28
                      rounded-full bg-purple-200/40 blur-xl"
                  />

                  <div
                    className="flex size-10 items-center
                      justify-center rounded-xl bg-white
                      text-indigo-600 shadow-sm"
                  >
                    <BriefcaseBusiness size={20} />
                  </div>

                  <h2 className="mt-4 text-lg font-bold text-slate-900">
                    Have a project in mind?
                  </h2>

                  <p
                    className="mt-2 text-sm leading-relaxed
                      text-slate-500"
                  >
                    Let&apos;s turn your ideas into a digital reality.
                  </p>

                  <Link
                    href="/contact"
                    onClick={closeSidebar}
                    className="group mt-5 inline-flex w-full
                      items-center justify-center gap-2
                      rounded-xl bg-linear-to-r
                      from-indigo-600 to-blue-600
                      px-4 py-3 text-sm font-semibold
                      text-white shadow-md
                      shadow-indigo-500/15
                      motion-safe:transition-transform
                      motion-safe:hover:-translate-y-0.5
                      duration-200"
                  >
                    Let&apos;s Talk

                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className="motion-safe:transition-transform
                        motion-safe:group-hover:translate-x-0.5
                        motion-safe:group-hover:-translate-y-0.5
                        duration-200"
                    />
                  </Link>
                </motion.div>
              </nav>

              {/* ================= FOOTER ================= */}

              <footer
                className="shrink-0 border-t border-slate-100
                  bg-slate-50/60 px-5 pt-5
                  pb-[max(1.25rem,env(safe-area-inset-bottom))]"
              >
                <div className="flex items-center justify-center gap-2">

                  <Globe
                    size={15}
                    className="text-indigo-500"
                    aria-hidden="true"
                  />

                  <Link
                    href="/"
                    onClick={closeSidebar}
                    className="text-sm font-semibold
                      text-slate-600 transition-colors
                      hover:text-indigo-600"
                  >
                    ardsuhail.com
                  </Link>

                </div>

                <p
                  className="mt-2 text-center text-[11px]
                    font-medium text-slate-400"
                >
                  Designed & Developed by ArdSuhail
                </p>
              </footer>
            </motion.aside>
          </>
        )}

      </AnimatePresence>
    </MotionConfig>
  );
};

export default NavSidebar;
