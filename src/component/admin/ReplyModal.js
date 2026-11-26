// component/ReplyModal.jsx
"use client";
import React, { useState } from 'react';
import { X, Send, LoaderCircle, Mail, User, Tag } from 'lucide-react';

const ReplyModal = ({ isOpen, onClose, query, onReplySent }) => {
    const [replyMessage, setReplyMessage] = useState('');
    const [replySubject, setReplySubject] = useState('Reply to your query');
    const [repliedBy, setRepliedBy] = useState('Admin');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    if (!isOpen) return null;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!replyMessage.trim()) {
            setError("Please enter a reply message");
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('/api/admin/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    queryId: query._id,
                    userEmail: query.email,
                    userName: query.name,
                    replyMessage: replyMessage.trim(),
                    replySubject: replySubject.trim(),
                    repliedBy: repliedBy.trim(),
                    originalMessage: query.message
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setReplyMessage('');
                setReplySubject('Reply to your query');
                setRepliedBy('Admin');
                onReplySent && onReplySent();
                onClose();
            } else {
                setError(data.message || "Failed to send reply");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-800">Reply to {query?.name}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Original Message */}
                <div className="p-5 bg-gray-50 border-b">
                    <p className="text-sm font-medium text-gray-600 mb-2">Original Message:</p>
                    <p className="text-gray-800 bg-white p-3 rounded-lg">{query?.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        From: {query?.email} | Received: {new Date(query?.createdAt).toLocaleString()}
                    </p>
                </div>
                
                {/* Reply Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Reply Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Tag className="w-4 h-4 inline mr-1" />
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={replySubject}
                            onChange={(e) => setReplySubject(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Enter reply subject..."
                            required
                        />
                    </div>
                    
                    {/* Replied By */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <User className="w-4 h-4 inline mr-1" />
                            Replied By <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={repliedBy}
                            onChange={(e) => setRepliedBy(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Your name or admin name..."
                            required
                        />
                    </div>
                    
                    {/* Reply Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Reply <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            rows="6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Write your reply here..."
                            required
                        />
                    </div>
                    
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="animate-spin w-5 h-5" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Send Reply
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReplyModal;