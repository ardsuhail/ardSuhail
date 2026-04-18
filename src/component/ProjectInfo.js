"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt, FaNodeJs,
  FaGitAlt, FaDocker, FaAws, FaVuejs, FaAngular, FaPhp, FaJava,
  FaWordpress, FaFigma, FaLinux
} from 'react-icons/fa'
import {
  SiTailwindcss, SiNextdotjs, SiJavascript, SiMongodb, SiExpress,
  SiTypescript, SiPostgresql, SiMysql, SiRedis, SiFirebase,
  SiSupabase, SiPrisma, SiGraphql, SiVercel, SiNetlify, SiSanity,
  SiStripe, SiCloudflare, SiSvelte, SiNuxtdotjs, SiDjango, SiFlask,
  SiSpring, SiLaravel, SiRust, SiGo, SiKubernetes, SiElasticsearch, SiShadcnui
} from 'react-icons/si'
import {
  ExternalLink, Github, ArrowLeft, Calendar, Clock, Users,
  Star, CheckCircle2, AlertTriangle, Lightbulb, Tag, Globe,
  Zap, Code, Eye, ChevronLeft, ChevronRight, Play
} from 'lucide-react'

// ===== ICON MAP (same as Projects.jsx) =====
const iconMap = {
  FaReact: { component: FaReact, color: "#61DAFB" },
  FaPython: { component: FaPython, color: "#3776AB" },
  FaShopify: { component: FaShopify, color: "#96BF48" },
  FaHtml5: { component: FaHtml5, color: "#E34F26" },
  FaCss3Alt: { component: FaCss3Alt, color: "#1572B6" },
  FaNodeJs: { component: FaNodeJs, color: "#339933" },
  FaGitAlt: { component: FaGitAlt, color: "#F05032" },
  FaDocker: { component: FaDocker, color: "#2496ED" },
  FaAws: { component: FaAws, color: "#FF9900" },
  FaVuejs: { component: FaVuejs, color: "#4FC08D" },
  FaAngular: { component: FaAngular, color: "#DD0031" },
  FaPhp: { component: FaPhp, color: "#777BB4" },
  FaJava: { component: FaJava, color: "#ED8B00" },
  FaWordpress: { component: FaWordpress, color: "#21759B" },
  FaFigma: { component: FaFigma, color: "#F24E1E" },
  FaLinux: { component: FaLinux, color: "#FCC624" },
  SiTailwindcss: { component: SiTailwindcss, color: "#06B6D4" },
  SiNextdotjs: { component: SiNextdotjs, color: "#111111" },
  SiJavascript: { component: SiJavascript, color: "#F7DF1E" },
  SiMongodb: { component: SiMongodb, color: "#47A248" },
  SiExpress: { component: SiExpress, color: "#111111" },
  SiTypescript: { component: SiTypescript, color: "#3178C6" },
  SiPostgresql: { component: SiPostgresql, color: "#336791" },
  SiMysql: { component: SiMysql, color: "#4479A1" },
  SiRedis: { component: SiRedis, color: "#DC382D" },
  SiFirebase: { component: SiFirebase, color: "#FFCA28" },
  SiSupabase: { component: SiSupabase, color: "#3ECF8E" },
  SiPrisma: { component: SiPrisma, color: "#2D3748" },
  SiGraphql: { component: SiGraphql, color: "#E10098" },
  SiVercel: { component: SiVercel, color: "#111111" },
  SiNetlify: { component: SiNetlify, color: "#00C7B7" },
  SiSanity: { component: SiSanity, color: "#F03E2F" },
  SiStripe: { component: SiStripe, color: "#008CDD" },
  SiCloudflare: { component: SiCloudflare, color: "#F38020" },
  SiSvelte: { component: SiSvelte, color: "#FF3E00" },
  SiNuxtdotjs: { component: SiNuxtdotjs, color: "#00C58E" },
  SiDjango: { component: SiDjango, color: "#092E20" },
  SiFlask: { component: SiFlask, color: "#111111" },
  SiSpring: { component: SiSpring, color: "#6DB33F" },
  SiLaravel: { component: SiLaravel, color: "#FF2D20" },
  SiRust: { component: SiRust, color: "#111111" },
  SiGo: { component: SiGo, color: "#00ADD8" },
  SiKubernetes: { component: SiKubernetes, color: "#326CE5" },
  SiElasticsearch: { component: SiElasticsearch, color: "#005571" },
  SiShadcnui: { component: SiShadcnui, color: "#111111" },
}

const STATUS_CONFIG = {
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-700 border-blue-200" },
  planned: { label: "Planned", color: "bg-amber-100 text-amber-700 border-amber-200" },
  "on-hold": { label: "On Hold", color: "bg-gray-100 text-gray-600 border-gray-200" },
}

