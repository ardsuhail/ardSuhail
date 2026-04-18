// component/QueryCard.jsx
"use client";
import React, { useState } from 'react';
import { Mail, Clock, MessageCircle, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Check } from 'lucide-react';

const statusConfig = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
    replied: { label: "Replied", color: "bg-blue-100 text-blue-700", icon: MessageCircle },
    resolved: { label: "Resolved", color: "bg-green-100 text-green-700", icon: CheckCircle }
};

const QueryCard = ({ query, onReply, onStatusChange, replies = [] }) => {
    const [expanded, setExpanded] = useState(false);
    const [updating, setUpdating] = useState(false);
    const status = statusConfig[query.status] || statusConfig.pending;
    const StatusIcon = status.icon;
    
    const handleMarkResolved = async () => {
        if (updating) return;
        setUpdating(true);
        try {
            const response = await fetch('/api/admin/queries', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ queryId: query._id, status: 'resolved' })
            });
            const data = await response.json();
            if (data.success) {
                onStatusChange && onStatusChange(query._id, 'resolved');
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setUpdating(false);
        }
    };
    
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="font-semibold text-gray-800">{query.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${status.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {status.label}
                            </span>
                            {!query.isRead && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">New</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 break-all">{query.email}</p>
                    </div>
                    <div className="flex gap-2">
                        {query.status !== 'resolved' && (
                            <button
                                onClick={handleMarkResolved}
                                disabled={updating}
                                className="px-3 py-2 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-1"
                            >
                                {updating ? (
                                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Resolve
                                    </>
                                )}
                            </button>
                        )}
                        <button
                            onClick={() => onReply(query)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition"
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Message */}
            <div className="p-5">
                <p className={`text-gray-700 text-sm leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
                    {query.message}
                </p>
                {query.message.length > 200 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-600 text-sm mt-2 flex items-center gap-1 hover:text-blue-700"
                    >
                        {expanded ? (
                            <>Read less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                            <>Read more <ChevronDown className="w-4 h-4" /></>
                        )}
                    </button>
                )}
            </div>
            
            {/* Replies */}
            {replies.length > 0 && (
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-2">📌 Replies ({replies.length})</p>
                    {replies.map((reply, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 mb-2 last:mb-0">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Subject: {reply.replySubject}
                                    </p>
                                    <p className="text-sm text-gray-700">{reply.replyMessage}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        By: {reply.repliedBy}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                {new Date(reply.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Footer */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(query.createdAt).toLocaleString()}
                </div>
                {query.repliedAt && (
                    <div>Replied: {new Date(query.repliedAt).toLocaleDateString()}</div>
                )}
            </div>
        </div>
    );
};

export default QueryCard;