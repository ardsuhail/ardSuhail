"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, FileText } from "lucide-react";
import { Suspense } from "react";

const YourProject = () => {
    const [projects, setProjects] = useState([]); // ✅ better naming
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [readMore, setReadMore] = useState({})
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectID = searchParams.get("id");
 const [token, setToken] = useState(null)

    useEffect(() => {
        if (projectID) {
            fetch(`/api/project/${projectID}`)
                .then((res) => res.json())
                .then((data) => {
                    setProjects(data.project); // wrap in array
                });
        }
    }, [projectID]);



    useEffect(() => {
        fetch("/api/project")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects)
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);



    // ✅ Handle Delete
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this Project?")) return;

        try {
            const res = await fetch(`/api/project/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                alert("Project deleted successfully ✅");
                setProjects((prev) => prev.filter((col) => col._id !== id)); // ✅ update UI
            } else {
                alert(data.message || "Failed to delete Project ❌");
            }
        } catch (error) {
            alert("Error deleting collection: " + error.message);
        }
    };

    // ✅ Handle Edit → Push to Create/Edit Page
    const handleEdit = (id) => {
        router.push(`/admin/add-project?id=${id}`);
    };
    const toggleReadMore = (id) => {

        setReadMore((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const filteredProjects = projects.filter((item) =>
        item?._id?.toLowerCase().includes(search.toLowerCase()) ||
        item?.title?.toLowerCase().includes(search.toLowerCase()) ||
        item?.description?.toLowerCase().includes(search.toLowerCase())
    );

       useEffect(() => {
            const loginToken = localStorage.getItem("notlogin")
            setToken(loginToken)
            if (!loginToken) {
              router.push("/")
            }
          }, [token])
    return (
        <Suspense
            fallback={
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <Loader className="animate-spin text-blue-500 w-16 h-16" />
                </div>
            }
        >
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6">
                {/* Header Section */}
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <Loader className="animate-spin w-12 h-12 text-blue-500" />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 p-6 bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-800">
                            <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                                🧩 Manage Projects
                            </h1>
                            <Link href="/admin/add-project">
                                <button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-2xl font-medium shadow-lg hover:shadow-purple-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ease-out">
                                    ➕ Add New Project
                                </button>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-lg mx-auto mb-10">
                            <input
                                type="text"
                                placeholder="🔍 Search by title, description, or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-3 rounded-2xl border border-gray-700 bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-md"
                            />
                        </div>

                        {/* Projects Grid */}
                        {filteredProjects.length > 0 ? (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredProjects.map((item) => (
                                    <div
                                        key={item._id}
                                        className="group border border-gray-800 rounded-3xl shadow-lg bg-gray-900/70 backdrop-blur-lg hover:border-purple-500 hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden flex flex-col"
                                    >
                                        {/* Image */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={item.project_image?.url}
                                                alt={item.title}
                                                className="object-cover w-full h-52 rounded-t-3xl group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center p-3">
                                                <span className="text-xs text-gray-300 italic">
                                                    Click to view details
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col justify-between flex-1">
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                                    {item.title}
                                                </h2>
                                                <p className={`text-gray-400 text-sm leading-relaxed line-clamp-1  ${readMore[item._id] ? "line-clamp-none" : "line-clamp-1"} `}>
                                                    <b>Project Description: </b> {item.description}
                                                </p>
                                                <p
                                                    onClick={() => toggleReadMore(item._id)}
                                                    className="text-red-500 cursor-pointer mt-1 select-none text-sm"
                                                >
                                                    {readMore[item._id] ? "Read less" : "Read more"}
                                                </p>

                                                <div className="mt-4 space-y-1 text-sm text-gray-300">
                                                    <p>
                                                        <span className="text-purple-400 font-medium">
                                                            ⏱ Duration:
                                                        </span>{" "}
                                                        {item.duration}
                                                    </p>
                                                    <p>
                                                        <span className="text-purple-400 font-medium">
                                                            🌐 Live:
                                                        </span>{" "}
                                                        <Link
                                                            href={item.proj_Link}
                                                            target="_blank"
                                                            className="text-blue-400 hover:underline break-all"
                                                        >
                                                            {item.proj_Link}
                                                        </Link>
                                                    </p>
                                                    <p>
                                                        <span className="text-purple-400 font-medium">
                                                            💻 Code:
                                                        </span>{" "}
                                                        <Link
                                                            href={item.github_code_link}
                                                            target="_blank"
                                                            className="text-blue-400 hover:underline break-all"
                                                        >
                                                            {item.github_code_link}
                                                        </Link>
                                                    </p>
                                                </div>

                                                <p className="text-xs text-gray-500 mt-4">
                                                    🆔 Project ID:{" "}
                                                    <span className="text-gray-400">
                                                        #{item._id.slice(-6)}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="mt-5 space-y-3">
                                                <button
                                                    onClick={() => handleEdit(item._id)}
                                                    className="w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                                                >
                                                    ✏️ Edit Project
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="w-full bg-red-600 text-white py-2 rounded-xl font-medium hover:bg-red-700 hover:shadow-lg transition-all duration-300"
                                                >
                                                    🗑 Delete Project
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 mt-16 text-lg">
                                No projects found. Create one to get started 🚀
                            </div>
                        )}
                    </>
                )}
            </div>
        </Suspense>
    );
};

export default YourProject;
