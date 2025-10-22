"use client";
import { Mail, LoaderCircle, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Message from "@/component/Message";
import ReplyModal from "@/component/ReplyToUser";
import QueryReplies from "@/component/QueryReplies";
const Page = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null)
  const [queries, setQueries] = useState([]);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [readMore, setReadMore] = useState({})
  const [reply, setReply] = useState([])


  
  const router = useRouter()
  useEffect(() => {
    setLoading(true);
    fetch("/api/contact")
    .then((res) => res.json())
      .then((data) => {
        setQueries(data.query || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    }, []);
    useEffect(() => {
      setLoading(true);
      fetch("/api/reply")
      .then((res) => res.json())
      .then((data) => {
        setReply(data.replies || []);
        // setLoading(false);
      })
      // .catch(() => setLoading(false));
    }, []);
    
    const toggleReadMore = (id) => {
     
      setReadMore((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    useEffect(() => {
    const loginToken = localStorage.getItem("notlogin")
    setToken(loginToken)
    if (!loginToken) {
      router.push("/")
    }
  }, [token])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white p-6">
      <ReplyModal
        isOpen={isReplyOpen}
        onClose={() => setIsReplyOpen(false)}
        userEmail={selectedQuery?.email || ""}
      />
      <Message isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} Usermessage={selectedQuery?.message || ""} />
      <div className="max-w-5xl mx-auto overflow-y-scroll h-[90vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📬 User Queries</h2>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoaderCircle className="animate-spin w-8 h-8 text-blue-500" />
            <span className="ml-3 text-gray-600 font-medium">Loading queries...</span>
          </div>
        ) : queries.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {queries.map((item, index) => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col">

                {/* Header: Name + Reply button */}
                <div className="flex items-center justify-between border-b pb-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 break-words">{item.name}</h3>
                  </div>
                  <button
                    className="ml-3 cursor-pointer px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap"
                    onClick={() => { setSelectedQuery(item); setIsReplyOpen(true); }}
                  >
                    Reply
                  </button>
                </div>

                {/* Email */}
                <p className="text-sm text-gray-600 break-words mb-3">
                  <span className="font-medium text-gray-800">Email:</span> {item.email}
                </p>

                {/* Message */}
                <p className={`text-gray-700 text-sm leading-relaxed break-words ${readMore[item._id] ? "line-clamp-none" : "line-clamp-2"}`}>
                  <span className="font-medium text-gray-800 mr-1 inline-block">Message:</span> {item.message}
                </p>

                {/* Read More Button */}
                <p
                  onClick={() => toggleReadMore(item._id)}
                  className="text-red-500 cursor-pointer mt-1 select-none text-sm"
                >
                  {readMore[item._id] ? "Read less" : "Read more"}
                </p>

                {/* View Replies Button */}
                <QueryReplies userEmail={item.email} />

                {/* Timestamp */}
                <div className="mt-4 flex items-center text-gray-400 text-xs">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(item.createdAt).toLocaleString()}
                </div>

              </div>

            ))}
          </div>

        ) : (
          <div className="text-center py-16 text-gray-500">
            <Mail className="mx-auto w-10 h-10 text-gray-400 mb-3" />
            <p className="text-lg font-medium">No queries yet.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
