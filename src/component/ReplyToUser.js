"use client";
import React, { useState } from "react";
import { X, Send, LoaderCircle } from "lucide-react";

const ReplyModal = ({ isOpen, onClose, userEmail }) => {
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleReply = async (e) => {
    e.preventDefault()
    if (!replyText) {
      alert("Please type your reply before sending!");
      return;
    }

    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "userEmail": userEmail,
      "replyMessage": replyText
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/reply", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.success){
          setLoading(false)
          setReplyText("")
          alert(result.message)
        }
        console.log(result)

      })
      .catch((error) => {
        alert(error.message)
        console.error(error)
      });
  };



  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-slideDown">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reply to User</h2>

        <label className="block text-gray-700 font-medium mb-1">User Email</label>
        <input
          type="email"
          value={userEmail}
          readOnly
          className="w-full border rounded-lg px-4 py-2 mb-4 bg-gray-100 text-gray-700 cursor-not-allowed"
        />

        <label className="block text-gray-700 font-medium mb-1">Your Reply</label>
        <textarea
          rows="5"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply here..."
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleReply}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send /> Send Reply
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReplyModal;
