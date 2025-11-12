"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, FileText, Search, Plus, Edit3, Trash2, ExternalLink, Github, Calendar, Hash, Eye } from "lucide-react";
import { Suspense } from "react";
import Image from "next/image";

const YourProject = () => {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [readMore, setReadMore] = useState({});
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectID = searchParams.get("id");
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (projectID) {
            fetch(`/api/project/${projectID}`)
                .then((res) => res.json())
                .then((data) => {
                    setProjects(data.project);
                });
        }
    }, [projectID]);

    useEffect(() => {
        fetch("/api/project")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/project/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                alert("Project deleted successfully ✅");
                setProjects((prev) => prev.filter((col) => col._id !== id));
            } else {
                alert(data.message || "Failed to delete project ❌");
            }
        } catch (error) {
            alert("Error deleting project: " + error.message);
        }
    };

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
        const loginToken = localStorage.getItem("notlogin");
        setToken(loginToken);
        if (!loginToken) {
            router.push("/");
        }
    }, [token]);

    return (
        <Suspense
            fallback={
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-4">
                        <Loader className="animate-spin text-blue-500 w-12 h-12" />
                        <p className="text-white text-lg font-medium">Loading Projects...</p>
                    </div>
                </div>
            }
        >
            <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 p-6 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800/50">
                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                    Project Portfolio
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Manage and organize your development projects
                            </p>
                        </div>
                        <Link href="/admin/add-project" className="w-full lg:w-auto">
                            <button className="w-full lg:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-blue-500/30">
                                <Plus className="w-5 h-5" />
                                Add New Project
                            </button>
                        </Link>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search projects by title, description, or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-700 bg-gray-900/60 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 shadow-lg transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-gray-900/40 rounded-2xl border border-gray-800/50">
                            <Loader className="animate-spin w-8 h-8 text-blue-500 mb-4" />
                            <p className="text-gray-400 font-medium">Loading your projects...</p>
                        </div>
                    ) : (
                        <>
                            {/* Projects Grid */}
                            {filteredProjects.length > 0 ? (
                                <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                    {filteredProjects.map((item) => (
                                        <div
                                            key={item._id}
                                            className="group relative border border-gray-800 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-lg hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden flex flex-col h-full"
                                        >
                                            {/* Image Section */}
                                            <div className="relative overflow-hidden">
                                                <div className="aspect-video bg-gray-800/50 relative">
                                                    <Image
                                                        src={item.project_image?.url || "/api/placeholder/400/225"}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                                
                                                {/* Project ID Badge */}
                                                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                                    <p className="text-xs text-gray-300 flex items-center gap-1">
                                                        <Hash className="w-3 h-3" />
                                                        {item._id.slice(-6)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="space-y-4 flex-1">
                                                    {/* Title */}
                                                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
                                                        {item.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <div className="space-y-2">
                                                        <p className={`text-gray-300 text-sm leading-relaxed ${
                                                            readMore[item._id] ? "line-clamp-none" : "line-clamp-2"
                                                        }`}>
                                                            {item.description}
                                                        </p>
                                                        <button
                                                            onClick={() => toggleReadMore(item._id)}
                                                            className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors flex items-center gap-1"
                                                        >
                                                            <Eye className="w-3 h-3" />
                                                            {readMore[item._id] ? "Show less" : "Read more"}
                                                        </button>
                                                    </div>

                                                    {/* Project Details */}
                                                    <div className="space-y-3 pt-2 border-t border-gray-800/50">
                                                        {/* Duration */}
                                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                                            <Calendar className="w-4 h-4 text-purple-400" />
                                                            <span>{item.duration}</span>
                                                        </div>

                                                        {/* Live Link */}
                                                        {item.proj_Link && (
                                                            <div className="flex items-start gap-3 text-sm">
                                                                <ExternalLink className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                                <Link
                                                                    href={item.proj_Link}
                                                                    target="_blank"
                                                                    className="text-blue-400 hover:text-blue-300 hover:underline break-all text-sm transition-colors"
                                                                >
                                                                    Live Demo
                                                                </Link>
                                                            </div>
                                                        )}

                                                        {/* GitHub Link */}
                                                        {item.github_code_link && (
                                                            <div className="flex items-start gap-3 text-sm">
                                                                <Github className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                                <Link
                                                                    href={item.github_code_link}
                                                                    target="_blank"
                                                                    className="text-blue-400 hover:text-blue-300 hover:underline break-all text-sm transition-colors"
                                                                >
                                                                    Source Code
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-6 space-y-3">
                                                    <button
                                                        onClick={() => handleEdit(item._id)}
                                                        className="w-full flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 py-2.5 rounded-xl font-medium border border-blue-500/30 hover:border-blue-400/50 transition-all duration-200 group"
                                                    >
                                                        <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                        Edit Project
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 py-2.5 rounded-xl font-medium border border-red-500/30 hover:border-red-400/50 transition-all duration-200 group"
                                                    >
                                                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                        Delete Project
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="text-center py-16 bg-gray-900/40 rounded-2xl border border-gray-800/50">
                                    <div className="max-w-md mx-auto">
                                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                            No projects found
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            {search ? "Try adjusting your search terms" : "Get started by creating your first project"}
                                        </p>
                                        <Link href="/admin/add-project">
                                            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                                                <Plus className="w-5 h-5" />
                                                Create First Project
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Results Count */}
                            {filteredProjects.length > 0 && (
                                <div className="mt-8 text-center">
                                    <p className="text-gray-500 text-sm">
                                        Showing {filteredProjects.length} of {projects.length} projects
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Suspense>
    );
};

export default YourProject;