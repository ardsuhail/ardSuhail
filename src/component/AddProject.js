
"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  LoaderCircle, Plus, Trash2, Save, Upload, Globe, Github,
  Calendar, Users, Star, Tag, ChevronDown, X, Check, Info,
  Layers, Zap, AlertTriangle, Image as ImageIcon, Video, Search
} from 'lucide-react'
import {
  FaReact, FaPython, FaShopify, FaHtml5, FaCss3Alt,
  FaNodeJs, FaGitAlt, FaDocker, FaAws, FaVuejs, FaAngular,
  FaPhp, FaJava, FaWordpress, FaFigma, FaLinux, FaDatabase
} from 'react-icons/fa'
import {
  SiTailwindcss, SiNextdotjs, SiJavascript, SiMongodb,
  SiExpress, SiTypescript, SiPostgresql, SiMysql, SiRedis,
  SiFirebase, SiSupabase, SiPrisma, SiGraphql, SiVercel,
  SiNetlify, SiSanity, SiStripe, SiCloudflare, SiSvelte,
  SiNuxtdotjs, SiDjango, SiFlask, SiSpring, SiLaravel,
  SiRust, SiGo, SiKubernetes, SiElasticsearch, SiShadcnui
} from 'react-icons/si'

import { UploadFile } from '@/lib/UploadFile'

const RichEditor = dynamic(() => import('./RichEditor'), { ssr: false })

