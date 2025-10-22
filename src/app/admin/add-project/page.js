"use client"
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// export const revalidate = 0;
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { Suspense } from 'react'
import Error from '@/component/Error'
import SubmitMessage from '@/component/SubmitMessage'

const AddProductPage = () => {
  const searchParams = useSearchParams();
  const router=useRouter()
  const projectID = searchParams.get("id");
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: '',
    proj_Link: "",
    github_code_link: "",
    project_image: null
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setloading] = useState(false)
const [token, setToken] = useState(null)
  // Fetch existing collection for edit mode
  useEffect(() => {

    if (projectID) {
      setloading(true)
      fetch(`/api/project/${projectID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.project) {
            setloading(false)
            setForm({
              title: data.project.title || "",
              description: data.project.description || "",
              duration: data.project.duration || "",
              proj_Link: data.project.proj_Link || "",
              github_code_link: data.project.github_code_link || "",
              project_image: data.project.project_image || null
            });
          }
        });
    }
  }, [projectID]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // File select
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(URL.createObjectURL(files[0])); // sirf ek image show
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const method = projectID ? "PATCH" : "POST";
    const url = projectID ? `/api/project/${projectID}` : "/api/project";

    const formdata = new FormData();
    formdata.append("title", form.title);
    formdata.append("description", form.description);
    formdata.append("duration", form.duration);
    formdata.append("proj_Link", form.proj_Link);
    formdata.append("github_code_link", form.github_code_link);
    if (images.length > 0) {
      formdata.append("project_image", images[0]);
    }

    const requestOptions = {
      method: method,
      body: formdata,
      redirect: "follow"
    };

    fetch(url, requestOptions) // ✅ URL variable use kiya
      .then((response) => response.json())
      .then((result) => {
        if(result.success){
           setMessage(result.message)
          router.push("/admin/your-projects")
          setForm({
            title:"",
            description:"",
            duration:"",
            proj_Link:"",
            github_code_link:""
          })
          setPreview("")
        }
        console.log(result)
      })
      .catch((error) => {
        setloading(false)
        console.error(error)
      });
  };

  // Existing image preview in edit mode
  useEffect(() => {
    if(projectID && form.project_image) {
      setPreview(form.project_image.url);
    }
  }, [projectID, form.project_image]);

  useEffect(() => {
      const loginToken = localStorage.getItem("notlogin")
      setToken(loginToken)
      if (!loginToken) {
        router.push("/")
      }
    }, [token])
  

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-96">
        <LoaderCircle className="animate-spin w-12 h-12 text-blue-600" />
      </div>
    }>
     {loading?<div className="flex justify-center items-center h-96">
        <LoaderCircle className="animate-spin w-12 h-12 text-blue-600" />
      </div>:(
<>
        {error && <Error error={error} onClose={() => setError(null)} />}
      {message && <SubmitMessage message={message} onClose={() => setMessage(null)} />}
      <div className="p-6 max-w-4xl mx-auto min-h-screen z-50 bg-gray-100">
        <style jsx global>{`
          html,
          body {
            overflow-x: hidden !important;
          }
        `}</style>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{projectID ? "Edit Project" : "Add New Project"}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Project Info */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
                Project Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
                Project Duration
              </label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
                Project Link
              </label>
              <input
                type="text"
                name="proj_Link"
                value={form.proj_Link}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
                Git Hub Code Link
              </label>
              <input
                type="text"
                name="github_code_link"
                value={form.github_code_link}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Project Image */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-gray-800 mb-3 font-semibold text-lg">Project Image</p>
            {preview && (
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-md mb-3">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="w-28 h-28 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center cursor-pointer text-3xl text-purple-400 hover:bg-purple-50 hover:border-purple-500 transition-all duration-300">
              +
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            {projectID ? "💾 Update Project" : "🚀 Add Project"}
          </button>
        </form>
      </div>
 </> ) } 
    </Suspense>
  )
}

export default AddProductPage;