const DIFFICULTY_CONFIG = {
  beginner: { label: "Beginner", color: "bg-green-100 text-green-700 border-green-200" },
  intermediate: { label: "Intermediate", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  advanced: { label: "Advanced", color: "bg-red-100 text-red-700 border-red-200" },
}

// ===== GALLERY VIEWER =====
const Gallery = ({ images, mainImage, title }) => {
  const allImages = [mainImage, ...images.filter(img => img.url !== mainImage?.url)]
  const [current, setCurrent] = useState(0)

  if (allImages.filter(Boolean).length === 0) return null

  return (
    <div className="rounded-2xl overflow-hidden bg-gray-900">
      {/* Main Image */}
      <div className="relative aspect-video w-full">
        <img
          src={allImages[current]?.url || allImages[current]}
          alt={`${title} - ${current + 1}`}
          className="w-full h-full object-cover"
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setCurrent(p => (p - 1 + allImages.length) % allImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrent(p => (p + 1) % allImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {current + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-blue-500' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
            >
              <img src={img?.url || img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ===== INFO CARD =====
const InfoCard = ({ icon: Icon, label, children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm ${className}`}>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{label}</h3>
    </div>
    {children}
  </div>
)

// ===== MAIN COMPONENT =====
const ProjectInfo = ({ projectInfo }) => {
  const [project, setProject] = useState(projectInfo)
  const [viewRecorded, setViewRecorded] = useState(false)

  useEffect(() => {
    // Check if already viewed in this session
    const hasViewed = sessionStorage.getItem(`viewed_${project._id}`)
    if (!hasViewed) {
      // Call API
      sessionStorage.setItem(`viewed_${project._id}`, 'true')
    }

    if (!viewRecorded && !hasViewed && project?._id) {
      fetch(`/api/project/${project._id}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProject(prev => ({ ...prev, views: data.views }))
            setViewRecorded(true)
            // Store in sessionStorage that this project has been viewed
            sessionStorage.setItem(`viewed_${project._id}`, 'true')
          }
        })
        .catch(err => console.error("Error recording view:", err))
    }
  }, [project?._id, viewRecorded])
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Project not found</h2>
          <p className="text-gray-500 mb-6">This project doesn&apos;t exist or was removed.</p>
          <Link href="/projects" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.completed
  const difficulty = DIFFICULTY_CONFIG[project.difficulty] || DIFFICULTY_CONFIG.intermediate

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="min-h-screen mt-8 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ===== LEFT / MAIN COLUMN ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Gallery */}
            <Gallery
              images={project.gallery_images || []}
              mainImage={project.project_image}
              title={project.title}
            />

            {/* Title + Badges */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${status.color}`}>
                  {status.label}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${difficulty.color}`}>
                  {difficulty.label}
                </span>
                {project.isFeatured && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1">
                    <Star className="w-3 h-3" /> Featured
                  </span>
                )}
                {project.category && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100 capitalize">
                    {project.category}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {project.title}
              </h1>

              {project.shortDescription && (
                <p className="text-gray-500 text-base leading-relaxed mb-4 pb-4 border-b border-gray-100">
                  {project.shortDescription}
                </p>
              )}

              {/* Description (rich text) */}
              <div
                className="store-policy ProseMirror text-gray-700 whitespace-pre-line prose prose-sm max-w-none   [&>strong]:text-gray-800"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>

            {/* Features */}
            {project.features?.filter(f => f).length > 0 && (
              <InfoCard icon={Zap} label="Key Features">
                <ul className="flex flex-col gap-2">
                  {project.features.filter(f => f).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </InfoCard>
            )}

            {/* Challenges */}
            {(project.challenges?.problem || project.challenges?.solution) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.challenges.problem && (
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide">Challenge</h3>
                    </div>
                    <p className="text-sm text-red-700/80 leading-relaxed">{project.challenges.problem}</p>
                  </div>
                )}
                {project.challenges.solution && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-emerald-600" />
                      <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Solution</h3>
                    </div>
                    <p className="text-sm text-emerald-700/80 leading-relaxed">{project.challenges.solution}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack */}
            {project.techStack?.length > 0 && (
              <InfoCard icon={Code} label="Tech Stack">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => {
                    const entry = iconMap[tech.icon]
                    if (!entry) return null
                    const Icon = entry.component
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.06, y: -2 }}
                        className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl hover:border-gray-300 transition-all"
                      >
                        <Icon className="w-4 h-4" style={{ color: entry.color }} />
                        <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </InfoCard>
            )}

            {/* Team Members */}
            {project.teamMembers?.length > 0 && (
              <InfoCard icon={Users} label="Team">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.teamMembers.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {m.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{m.name}</p>
                        <p className="text-xs text-gray-500 truncate">{m.role}</p>
                      </div>
                      {m.github && (
                        <Link href={m.github} target="_blank" className="ml-auto text-gray-400 hover:text-gray-700 flex-shrink-0">
                          <Github className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </InfoCard>
            )}
          </motion.div>

          {/* ===== RIGHT SIDEBAR ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* CTA Buttons */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3">
              <Link
                href={project.proj_Link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
              >
                <Globe className="w-4 h-4" />
                View Live Demo
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {project.github_code_link && (
                <Link
                  href={project.github_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all text-sm"
                >
                  <Github className="w-4 h-4" />
                  View Source Code
                </Link>
              )}

              {project.demoVideoUrl && (
                <Link
                  href={project.demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-3 px-4 rounded-xl hover:bg-red-100 transition-all text-sm border border-red-100"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo Video
                </Link>
              )}
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Project Details</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Clock, label: "Duration", value: project.duration },
                  { icon: Calendar, label: "Started", value: formatDate(project.startDate) },
                  { icon: Calendar, label: "Finished", value: formatDate(project.endDate) },
                  { icon: Users, label: "Team Size", value: project.teamSize > 1 ? `${project.teamSize} members` : 'Solo Project' },
                  { icon: Eye, label: "Views", value: project?.views || 0 },
                ].filter(row => row.value).map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

         
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo