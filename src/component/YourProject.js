"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"
import {
  Loader, FileText, Search, Plus, Edit3, Trash2, ExternalLink,
  Github, Calendar, Hash, Star, Clock, Layers, Filter, X,Eye
} from "lucide-react"
import {
  FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt, FaNodeJs,
  FaGitAlt, FaDocker, FaAws, FaVuejs, FaAngular, FaPhp, FaJava,
  FaWordpress, FaFigma, FaLinux
} from "react-icons/fa"
import {
  SiTailwindcss, SiNextdotjs, SiJavascript, SiMongodb, SiExpress,
  SiTypescript, SiPostgresql, SiMysql, SiRedis, SiFirebase,
  SiSupabase, SiPrisma, SiGraphql, SiVercel, SiNetlify, SiSanity,
  SiStripe, SiCloudflare, SiSvelte, SiDjango, SiFlask,
  SiSpring, SiLaravel, SiRust, SiGo, SiKubernetes, SiElasticsearch, SiShadcnui
} from "react-icons/si"
import { SiNuxt } from "react-icons/si"
// SiNuxtdotjs
// ===== ICON MAP =====
const iconMap = {
  FaReact: { c: FaReact, col: "#61DAFB" }, FaPython: { c: FaPython, col: "#3776AB" },
  FaShopify: { c: FaShopify, col: "#96BF48" }, FaHtml5: { c: FaHtml5, col: "#E34F26" },
  FaCss3Alt: { c: FaCss3Alt, col: "#1572B6" }, FaNodeJs: { c: FaNodeJs, col: "#339933" },
  FaGitAlt: { c: FaGitAlt, col: "#F05032" }, FaDocker: { c: FaDocker, col: "#2496ED" },
  FaAws: { c: FaAws, col: "#FF9900" }, FaVuejs: { c: FaVuejs, col: "#4FC08D" },
  FaAngular: { c: FaAngular, col: "#DD0031" }, FaPhp: { c: FaPhp, col: "#777BB4" },
  FaJava: { c: FaJava, col: "#ED8B00" }, FaWordpress: { c: FaWordpress, col: "#21759B" },
  FaFigma: { c: FaFigma, col: "#F24E1E" }, FaLinux: { c: FaLinux, col: "#FCC624" },
  SiTailwindcss: { c: SiTailwindcss, col: "#06B6D4" }, SiNextdotjs: { c: SiNextdotjs, col: "#aaa" },
  SiJavascript: { c: SiJavascript, col: "#F7DF1E" }, SiMongodb: { c: SiMongodb, col: "#47A248" },
  SiExpress: { c: SiExpress, col: "#aaa" }, SiTypescript: { c: SiTypescript, col: "#3178C6" },
  SiPostgresql: { c: SiPostgresql, col: "#336791" }, SiMysql: { c: SiMysql, col: "#4479A1" },
  SiRedis: { c: SiRedis, col: "#DC382D" }, SiFirebase: { c: SiFirebase, col: "#FFCA28" },
  SiSupabase: { c: SiSupabase, col: "#3ECF8E" }, SiPrisma: { c: SiPrisma, col: "#aaa" },
  SiGraphql: { c: SiGraphql, col: "#E10098" }, SiVercel: { c: SiVercel, col: "#aaa" },
  SiNetlify: { c: SiNetlify, col: "#00C7B7" }, SiSanity: { c: SiSanity, col: "#F03E2F" },
  SiStripe: { c: SiStripe, col: "#008CDD" }, SiCloudflare: { c: SiCloudflare, col: "#F38020" },
  SiSvelte: { c: SiSvelte, col: "#FF3E00" }, SiNuxt: { c: SiNuxt, col: "#00C58E" },
  SiDjango: { c: SiDjango, col: "#092E20" }, SiFlask: { c: SiFlask, col: "#aaa" },
  SiSpring: { c: SiSpring, col: "#6DB33F" }, SiLaravel: { c: SiLaravel, col: "#FF2D20" },
  SiRust: { c: SiRust, col: "#aaa" }, SiGo: { c: SiGo, col: "#00ADD8" },
  SiKubernetes: { c: SiKubernetes, col: "#326CE5" }, SiElasticsearch: { c: SiElasticsearch, col: "#005571" },
  SiShadcnui: { c: SiShadcnui, col: "#aaa" },
}

const STATUS_CONFIG = {
  completed:    { label: "Completed",   cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  "in-progress":{ label: "In Progress", cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  planned:      { label: "Planned",     cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  "on-hold":    { label: "On Hold",     cls: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
}

const CATEGORY_LABELS = {
  all: "All", fullstack: "Full Stack", frontend: "Frontend",
  backend: "Backend", ecommerce: "E-commerce", mobile: "Mobile",
  "ai-ml": "AI/ML", other: "Other"
}

const getImageSrc = (url) => {
  if (!url || typeof url !== "string") return "/suhail.jpg"
  const cleaned = url.trim()
  if (!cleaned || cleaned.toLowerCase() === "null" || cleaned.toLowerCase() === "undefined") return "/suhail.jpg"
  return cleaned
}

// ===== CONFIRM MODAL =====
const ConfirmModal = ({ title, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
      <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
      <p className="text-gray-400 text-sm mb-6">
        &ldquo;<span className="text-white">{title}</span>&rdquo; permanently delete ho jaayega. Yeh action undo nahi hoga.
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-all text-sm font-medium">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all text-sm font-bold">
          Delete
        </button>
      </div>
    </div>
  </div>
)

// ===== PROJECT CARD =====
const ProjectCard = ({ item, onEdit, onDelete }) => {
  const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.completed

  return (
    <div className="group relative border border-gray-800 rounded-2xl bg-gray-900/60 backdrop-blur-sm hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="relative aspect-video bg-gray-800 overflow-hidden flex-shrink-0">
        <Image
          src={getImageSrc(item.project_image?.url)}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/60 backdrop-blur-sm text-gray-300 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
            <Hash className="w-3 h-3" />{item._id.slice(-6)}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {item.isFeatured && (
            <span className="bg-amber-500/90 text-amber-900 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <Star className="w-3 h-3" /> Featured
            </span>
          )}
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg border backdrop-blur-sm ${status.cls}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Category + Difficulty */}
        <div className="flex items-center gap-2 flex-wrap">
          {item.category && (
            <span className="text-xs bg-purple-500/15 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full capitalize">
              {CATEGORY_LABELS[item.category] || item.category}
            </span>
          )}
          {item.difficulty && (
            <span className={`text-xs px-2.5 py-1 rounded-full border ${
              item.difficulty === 'advanced' ? 'bg-red-500/15 text-red-400 border-red-500/20' :
              item.difficulty === 'intermediate' ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20' :
              'bg-green-500/15 text-green-400 border-green-500/20'
            } capitalize`}>
              {item.difficulty}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
          {item.title}
        </h3>

        {/* Short Description */}
        {item.shortDescription && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{item.shortDescription}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {item.duration && (
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.duration}</span>
          )}
          {item.teamSize > 1 && (
            <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" />{item.teamSize} members</span>
          )}
          {item.views > 0 && (
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{item.views} views</span>
          )}
        </div>

        {/* Tech Stack */}
        {item.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.techStack.slice(0, 7).map((tech, i) => {
              const entry = iconMap[tech.icon]
              if (!entry) return null
              const Icon = entry.c
              return (
                <div key={i} title={tech.name} className="bg-gray-800 border border-gray-700 p-1.5 rounded-lg">
                  <Icon className="w-3.5 h-3.5" style={{ color: entry.col }} />
                </div>
              )
            })}
            {item.techStack.length > 7 && (
              <div className="bg-gray-800 border border-gray-700 px-2 py-1.5 rounded-lg text-xs text-gray-500">
                +{item.techStack.length - 7}
              </div>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 pt-1">
          {item.proj_Link && (
            <Link href={item.proj_Link} target="_blank" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </Link>
          )}
          {item.github_code_link && (
            <Link href={item.github_code_link} target="_blank" className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300 transition-colors">
              <Github className="w-3.5 h-3.5" /> Source
            </Link>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-3 border-t border-gray-800/60 flex gap-2">
          <button
            onClick={() => onEdit(item._id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 hover:text-blue-300 py-2.5 rounded-xl font-medium border border-blue-500/25 hover:border-blue-400/40 transition-all text-sm"
          >
            <Edit3 className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/15 hover:bg-red-600/25 text-red-400 hover:text-red-300 py-2.5 rounded-xl font-medium border border-red-500/25 hover:border-red-400/40 transition-all text-sm"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== MAIN COMPONENT =====
const YourProjectContent = () => {
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null) // { _id, title }
  const [toast, setToast] = useState(null)
  const router = useRouter()

  const showToast = (msg, type = "success") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const loginToken = localStorage.getItem("notlogin")
    if (!loginToken) router.push("/")
  }, [router])

  useEffect(() => {
    fetch("/api/project")
      .then(r => r.json())
      .then(data => {
        // New API returns data.data
        setProjects(data.data || data.projects || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleEdit = (id) => router.push(`/admin/add-project?id=${id}`)

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/project/${deleteTarget._id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        setProjects(prev => prev.filter(p => p._id !== deleteTarget._id))
        showToast("Project deleted ✅")
      } else {
        showToast(data.message || "Delete failed", "error")
      }
    } catch (err) {
      showToast("Network error", "error")
    } finally {
      setDeleteTarget(null)
    }
  }

  // Get unique categories from actual data
  const usedCategories = ["all", ...new Set(projects.map(p => p.category).filter(Boolean))]

  const filtered = projects.filter(p => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(search.toLowerCase()) ||
      p._id?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || p.category === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen  mt-16 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4 sm:p-6 lg:p-8">

      {/* Confirm Modal */}
      {deleteTarget && (
        <ConfirmModal
          title={deleteTarget.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium ${
          toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
        } text-white`}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-5 sm:p-6 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800/50">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Project Portfolio
            </h1>
            <p className="text-gray-500 text-sm mt-1">{projects.length} projects total</p>
          </div>
          <Link href="/admin/add-project">
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </Link>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title, description, ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-700 bg-gray-900/60 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 text-sm transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {usedCategories.map((cat,i) => (
              <button
                key={i}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  filter === cat
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200"
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-900/40 rounded-2xl border border-gray-800/50">
            <Loader className="animate-spin w-8 h-8 text-purple-500 mb-3" />
            <p className="text-gray-400 text-sm">Loading projects...</p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filtered.map(item => (
                <ProjectCard
                  key={item._id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
            <p className="text-center text-gray-600 text-xs mt-8">
              Showing {filtered.length} of {projects.length} projects
            </p>
          </>
        ) : (
          <div className="text-center py-16 bg-gray-900/40 rounded-2xl border border-gray-800/50">
            <FileText className="w-14 h-14 text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {search || filter !== "all" ? "Try different filters" : "Create your first project"}
            </p>
            {!search && filter === "all" && (
              <Link href="/admin/add-project">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:scale-[1.02] transition-all">
                  <Plus className="w-4 h-4" /> Create Project
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const YourProject = () => (
  <Suspense fallback={
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <Loader className="animate-spin text-purple-500 w-10 h-10" />
    </div>
  }>
    <YourProjectContent />
  </Suspense>
)

export default YourProject