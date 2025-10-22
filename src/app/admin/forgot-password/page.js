"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/admin/forgot-password", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message);
        if (result.success) {

          localStorage.setItem("resetEmail", email);
          setMessage("OTP sent successfully. Redirecting...");
          setTimeout(() => router.push("/admin/forgot-password/varify-otp"), 1500);
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button  type="submit"  disabled={loading} className={`bg-blue-600 p-2 rounded hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer"} `}>
       {loading?<div  className='flex justify-center items-center gap-3' ><LoaderCircle className='animate-spin w-6 h-6' /> <span  className='animate-pulse' >Please wait...</span></div>:"Send OTP"}
        </button>
      </form>
      {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-3  text-red-600 text-sm">{error}</p>}
    </div>
  );
}
