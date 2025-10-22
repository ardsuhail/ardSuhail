"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
const page = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [token, setToken] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": form.email,
            "password": form.password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/login", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setToken(result.token); // optional
                    document.cookie = `token=${result.token}; path=/; samesite=strict;`; // direct use
                    alert(result.message)
                    localStorage.setItem("notlogin", result.token);
                    window.location.href = "/";
                }

                console.log(result)
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
            });
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-4">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
                <h2 className="text-center text-2xl font-semibold text-white mb-6">Admin Login</h2>
                <form action="POST" onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="email"
                        value={form.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent"
                    />
                    <div className="relative w-full">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full pr-12 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                            {showPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:scale-[1.02] active:scale-100 transition-transform"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-300">
                        Forgot your password?{" "}
                        <Link
                            href="/admin/forgot-password"
                            className="text-indigo-400 hover:underline"
                        >
                            Reset it here
                        </Link>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default page
