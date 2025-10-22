"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function resetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(null)
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
        setMessage(result.message);
        if (result.success) {
          localStorage.removeItem("resetEmail");
          localStorage.removeItem("otpVerified");
          setTimeout(() => router.push("/"), 1500);
        }
        console.log(result)
      })
      .catch((error) => console.error(error));
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
        <button className="bg-purple-600 p-2 rounded hover:bg-purple-700">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