// ===== TECH STACK ICONS =====
export const TECH_OPTIONS = [
  // Frontend
  { name: 'React', icon: 'FaReact', component: FaReact, color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: 'SiNextdotjs', component: SiNextdotjs, color: '#000000', category: 'Frontend' },
  { name: 'Vue.js', icon: 'FaVuejs', component: FaVuejs, color: '#4FC08D', category: 'Frontend' },
  { name: 'Angular', icon: 'FaAngular', component: FaAngular, color: '#DD0031', category: 'Frontend' },
  { name: 'Svelte', icon: 'SiSvelte', component: SiSvelte, color: '#FF3E00', category: 'Frontend' },
  { name: 'Nuxt.js', icon: 'SiNuxtdotjs', component: SiNuxtdotjs, color: '#00C58E', category: 'Frontend' },
  { name: 'HTML5', icon: 'FaHtml5', component: FaHtml5, color: '#E34F26', category: 'Frontend' },
  { name: 'CSS3', icon: 'FaCss3Alt', component: FaCss3Alt, color: '#1572B6', category: 'Frontend' },
  { name: 'Tailwind', icon: 'SiTailwindcss', component: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
  { name: 'shadcn/ui', icon: 'SiShadcnui', component: SiShadcnui, color: '#000000', category: 'Frontend' },
  // Language
  { name: 'JavaScript', icon: 'SiJavascript', component: SiJavascript, color: '#F7DF1E', category: 'Language' },
  { name: 'TypeScript', icon: 'SiTypescript', component: SiTypescript, color: '#3178C6', category: 'Language' },
  { name: 'Python', icon: 'FaPython', component: FaPython, color: '#3776AB', category: 'Language' },
  { name: 'PHP', icon: 'FaPhp', component: FaPhp, color: '#777BB4', category: 'Language' },
  { name: 'Java', icon: 'FaJava', component: FaJava, color: '#ED8B00', category: 'Language' },
  { name: 'Go', icon: 'SiGo', component: SiGo, color: '#00ADD8', category: 'Language' },
  { name: 'Rust', icon: 'SiRust', component: SiRust, color: '#000000', category: 'Language' },
  // Backend
  { name: 'Node.js', icon: 'FaNodeJs', component: FaNodeJs, color: '#339933', category: 'Backend' },
  { name: 'Express', icon: 'SiExpress', component: SiExpress, color: '#000000', category: 'Backend' },
  { name: 'Django', icon: 'SiDjango', component: SiDjango, color: '#092E20', category: 'Backend' },
  { name: 'Flask', icon: 'SiFlask', component: SiFlask, color: '#000000', category: 'Backend' },
  { name: 'Spring', icon: 'SiSpring', component: SiSpring, color: '#6DB33F', category: 'Backend' },
  { name: 'Laravel', icon: 'SiLaravel', component: SiLaravel, color: '#FF2D20', category: 'Backend' },
  { name: 'GraphQL', icon: 'SiGraphql', component: SiGraphql, color: '#E10098', category: 'Backend' },
  // Database
  { name: 'MongoDB', icon: 'SiMongodb', component: SiMongodb, color: '#47A248', category: 'Database' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', component: SiPostgresql, color: '#336791', category: 'Database' },
  { name: 'MySQL', icon: 'SiMysql', component: SiMysql, color: '#4479A1', category: 'Database' },
  { name: 'Redis', icon: 'SiRedis', component: SiRedis, color: '#DC382D', category: 'Database' },
  { name: 'Prisma', icon: 'SiPrisma', component: SiPrisma, color: '#2D3748', category: 'Database' },
  { name: 'Elasticsearch', icon: 'SiElasticsearch', component: SiElasticsearch, color: '#005571', category: 'Database' },
  // Cloud/Deploy
  { name: 'Firebase', icon: 'SiFirebase', component: SiFirebase, color: '#FFCA28', category: 'Cloud' },
  { name: 'Supabase', icon: 'SiSupabase', component: SiSupabase, color: '#3ECF8E', category: 'Cloud' },
  { name: 'AWS', icon: 'FaAws', component: FaAws, color: '#FF9900', category: 'Cloud' },
  { name: 'Vercel', icon: 'SiVercel', component: SiVercel, color: '#000000', category: 'Cloud' },
  { name: 'Netlify', icon: 'SiNetlify', component: SiNetlify, color: '#00C7B7', category: 'Cloud' },
  { name: 'Cloudflare', icon: 'SiCloudflare', component: SiCloudflare, color: '#F38020', category: 'Cloud' },
  { name: 'Docker', icon: 'FaDocker', component: FaDocker, color: '#2496ED', category: 'Cloud' },
  { name: 'Kubernetes', icon: 'SiKubernetes', component: SiKubernetes, color: '#326CE5', category: 'Cloud' },
  // Tools
  { name: 'Git', icon: 'FaGitAlt', component: FaGitAlt, color: '#F05032', category: 'Tools' },
  { name: 'Figma', icon: 'FaFigma', component: FaFigma, color: '#F24E1E', category: 'Tools' },
  { name: 'Stripe', icon: 'SiStripe', component: SiStripe, color: '#008CDD', category: 'Tools' },
  { name: 'Sanity', icon: 'SiSanity', component: SiSanity, color: '#F03E2F', category: 'Tools' },
  { name: 'WordPress', icon: 'FaWordpress', component: FaWordpress, color: '#21759B', category: 'Tools' },
  { name: 'Shopify', icon: 'FaShopify', component: FaShopify, color: '#96BF48', category: 'Tools' },
  { name: 'Linux', icon: 'FaLinux', component: FaLinux, color: '#FCC624', category: 'Tools' },
]

// ===== CONSTANTS =====
const CATEGORIES = ['fullstack', 'frontend', 'backend', 'ecommerce', 'mobile', 'ai-ml', 'other']
const STATUSES = ['completed', 'in-progress', 'planned', 'on-hold']
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced']

const STATUS_COLORS = {
  'completed': 'bg-green-100 text-green-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  'planned': 'bg-yellow-100 text-yellow-700',
  'on-hold': 'bg-gray-100 text-gray-700',
}

// ===== TECH SELECTOR MODAL =====
const TechSelector = ({ selected, onChange, onClose }) => {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(TECH_OPTIONS.map(t => t.category))]

  const filtered = TECH_OPTIONS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || t.category === activeCategory
    return matchSearch && matchCat
  })

  const toggle = (tech) => {
    const exists = selected.find(s => s.icon === tech.icon)
    if (exists) {
      onChange(selected.filter(s => s.icon !== tech.icon))
    } else {
      onChange([...selected, { name: tech.name, icon: tech.icon }])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">Select Tech Stack</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tech..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {filtered.map(tech => {
              const isSelected = selected.find(s => s.icon === tech.icon)
              const Icon = tech.component
              return (
                <button
                  key={tech.icon}
                  onClick={() => toggle(tech)}
                  className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-xs font-medium ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  <Icon className="w-6 h-6" style={{ color: tech.color }} />
                  <span className="text-center leading-tight">{tech.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <span className="text-sm text-gray-500">{selected.length} selected</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== SECTION WRAPPER =====
const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50/50">
      <Icon className="w-4 h-4 text-purple-600" />
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h2>
    </div>
    <div className="p-5 flex flex-col gap-4">{children}</div>
  </div>
)

// ===== FIELD WRAPPER =====
const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-600">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
)

// ===== INPUT STYLES =====
const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-gray-300 transition-all"
const selectCls = `${inputCls} appearance-none bg-white cursor-pointer`

// ===== MAIN COMPONENT =====
const AddProjectForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const projectID = searchParams.get("id")

  const [form, setForm] = useState({
    title: '',
    description: '',
    shortDescription: '',
    duration: '',
    proj_Link: '',
    github_code_link: '',
    category: [],
    otherCategory: '',
    status: 'completed',
    difficulty: 'intermediate',
    isFeatured: false,
    order: 0,
    startDate: '',
    endDate: '',
    teamSize: 1,
  })

  const [techStack, setTechStack] = useState([])
  const [features, setFeatures] = useState([''])
  const [challenges, setChallenges] = useState({ problem: '', solution: '' })
  const [teamMembers, setTeamMembers] = useState([])
  const [seo, setSeo] = useState({ metaTitle: '', metaDescription: '', keywords: '' })
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [galleryImages, setGalleryImages] = useState([])
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [videoUrls, setVideoUrls] = useState([])
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [videoUploading, setVideoUploading] = useState(false)

  const [showTechSelector, setShowTechSelector] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  // Limit gallery images to prevent memory issues
  const MAX_GALLERY_IMAGES = 10
  const MAX_VIDEO_URLS = 5

  // Toast helper
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Load project if editing
  useEffect(() => {
    if (!projectID) return
    setLoading(true)
    fetch(`/api/project/${projectID}`)
      .then(r => r.json())
      .then(({ success, data }) => {
        if (success && data) {
          const p = data
          setForm({
            title: p.title || '',
            description: p.description || '',
            shortDescription: p.shortDescription || '',
            duration: p.duration || '',
            proj_Link: p.proj_Link || '',
            github_code_link: p.github_code_link || '',
            category: Array.isArray(p.category) ? p.category : (p.category ? [p.category] : []),
            otherCategory: p.otherCategory || '',
            status: p.status || 'completed',
            difficulty: p.difficulty || 'intermediate',
            isFeatured: p.isFeatured || false,
            order: p.order || 0,
            startDate: p.startDate ? p.startDate.slice(0, 10) : '',
            endDate: p.endDate ? p.endDate.slice(0, 10) : '',
            teamSize: p.teamSize || 1,
          })
          setTechStack(p.techStack || [])
          setFeatures(p.features?.length ? p.features : [''])
          setChallenges(p.challenges || { problem: '', solution: '' })
          setTeamMembers(p.teamMembers || [])
          setSeo({
            metaTitle: p.seo?.metaTitle || '',
            metaDescription: p.seo?.metaDescription || '',
            keywords: p.seo?.keywords?.join(', ') || ''
          })
          if (p.project_image?.url) setPreview(p.project_image.url)
          if (Array.isArray(p.gallery_images)) {
            setGalleryImages(p.gallery_images)
          }
          setVideoUrls(
            Array.isArray(p.demoVideoUrls)
              ? p.demoVideoUrls
              : p.demoVideoUrl
                ? [p.demoVideoUrl]
                : []
          )
        }
      })
      .finally(() => setLoading(false))
  }, [projectID])
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }
  const handleCategoryChange = (categoryValue) => {
    const currentCategories = form.category || []
    let newCategories

    if (currentCategories.includes(categoryValue)) {
      // Remove category
      newCategories = currentCategories.filter(c => c !== categoryValue)
    } else {
      // Add category
      newCategories = [...currentCategories, categoryValue]
    }

    setForm(prev => ({ ...prev, category: newCategories }))
  }

  const handleOtherCategoryChange = (e) => {
    setForm(prev => ({ ...prev, otherCategory: e.target.value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleGalleryFilesChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    // Check total limit
    const currentCount = galleryImages.length
    const newCount = files.length
    if (currentCount + newCount > MAX_GALLERY_IMAGES) {
      showToast(`Maximum ${MAX_GALLERY_IMAGES} gallery images allowed. You can add ${MAX_GALLERY_IMAGES - currentCount} more.`, 'error')
      return
    }

    setGalleryUploading(true)
    const uploadedImages = []

    try {
      for (const file of files) {
        const url = await uploadImage(file)
        if (url) {
          uploadedImages.push({
            url,
            public_id: url.split('/').pop()
          })
        }
      }

      if (uploadedImages.length) {
        setGalleryImages(prev => [...prev, ...uploadedImages])
        showToast(`${uploadedImages.length} gallery image(s) added`)
      }
    } catch (err) {
      console.error(err)
      showToast('Gallery upload failed. Please try again.', 'error')
    } finally {
      setGalleryUploading(false)
      e.target.value = ''
    }
  }

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, idx) => idx !== index))
  }

  const handleVideoFilesChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setVideoUploading(true)
    const uploadedVideos = []

    try {
      for (const file of files) {
        const url = await uploadImage(file)
        if (url) {
          uploadedVideos.push(url)
        }
      }

      if (uploadedVideos.length) {
        setVideoUrls(prev => [...prev, ...uploadedVideos])
        showToast(`${uploadedVideos.length} video(s) added`)
      }
    } catch (err) {
      console.error(err)
      showToast('Video upload failed. Please try again.', 'error')
    } finally {
      setVideoUploading(false)
      e.target.value = ''
    }
  }

  const addVideoUrl = () => {
    const trimmed = newVideoUrl.trim()
    if (!trimmed) return

    // Check limit
    if (videoUrls.length >= MAX_VIDEO_URLS) {
      showToast(`Maximum ${MAX_VIDEO_URLS} video links allowed.`, 'error')
      return
    }

    setVideoUrls(prev => [...prev, trimmed])
    setNewVideoUrl('')
    showToast('Video link added')
  }

  const removeVideoUrl = (index) => {
    setVideoUrls(prev => prev.filter((_, idx) => idx !== index))
  }

  // Feature list helpers
  const updateFeature = (i, val) => {
    const arr = [...features]
    arr[i] = val
    setFeatures(arr)
  }
  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (i) => setFeatures(features.filter((_, idx) => idx !== i))

  // Team members helpers
  const addMember = () => setTeamMembers([...teamMembers, { name: '', role: '', github: '' }])
  const updateMember = (i, key, val) => {
    const arr = [...teamMembers]
    arr[i] = { ...arr[i], [key]: val }
    setTeamMembers(arr)
  }
  const removeMember = (i) => setTeamMembers(teamMembers.filter((_, idx) => idx !== i))

  // Upload image to R2 using shared helper
  const uploadImage = async (file) => {
    if (!file) return null
    return await UploadFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      let finalImageUrl = imageUrl || preview

      // If new file selected, upload first
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile)
      }

      if (!finalImageUrl) {
        showToast('Project image is required', 'error')
        setSaving(false)
        return
      }

      const method = projectID ? 'PATCH' : 'POST'
      const url = projectID ? `/api/project/${projectID}` : '/api/project'

      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'category') {
          // Handle category array
          v.forEach(cat => fd.append('category', cat))
        } else {
          fd.append(k, v)
        }
      })
      fd.append('imageUrl', finalImageUrl)
      fd.append('gallery_images', JSON.stringify(
        galleryImages.map(img => ({
          url: img.url,
          public_id: img.public_id || img.url.split('/').pop()
        }))
      ))
      fd.append('demoVideoUrls', JSON.stringify(videoUrls))
      fd.append('techStack', JSON.stringify(techStack))
      fd.append('features', JSON.stringify(features.filter(f => f.trim())))
      fd.append('challenges', JSON.stringify(challenges))
      fd.append('teamMembers', JSON.stringify(teamMembers))
      fd.append('seo', JSON.stringify({
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        keywords: seo.keywords.split(',').map(k => k.trim()).filter(Boolean)
      }))

      const res = await fetch(url, { method, body: fd })
      const result = await res.json()

      if (result.success) {
        showToast(result.message)
        setTimeout(() => router.push('/admin/your-projects'), 1200)
      } else {
        showToast(result.message || 'Something went wrong', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Network error. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin w-10 h-10 text-purple-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50 pb-16">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 transition-all ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Tech Selector Modal */}
      {showTechSelector && (
        <TechSelector
          selected={techStack}
          onChange={setTechStack}
          onClose={() => setShowTechSelector(false)}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {projectID ? '✏️ Edit Project' : '🚀 Add New Project'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Fill in the details below. Fields marked * are required.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* === BASIC INFO === */}
          <Section title="Basic Info" icon={Info}>
            <Field label="Project Title" required>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. My Awesome E-Commerce App"
                className={inputCls}
                required
              />
            </Field>

            <Field label="Short Description (max 160 chars)" required>
              <div className="relative">
                <input
                  type="text"
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief description for cards & SEO..."
                  maxLength={160}
                  className={inputCls}
                  required
                />
                <span className="absolute right-3 bottom-3 text-xs text-gray-300">
                  {form.shortDescription.length}/160
                </span>
              </div>
            </Field>

            <Field label="Full Description (Rich Text)" required>
              <div className="border border-gray-200 rounded-xl overflow-hidden min-h-[200px]">
                <RichEditor
                  value={form.description}
                  onChange={(val) => setForm(prev => ({ ...prev, description: val }))}
                />
              </div>
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category" required>
                <div className="space-y-2">
                  {CATEGORIES.map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(form.category || []).includes(c)}
                        onChange={() => handleCategoryChange(c)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 capitalize">{c}</span>
                    </label>
                  ))}
                </div>
                {(form.category || []).includes('other') && (
                  <input
                    type="text"
                    value={form.otherCategory}
                    onChange={handleOtherCategoryChange}
                    placeholder="Specify other category..."
                    className={`${inputCls} mt-2`}
                  />
                )}
              </Field>

              <Field label="Duration" required>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 2 months"
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Status">
                <select name="status" value={form.status} onChange={handleChange} className={selectCls}>
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </Field>

              <Field label="Difficulty">
                <select name="difficulty" value={form.difficulty} onChange={handleChange} className={selectCls}>
                  {DIFFICULTIES.map(d => (
                    <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          {/* === LINKS === */}
          <Section title="Links" icon={Globe}>
            <Field label="Live Project URL" required>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="url"
                  name="proj_Link"
                  value={form.proj_Link}
                  onChange={handleChange}
                  placeholder="https://your-project.vercel.app"
                  className={`${inputCls} pl-10`}
                  
                />
              </div>
            </Field>

            <Field label="GitHub Repository">
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="url"
                  name="github_code_link"
                  value={form.github_code_link}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className={`${inputCls} pl-10`}
                />
              </div>
            </Field>
          </Section>

          {/* === PROJECT IMAGE === */}
          <Section title="Project Image" icon={ImageIcon}>
            {preview && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-1">
                <Image fill src={preview} alt="Preview" className="object-cover" />
                <button
                  type="button"
                  onClick={() => { setPreview(''); setImageFile(null) }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all">
              <Upload className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium text-purple-600">Click to upload image</span>
              <span className="text-xs text-gray-400 mt-1">PNG, JPG, WebP supported</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </Section>

          <Section title="Gallery Images" icon={ImageIcon}>
            <div className="flex flex-wrap gap-3">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative w-28 h-28 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  <Image fill src={img.url} alt={`Gallery ${i + 1}`} className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1 shadow-sm hover:bg-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all">
              <Upload className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium text-purple-600">Upload gallery images</span>
              <span className="text-xs text-gray-400 mt-1">
                {galleryUploading ? 'Uploading...' : 'Select one or more images'}
              </span>
              <input type="file" accept="image/*" multiple onChange={handleGalleryFilesChange} className="hidden" />
            </label>
            <p className="text-xs text-gray-400">Recommended: 3–6 images. You can remove any image before saving.</p>
          </Section>

          <Section title="Project Videos" icon={Video}>
            <div className="flex flex-col gap-3">
              {videoUrls.map((url, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-gray-200 bg-gray-50">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{url}</p>
                    <p className="text-xs text-gray-500">Video {i + 1}</p>
                  </div>
                  <button type="button" onClick={() => removeVideoUrl(i)} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all">
              <Upload className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium text-purple-600">Upload video files</span>
              <span className="text-xs text-gray-400 mt-1">
                {videoUploading ? 'Uploading...' : 'Select one or more videos'}
              </span>
              <input type="file" accept="video/*" multiple onChange={handleVideoFilesChange} className="hidden" />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="url"
                value={newVideoUrl}
                onChange={e => setNewVideoUrl(e.target.value)}
                placeholder="Add video URL (YouTube/Vimeo)"
                className={inputCls}
              />
              <button
                type="button"
                onClick={addVideoUrl}
                className="px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all"
              >
                Add Link
              </button>
            </div>
            <p className="text-xs text-gray-400">You can upload local video files or add external video links.</p>
          </Section>

          {/* === TECH STACK === */}
          <Section title="Tech Stack" icon={Layers}>
            <div className="flex flex-wrap gap-2 mb-2">
              {techStack.map((tech, i) => {
                const found = TECH_OPTIONS.find(t => t.icon === tech.icon)
                const Icon = found?.component
                return (
                  <div key={i} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
                    {Icon && <Icon className="w-4 h-4" style={{ color: found.color }} />}
                    <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                    <button
                      type="button"
                      onClick={() => setTechStack(techStack.filter((_, idx) => idx !== i))}
                      className="text-gray-400 hover:text-red-500 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => setShowTechSelector(true)}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-purple-200 rounded-xl text-purple-600 text-sm font-medium hover:border-purple-400 hover:bg-purple-50 transition-all"
            >
              <Plus className="w-4 h-4" />
              {techStack.length === 0 ? 'Select Technologies' : 'Add/Remove Technologies'}
            </button>
          </Section>

          {/* === FEATURES === */}
          <Section title="Key Features" icon={Zap}>
            {features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={f}
                  onChange={e => updateFeature(i, e.target.value)}
                  placeholder={`Feature ${i + 1}...`}
                  className={inputCls}
                />
                {features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(i)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors w-fit"
            >
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </Section>

          {/* === CHALLENGES === */}
          <Section title="Challenges & Solutions" icon={AlertTriangle}>
            <Field label="Problem / Challenge">
              <textarea
                value={challenges.problem}
                onChange={e => setChallenges(prev => ({ ...prev, problem: e.target.value }))}
                placeholder="What challenges did you face?"
                rows={3}
                className={inputCls}
              />
            </Field>
            <Field label="Solution">
              <textarea
                value={challenges.solution}
                onChange={e => setChallenges(prev => ({ ...prev, solution: e.target.value }))}
                placeholder="How did you solve them?"
                rows={3}
                className={inputCls}
              />
            </Field>
          </Section>

          {/* === DATES & TEAM === */}
          <Section title="Dates & Team" icon={Calendar}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Start Date">
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputCls} />
              </Field>
              <Field label="End Date">
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputCls} />
              </Field>
              <Field label="Team Size">
                <input
                  type="number"
                  name="teamSize"
                  value={form.teamSize}
                  onChange={handleChange}
                  min={1}
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Team Members */}
            {teamMembers.map((m, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <input
                  type="text"
                  placeholder="Name"
                  value={m.name}
                  onChange={e => updateMember(i, 'name', e.target.value)}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Designer)"
                  value={m.role}
                  onChange={e => updateMember(i, 'role', e.target.value)}
                  className={inputCls}
                />
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={m.github}
                    onChange={e => updateMember(i, 'github', e.target.value)}
                    className={inputCls}
                  />
                  <button type="button" onClick={() => removeMember(i)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addMember}
              className="flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors w-fit"
            >
              <Plus className="w-4 h-4" /> <Users className="w-4 h-4" /> Add Team Member
            </button>
          </Section>

          {/* === SEO === */}
          <Section title="SEO & Meta" icon={Tag}>
            <Field label="Meta Title">
              <input
                type="text"
                value={seo.metaTitle}
                onChange={e => setSeo(prev => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="SEO-friendly title..."
                className={inputCls}
              />
            </Field>
            <Field label="Meta Description">
              <textarea
                value={seo.metaDescription}
                onChange={e => setSeo(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="Brief description for search engines..."
                rows={2}
                className={inputCls}
              />
            </Field>
            <Field label="Keywords (comma separated)">
              <input
                type="text"
                value={seo.keywords}
                onChange={e => setSeo(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="react, nextjs, ecommerce..."
                className={inputCls}
              />
            </Field>
          </Section>

          {/* === SETTINGS === */}
          <Section title="Settings" icon={Star}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Display Order">
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  min={0}
                  className={inputCls}
                />
              </Field>
              <Field label="Featured Project">
                <label className="flex items-center gap-3 cursor-pointer mt-2">
                  <div
                    onClick={() => setForm(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${form.isFeatured ? 'bg-purple-600' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.isFeatured ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-sm text-gray-600">{form.isFeatured ? 'Yes, show as featured' : 'No'}</span>
                </label>
              </Field>
            </div>
          </Section>

          {/* === SUBMIT === */}
          <button
            type="submit"
            disabled={saving || galleryUploading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><LoaderCircle className="animate-spin w-5 h-5" /> Saving...</>
            ) : (
              <><Save className="w-5 h-5" /> {projectID ? 'Update Project' : 'Add Project'}</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

// Suspense wrapper (required for useSearchParams)
const AddProject = () => (
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className="animate-spin w-10 h-10 text-purple-600" />
    </div>
  }>
    <AddProjectForm />
  </Suspense>
)

export default AddProject