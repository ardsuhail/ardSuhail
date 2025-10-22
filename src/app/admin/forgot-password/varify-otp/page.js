"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
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
          
          setTimeout(() => router.push("/admin/forgot-password/reset-password"), 1500);
        }
        console.log(result)
      })
      .catch((error) => console.error(error));
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
        <button className="bg-green-600 p-2 rounded hover:bg-green-700">
          Verify OTP
        </button>
         {/* for resend otp */}
        <Link href="/admin/forgot-password" className="text-sm text-blue-400 hover:underline mt-2">
          Resend OTP
        </Link>
      </form>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
