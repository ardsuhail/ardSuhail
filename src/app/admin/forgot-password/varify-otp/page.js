"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState(null)
  const router = useRouter();
    useEffect(() => {
   const storedEmail = localStorage.getItem("resetEmail");

 
   if (!storedEmail ) {
     router.push("/admin/forgot-password"); // redirect if OTP not verified
   } else {
     setEmail(storedEmail);
   }
 }, [router]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "otp": otp
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/admin/Varify-otp", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message);
        if (result.success) {
          localStorage.setItem("otpVerified", "true");
          setMessage("OTP verified successfully. Redirecting...");
          setTimeout(() => router.push("/admin/forgot-password/reset-password"), 1500);
        }else{
          setLoading(false)
          setErro(result.message)
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
      <h2 className="text-2xl mb-4">Verify OTP</h2>
      <form onSubmit={handleVerify} className="flex flex-col gap-4 w-80">
        <input
          type="number"
          placeholder="Enter OTP"
          className="p-2 rounded text-black"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit" disabled={loading} className={`bg-green-600 p-2 rounded hover:bg-green-700 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer"} `}>
         {loading?<div  className='flex justify-center items-center gap-3' ><LoaderCircle className='animate-spin w-6 h-6' /> <span  className='animate-pulse' >Please wait...</span></div>:"Verify OTP"}  
        </button>
         {/* for resend otp */}
        <Link href="/admin/forgot-password" className="text-sm text-blue-400 hover:underline mt-2">
          Resend OTP
        </Link>
      </form>
      {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-3  text-red-600 text-sm">{error}</p>}
    </div>
  );
}
