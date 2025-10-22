"use client";
import React, { useState, useEffect } from "react";
import { UserCircle } from "lucide-react";

const AdminProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  if (!profileInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl text-red-400">Profile not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md text-white">
        <div className="flex flex-col items-center mb-6">
          <UserCircle className="w-16 h-16 text-yellow-400 mb-2" />
          <h1 className="text-3xl font-bold">{profileInfo.username}</h1>
          <p className="text-gray-400 mt-1">{profileInfo.email}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Admin Details</h2>
          <div className="bg-gray-700 rounded-lg p-4 space-y-2">
            <p>
              <span className="font-semibold">Username:</span> {profileInfo.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {profileInfo.email}
            </p>
            <p>
              <span className="font-semibold">Joined At:</span>{" "}
              {new Date(profileInfo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
