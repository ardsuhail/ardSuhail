"use client";
import React, { useState, useEffect } from "react";
import { X,Clock } from "lucide-react";

const QueryReplies = ({ userEmail }) => {
  const [replies, setReplies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch replies for this email
  useEffect(() => {
    if (!userEmail) return;
    fetch("/api/reply")
      .then((res) => res.json())
      .then((data) => {
        const userReplies = (data.replies || []).filter(
          (r) => r.userEmail === userEmail
        );
        setReplies(userReplies);
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  return (
    <div className="mt-3">
      {replies.length > 0 && (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-2  bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            View {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
          </button>

          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white w-[90%] sm:w-[500px] max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-4">Replies</h2>

                {replies.map((r, index) => (
                  <div
                    key={index}
                    className="mb-3 p-3 bg-green-50 rounded-lg text-green-700 break-words"
                  >
                    <span className="font-medium">Reply:</span> {r.replyMessage}
                    <div className="mt-4 flex items-center text-gray-400 text-xs">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}

                {replies.length === 0 && (
                  <p className="text-gray-500 text-sm">No replies yet.</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QueryReplies;
