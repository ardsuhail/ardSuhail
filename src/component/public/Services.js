
"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Wrench,
  MapPin,
  MessageCircle,
  CreditCard,
  BookOpen,
  Search,
  Check,
  Sparkles,
  Globe,
  Smartphone,
  ShieldCheck,
  ChevronDown,
  Store,
} from "lucide-react";

// Animation configurations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const viewport = {
  once: true,
  amount: 0.1,
};

// Services data
const services = [
  {
    id: "website-development",
    title: "Website Development",
    category: "CORE SERVICE",
    icon: Code2,
    description:
      "Bring your business online with a modern, responsive website designed around your goals and customers.",
    features: [
      "Business & portfolio websites",
      "Custom e-commerce stores",
      "Full-stack web applications",
      "Mobile-friendly & SEO-ready design",
      "Custom dashboards & API integrations",
    ],
    color: "text-indigo-600",
    background: "bg-indigo-50",
    border: "hover:border-indigo-300",
    gradient: "from-indigo-50 to-blue-50",
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    category: "CORE SERVICE",
    icon: Wrench,
    description:
      "Keep your existing website running smoothly with regular updates, technical fixes and ongoing support.",
    features: [
      "Bug fixes & troubleshooting",
      "Content & design updates",
      "Performance optimization",
      "Security checks & backups",
      "Ongoing technical support",
    ],
    color: "text-blue-600",
    background: "bg-blue-50",
    border: "hover:border-blue-300",
    gradient: "from-blue-50 to-cyan-50",
  },
  {
    id: "google-business",
    title: "Google Business / Maps Setup",
    icon: MapPin,
    description:
      "Help customers discover your shop or business on Google Search and Google Maps.",
    features: [
      "Google Business Profile setup",
      "Business information & location",
      "Photos & business hours",
      "Verification assistance",
      "Review link & QR code",
    ],
    color: "text-emerald-600",
    background: "bg-emerald-50",
    border: "hover:border-emerald-300",
  },
  {
    id: "whatsapp-business",
    title: "WhatsApp Business Setup",
    icon: MessageCircle,
    description:
      "Turn WhatsApp into an organized and professional communication channel for your business.",
    features: [
      "Professional business profile",
      "Product catalogue setup",
      "Greeting & away messages",
      "Quick replies & labels",
      "WhatsApp links & QR codes",
    ],
    color: "text-green-600",
    background: "bg-green-50",
    border: "hover:border-green-300",
  },
  {
    id: "digital-visiting-card",
    title: "Digital Visiting Card",
    icon: CreditCard,
    description:
      "Share your business information, contact details and social links through one smart digital card.",
    features: [
      "Custom branded design",
      "Call & WhatsApp buttons",
      "Business location & social links",
      "Shareable online link",
      "QR code & save contact option",
    ],
    color: "text-violet-600",
    background: "bg-violet-50",
    border: "hover:border-violet-300",
  },
  {
    id: "product-catalogue",
    title: "Product / Menu Catalogue",
    icon: BookOpen,
    description:
      "Showcase your products, services or restaurant menu with a convenient digital catalogue.",
    features: [
      "Product & menu listings",
      "Photos, descriptions & prices",
      "Category-wise organization",
      "Mobile-friendly design",
      "Shareable link & QR code",
    ],
    color: "text-orange-600",
    background: "bg-orange-50",
    border: "hover:border-orange-300",
  },
  {
    id: "basic-seo",
    title: "Basic SEO & Online Presence",
    icon: Search,
    description:
      "Build a stronger online foundation with essential website SEO and business profile improvements.",
    features: [
      "Basic on-page & technical SEO",
      "Google Search Console setup",
      "Sitemap & indexing checks",
      "Business profile optimization",
      "Online presence recommendations",
    ],
    color: "text-cyan-600",
    background: "bg-cyan-50",
    border: "hover:border-cyan-300",
  },
];

