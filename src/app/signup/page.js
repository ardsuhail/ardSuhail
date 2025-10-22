"use client";
import  { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye,EyeOff, User } from "lucide-react";
export default function CreateAdminPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false)
//  const [token, setToken] = useState(null)
  // Input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 const route=useRouter()
  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": form.username,
      "email": form.email,
      "password": form.password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setLoading(false)
          alert(result.message)
          setForm({
            emailL: "",
            username: "",
            password: ""
          })
        }
        console.log(result)
      })
      .catch((error) => console.error(error));

  };
    // useEffect(() => {
    //       const loginToken = localStorage.getItem("notlogin")
    //       setToken(loginToken)
    //       if (!loginToken) {
    //         router.push("/")
    //       }
    //     }, [token])
      
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Admin</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 outline-none"
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
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition p-3 rounded font-semibold"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
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
