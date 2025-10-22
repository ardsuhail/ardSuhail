"use client";

import React, { useState, useEffect } from "react";
import { Loader, UserCircle } from "lucide-react";

const AdminsPage = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState(null);
 const [token, setToken] = useState(null)

    useEffect(() => {
        fetch(`/api/admin/profile`)
            .then((res) => res.json())
            .then((data) => {
                setProfileInfo(data.admin);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("/api/signup")
            .then((res) => res.json())
            .then((data) => {
                setAdmins(data.admins); // tumhare backend se array aa raha hai
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching admins:", err);
                setLoading(false);
            });
    }, []);

      useEffect(() => {
          const loginToken = localStorage.getItem("notlogin")
          setToken(loginToken)
          if (!loginToken) {
            router.push("/")
          }
        }, [token])
      
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <Loader className="animate-spin w-16 h-16 text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-white mb-6">All Admins</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {admins.map((admin) => (
                    <div
                        key={admin._id}
                        className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-white"
                    >
                        <UserCircle className="w-16 h-16 text-yellow-400 mb-4" />
                        <h2 className="text-xl font-semibold">{admin.username}</h2>
                        <p>
                            {profileInfo?.email === admin.email && (
                                <span className="text-green-400 font-semibold">Current Logged-in Admin</span>
                            )}
                        </p>
                        <p className="text-gray-400">{admin.email}</p>
                        <p className="text-gray-400 text-sm mt-2">
                            Joined: {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminsPage;
