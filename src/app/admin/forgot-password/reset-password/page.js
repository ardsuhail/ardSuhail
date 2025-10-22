"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter();
 
   useEffect(() => {
  const storedEmail = localStorage.getItem("resetEmail");
  const otpVerified = localStorage.getItem("otpVerified");

  if (!storedEmail || otpVerified !== "true") {
    router.push("/admin/forgot-password"); // redirect if OTP not verified
  } else {
    setEmail(storedEmail);
  }
}, [router]);
  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "newPassword": password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/admin/reset-password", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setMessage(result.message);
          localStorage.removeItem("resetEmail");
          localStorage.removeItem("otpVerified");
          setTimeout(() => router.push("/"), 1500);
        }else{
          setLoading(false)
          setError(result.message)
        }
        console.log(result)
      })
      .catch((error) => {
        setLoading(false)
        setError(error.message)
        console.error(error)
      });
  };

    if (!email) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }
 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Create New Password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4 w-80">
        <input
          type="password"
          placeholder="Enter new password"
          className="p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={`bg-purple-600 p-2 rounded hover:bg-purple-700 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer"} `} disabled={loading} >
        {loading?<div  className='flex justify-center items-center gap-3' ><LoaderCircle className='animate-spin w-6 h-6' /> <span  className='animate-pulse' >Please wait...</span></div>:"Reset Password"}  
        </button>
      </form>
     {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-3  text-red-600 text-sm">{error}</p>}
    </div>
  );
}
