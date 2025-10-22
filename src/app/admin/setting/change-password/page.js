"use client";

import { useState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function ChangePasswordPage() {
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [shownewPassword, setShownewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [token, setToken] = useState(null)
    const router = useRouter()
    // Input change handler
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (form.newPassword !== form.confirmPassword) {
            alert("New passwords do not match!");
            setLoading(false);
            return;
        }
        // setMessage("");
        const email = localStorage.getItem("email");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "email": email,
            "oldPassword": form.oldPassword,
            "newPassword": form.newPassword,
            "confirmPassword": form.confirmPassword
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/admin/change-password", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setLoading(false)
                    alert(result.message)
                    setForm({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    })
                    router.push("/admin/setting")
                }
                console.log(result)
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        const loginToken = localStorage.getItem("notlogin")
        setToken(loginToken)
        if (!loginToken) {
            router.push("/")
        }
    }, [token])


    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <KeyRound className="w-12 h-12 text-yellow-400 mb-2" />
                    <h1 className="text-3xl font-bold">Change Password</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Secure your admin account by updating your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative w-full" >

                        <input
                            type={showPassword ? "text" : "password"}
                            name="oldPassword"
                            placeholder="Old Password"
                            value={form.oldPassword}
                            onChange={handleChange}
                            className="p-3 rounded bg-gray-700 outline-none w-full "
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                            {showPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                        </button>
                    </div>
                    <div className="relative w-full" >

                        <input
                            type={shownewPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="New Password"
                            value={form.newPassword}
                            onChange={handleChange}
                            className="p-3 rounded bg-gray-700 outline-none w-full "
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShownewPassword(!shownewPassword)}
                            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                            {shownewPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                        </button>
                    </div>
                    <div className="relative w-full" >
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="p-3 rounded bg-gray-700 w-full outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                            {showConfirmPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-yellow-500 hover:bg-yellow-600 transition p-3 rounded font-semibold text-black"
                    >
                        {loading ? "Updating..." : "Update Password"}
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

                {message && (
                    <p
                        className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
