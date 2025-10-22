"use client";

import Link from "next/link";
import { Settings, Users, UserPlus, Key, LayoutDashboard, Briefcase ,User2Icon} from "lucide-react";
import { useState,useEffect } from "react";
export default function AdminSettings() {
 const [token, setToken] = useState(null)
    useEffect(() => {
            const loginToken = localStorage.getItem("notlogin")
            setToken(loginToken)
            if (!loginToken) {
              router.push("/")
            }
          }, [token])
        
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Settings className="w-8 h-8 text-green-400" /> Admin Settings
      </h1>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 max-w-5xl">
        
        {/* Create New Admin */}
        <Link
          href="/admin/setting/create-new-admin"
          className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg transition flex flex-col items-center text-center"
        >
          <UserPlus className="w-10 h-10 mb-3 text-green-400" />
          <h2 className="text-xl font-semibold mb-1">Create New Admin</h2>
          <p className="text-gray-400 text-sm">
            Add new admin accounts for your dashboard access.
          </p>
        </Link>

        {/* Manage Admins */}
        <Link
          href="/admin/setting/manage-admins"
          className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg transition flex flex-col items-center text-center"
        >
          <Users className="w-10 h-10 mb-3 text-blue-400" />
          <h2 className="text-xl font-semibold mb-1">Manage Admins</h2>
          <p className="text-gray-400 text-sm">
            View, edit, or remove existing admin users.
          </p>
        </Link>

        {/* Change Password */}
        <Link
          href="/admin/setting/change-password"
          className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg transition flex flex-col items-center text-center"
        >
          <Key className="w-10 h-10 mb-3 text-yellow-400" />
          <h2 className="text-xl font-semibold mb-1">Change Password</h2>
          <p className="text-gray-400 text-sm">
            Update your login password for security.
          </p>
        </Link>

        <Link
          href="/admin/setting/profile"
          className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg transition flex flex-col items-center text-center"
        >
          <User2Icon className="w-10 h-10 mb-3 text-pink-400" />
          <h2 className="text-xl font-semibold mb-1">Profile</h2>
          <p className="text-gray-400 text-sm">
            Manage your profile  info.
          </p>
        </Link>
      </div>
    </div>
  );
}