// Working process
const process = [
  {
    number: "01",
    title: "Let's Discuss",
    description:
      "We discuss your business, requirements and the problems you want to solve.",
  },
  {
    number: "02",
    title: "Plan & Finalize",
    description:
      "We agree on the right solution, project scope, pricing and timeline.",
  },
  {
    number: "03",
    title: "Build & Setup",
    description:
      "I work on your project, configure the required tools and test everything.",
  },
  {
    number: "04",
    title: "Deliver & Support",
    description:
      "Your project is delivered with the necessary access and usage guidance.",
  },
];

// Frequently asked questions
const faqs = [
  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on your requirements, project size and functionality. Contact me to discuss your needs and receive a customized quotation.",
  },
  {
    question: "Do I need a website to use your digital services?",
    answer:
      "No. Services such as Google Business Profile setup, WhatsApp Business setup and digital visiting cards can be delivered without a full business website.",
  },
  {
    question: "Is creating a Google Business Profile free?",
    answer:
      "Yes. Google Business Profile is free. My service charge covers professional setup, configuration, verification assistance and optimization.",
  },
  {
    question: "Can you maintain my existing website?",
    answer:
      "Yes. I can review your existing website and help with updates, bug fixes and improvements, depending on its technology and available access.",
  },
  {
    question: "Are domain and hosting included?",
    answer:
      "Domain, hosting and third-party subscriptions are quoted separately unless specifically included in your project agreement.",
  },
  {
    question: "Can you guarantee first-page Google rankings?",
    answer:
      "No. Search rankings depend on multiple factors. I provide foundational SEO improvements and recommendations without making unrealistic ranking guarantees.",
  },
];

// Primary Button
const PrimaryButton = ({ href, children }) => (
  <Link
    href={href}
    className="group inline-flex items-center justify-center gap-3
      rounded-xl bg-linear-to-r from-indigo-600 to-blue-600
      px-6 py-3.5 font-semibold text-white
      shadow-lg shadow-indigo-500/20
      transition-all duration-300
      motion-safe:hover:-translate-y-0.5
      hover:shadow-indigo-500/30
      focus-visible:outline-2 focus-visible:outline-offset-4
      focus-visible:outline-indigo-600"
  >
    {children}

    <ArrowRight
      size={18}
      className="transition-transform duration-300
        motion-safe:group-hover:translate-x-1"
      aria-hidden="true"
    />
  </Link>
);

// Animated Section Heading
const SectionHeading = ({ label, title, description }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
    className="mx-auto mb-12 max-w-3xl text-center"
  >
    <span
      className="inline-flex items-center gap-2 rounded-full
        border border-indigo-100 bg-indigo-50 px-4 py-2
        text-xs font-semibold uppercase tracking-widest
        text-indigo-600"
    >
      {label}
    </span>

    <h2
      className="mt-5 text-3xl font-bold tracking-tight
        text-slate-900 sm:text-4xl lg:text-5xl"
    >
      {title}
    </h2>

    <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
      {description}
    </p>
  </motion.div>
);

// Animated Service Card
const ServiceCard = ({ service, featured = false, index = 0 }) => {
  const Icon = service.icon;

  return (
    <motion.article
      id={service.id}
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={viewport}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative flex h-full scroll-mt-28 flex-col
        overflow-hidden rounded-3xl border border-slate-200
        bg-white p-6 shadow-sm
        transition-[box-shadow,border-color,translate] duration-300
        motion-safe:hover:-translate-y-1 hover:shadow-xl
        sm:p-8 ${service.border}`}
    >
      {featured && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0
            h-48 w-48 rounded-bl-full bg-linear-to-br
            opacity-80 ${service.gradient}`}
        />
      )}

      <div className="relative flex items-center justify-between gap-4">
        <div
          className={`flex size-14 items-center justify-center
            rounded-2xl transition-transform duration-300
            motion-safe:group-hover:scale-110
            ${service.background} ${service.color}`}
        >
          <Icon size={27} strokeWidth={1.8} aria-hidden="true" />
        </div>

        {featured && (
          <span
            className="rounded-full border border-indigo-100
              bg-white/80 px-3 py-1.5 text-[10px] font-bold
              tracking-wider text-indigo-600"
          >
            {service.category}
          </span>
        )}
      </div>

      <h3
        className={`relative mt-6 font-bold tracking-tight
          text-slate-900 ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
      >
        {service.title}
      </h3>

      <p className="mt-3 leading-relaxed text-slate-500">
        {service.description}
      </p>

      <div className="my-6 h-px bg-slate-100" />

      <ul className="mb-8 space-y-3">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-slate-600"
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center
                justify-center rounded-full
                ${service.background} ${service.color}`}
            >
              <Check size={12} strokeWidth={2.5} aria-hidden="true" />
            </span>

            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        aria-label={`Enquire about ${service.title}`}
        className={`mt-auto inline-flex w-fit items-center gap-2
          text-sm font-semibold ${service.color}`}
      >
        Enquire Now

        <ArrowUpRight
          size={17}
          className="transition-transform duration-300
            motion-safe:group-hover:-translate-y-0.5
            motion-safe:group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.article>
  );
};

// Hero Illustration
const HeroVisual = () => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0.35, x: 35 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 0.85,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="relative mx-auto w-full max-w-lg py-10 sm:px-8"
  >
    {/* Background Glow */}
    <div
      className="pointer-events-none absolute inset-10 rounded-full
        bg-linear-to-br from-indigo-200 via-purple-100
        to-cyan-200 opacity-60 blur-3xl"
    />

    {/* Browser Mockup */}
    <div
      className="relative rounded-3xl border border-white
        bg-white/90 p-3 shadow-2xl shadow-indigo-200/60
        transition-transform duration-500
        lg:[transform:perspective(1200px)_rotateY(-9deg)_rotateX(5deg)]
        motion-safe:lg:hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200">

        {/* Browser Header */}
        <div
          className="flex items-center gap-1.5
            border-b border-slate-100 bg-slate-50 px-4 py-3"
        >
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-green-400" />

          <div
            className="ml-4 flex flex-1 items-center justify-center
              gap-2 rounded-md bg-white px-2 py-1
              text-[10px] text-slate-400"
          >
            <Globe size={11} />
            your-business.com
          </div>
        </div>

        {/* Browser Content */}
        <div
          className="bg-linear-to-br from-white via-indigo-50/60
            to-blue-50 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex size-9 items-center justify-center
                rounded-xl bg-indigo-600 text-white"
            >
              <Store size={19} />
            </div>

            <span className="text-sm font-bold text-slate-800">
              Your Business
            </span>
          </div>

          <div className="my-8">
            <p className="text-xs font-semibold text-indigo-600">
              YOUR DIGITAL PRESENCE
            </p>

            <p
              className="mt-2 text-2xl font-bold tracking-tight
                text-slate-900 sm:text-3xl"
            >
              Built for a digital world.
            </p>

            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded-full bg-indigo-100" />
              <div className="h-2 w-3/4 rounded-full bg-indigo-100" />
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-3"
          >
            {[
              { icon: Globe, label: "Website" },
              { icon: MapPin, label: "Discovery" },
              { icon: MessageCircle, label: "Connect" },
            ].map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="rounded-xl border border-indigo-100
                  bg-white p-3 text-center shadow-sm"
              >
                <Icon className="mx-auto text-indigo-600" size={22} />

                <p className="mt-2 text-[11px] font-medium text-slate-600">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

    {/* Floating Visual Card 1 */}
    <motion.div
      initial={{ opacity: 0, x: -25, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute -left-2 top-3 flex items-center gap-3
        rounded-2xl border border-white bg-white/95
        px-4 py-3 shadow-xl sm:-left-4"
    >
      <div
        className="flex size-10 items-center justify-center
          rounded-xl bg-emerald-50 text-emerald-600"
      >
        <ShieldCheck size={23} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          Built with care
        </p>

        <p className="text-sm font-bold text-slate-800">
          Fast & Reliable
        </p>
      </div>
    </motion.div>

    {/* Floating Visual Card 2 */}
    <motion.div
      initial={{ opacity: 0, x: 25, y: 15 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute -bottom-1 right-0 flex items-center gap-3
        rounded-2xl border border-white bg-white/95
        px-4 py-3 shadow-xl sm:-right-3"
    >
      <div
        className="flex size-10 items-center justify-center
          rounded-xl bg-purple-50 text-purple-600"
      >
        <Smartphone size={23} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          Responsive design
        </p>

        <p className="text-sm font-bold text-slate-800">
          Mobile Friendly
        </p>
      </div>
    </motion.div>
  </motion.div>
);

// Main Services Page
const Services = () => {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-hidden bg-white text-slate-900">

        {/* ================= HERO SECTION ================= */}
        <section
          className="relative isolate overflow-hidden border-b
            border-slate-100 bg-linear-to-b from-indigo-50/70
            via-white to-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10
              opacity-30
              bg-[radial-gradient(#a5b4fc_1px,transparent_1px)]
              bg-size-[28px_28px]"
          />

          <div
            className="mx-auto grid max-w-7xl items-center gap-10
              px-5 py-20 sm:px-8 lg:grid-cols-2
              lg:gap-16 lg:py-28"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full
                  border border-indigo-200 bg-white px-4 py-2
                  text-sm font-medium text-indigo-600 shadow-sm"
              >
                <Sparkles size={15} aria-hidden="true" />
                Digital Services for Businesses
              </motion.span>

              <motion.h1
                initial={{ opacity: 1, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 text-4xl font-extrabold leading-[1.12]
                  tracking-tight sm:text-5xl lg:text-6xl"
              >
                Take Your Business

                <span
                  className="block bg-linear-to-r from-indigo-600
                    via-purple-600 to-blue-600 bg-clip-text
                    text-transparent"
                >
                  Beyond Offline.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed
                  text-slate-500 sm:text-lg"
              >
                From professional websites to practical digital
                solutions, I help local businesses, brands and
                individuals establish a better online presence.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap gap-3"
              >
                <PrimaryButton href="#our-services">
                  Explore Services
                </PrimaryButton>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center
                    rounded-xl border border-slate-200 bg-white
                    px-6 py-3.5 font-semibold text-slate-700
                    transition-colors duration-300
                    hover:border-indigo-300 hover:text-indigo-600"
                >
                  Let&apos;s Discuss
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-9 flex flex-wrap gap-x-5 gap-y-3
                  text-sm text-slate-500"
              >
                {[
                  "Custom Solutions",
                  "Transparent Pricing",
                  "Personal Support",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check
                      size={16}
                      className="text-emerald-600"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <HeroVisual />
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section
          id="our-services"
          className="mx-auto max-w-7xl scroll-mt-24
            px-5 py-20 sm:px-8 lg:py-24"
        >
          <SectionHeading
            label="What I Offer"
            title="Solutions That Fit Your Business"
            description="Whether you need a complete website or a simple digital setup, choose a service based on your actual business requirements."
          />

          {/* Core Services Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-6 flex items-center gap-4"
          >
            <h3
              className="shrink-0 text-sm font-bold uppercase
                tracking-widest text-indigo-600"
            >
              Web Development
            </h3>

            <div className="h-px flex-1 bg-slate-200" />
          </motion.div>

          {/* Core Services Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {services.slice(0, 2).map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                featured
              />
            ))}
          </div>

          {/* Digital Services Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-6 mt-14 flex items-center gap-4"
          >
            <h3
              className="shrink-0 text-sm font-bold uppercase
                tracking-widest text-indigo-600"
            >
              Business Digital Services
            </h3>

            <div className="h-px flex-1 bg-slate-200" />
          </motion.div>

          {/* Digital Services Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {services.slice(2).map((service, index) => (
              <div
                key={service.id}
                className={
                  index < 3
                    ? "lg:col-span-2"
                    : "lg:col-span-3"
                }
              >
                <ServiceCard
                  service={service}
                  index={index}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ================= CUSTOM REQUIREMENTS ================= */}
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col items-start justify-between gap-6
              rounded-3xl border border-indigo-100
              bg-linear-to-br from-indigo-50 to-blue-50
              p-7 sm:p-10 md:flex-row md:items-center"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Need Something Different?
              </h2>

              <p className="mt-3 max-w-2xl leading-relaxed text-slate-500">
                Have a custom project or need multiple services
                together? Let&apos;s discuss your requirements and find
                a solution that fits your business.
              </p>
            </div>

            <div className="shrink-0">
              <PrimaryButton href="/contact">
                Get a Custom Quote
              </PrimaryButton>
            </div>
          </motion.div>
        </section>

        {/* ================= WORKING PROCESS ================= */}
        <section className="border-y border-slate-100 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <SectionHeading
              label="How It Works"
              title="Simple Process. Clear Communication."
              description="From the first conversation to final delivery, every step is designed to keep things clear and straightforward."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, index) => (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.65,
                    delay: (index % 4) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group rounded-2xl border border-slate-200
                    bg-white p-6
                    transition-[box-shadow,border-color,translate]
                    duration-300 motion-safe:hover:-translate-y-1
                    hover:border-indigo-200 hover:shadow-lg"
                >
                  <span
                    className="block bg-linear-to-br from-indigo-600
                      to-purple-300 bg-clip-text text-5xl
                      font-extrabold text-transparent"
                  >
                    {step.number}
                  </span>

                  <h3 className="mt-6 text-lg font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PORTFOLIO SECTION ================= */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto flex max-w-7xl flex-col items-center
            justify-between gap-6 px-5 py-16
            sm:px-8 md:flex-row"
        >
          <div>
            <span className="text-sm font-semibold text-indigo-600">
              Explore My Work
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              See What I&apos;ve Built.
            </h2>

            <p className="mt-3 text-slate-500">
              Explore my projects, technologies and development experience.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2
              rounded-xl border border-slate-200 px-6 py-3.5
              font-semibold transition-colors duration-300
              hover:border-indigo-300 hover:text-indigo-600"
          >
            View My Projects

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300
                motion-safe:group-hover:-translate-y-0.5
                motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.section>

        {/* ================= FAQ SECTION ================= */}
        <section className="border-t border-slate-100 bg-slate-50/50">
          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
            <SectionHeading
              label="FAQs"
              title="Frequently Asked Questions"
              description="Some common questions about my services, pricing and project delivery."
            />

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.5,
                    delay: (index % 3) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <details
                    className="group rounded-2xl border border-slate-200
                      bg-white transition-colors duration-300
                      open:border-indigo-200 open:shadow-sm"
                  >
                    <summary
                      className="flex cursor-pointer list-none
                        items-center justify-between gap-4 p-5
                        font-semibold text-slate-800 sm:p-6
                        [&::-webkit-details-marker]:hidden"
                    >
                      {faq.question}

                      <ChevronDown
                        size={20}
                        className="shrink-0 text-indigo-600
                          transition-transform duration-300
                          group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>

                    <p
                      className="px-5 pb-6 text-sm leading-relaxed
                        text-slate-500 sm:px-6 sm:text-base"
                    >
                      {faq.answer}
                    </p>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative isolate overflow-hidden rounded-3xl
              bg-linear-to-br from-slate-950 via-indigo-950
              to-blue-950 px-6 py-16 text-center sm:py-20"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24
                -top-24 -z-10 size-80 rounded-full
                bg-purple-500/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24
                -left-24 -z-10 size-80 rounded-full
                bg-blue-500/20 blur-3xl"
            />

            <span
              className="inline-flex items-center gap-2 rounded-full
                border border-white/15 bg-white/10 px-4 py-2
                text-sm text-indigo-200"
            >
              <Sparkles size={15} aria-hidden="true" />
              Let&apos;s Work Together
            </span>

            <h2
              className="mx-auto mt-6 max-w-3xl text-3xl
                font-bold tracking-tight sm:text-5xl text-white"
            >
              Ready to Take Your Business Online?
            </h2>

            <p
              className="mx-auto mt-5 max-w-xl text-base
                leading-relaxed text-slate-300 sm:text-lg"
            >
              Tell me about your business and what you need.
              Let&apos;s build a digital solution that makes sense for you.
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3
                rounded-xl bg-white px-7 py-4 font-bold
                text-indigo-700
                transition-[box-shadow,translate] duration-300
                motion-safe:hover:-translate-y-1 hover:shadow-xl"
            >
              Start a Conversation

              <ArrowRight
                size={19}
                className="transition-transform duration-300
                  motion-safe:group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
};

export default Services;
