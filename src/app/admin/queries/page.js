
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { LoaderCircle, Mail, Filter, RefreshCw, Inbox, CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';
import QueryCard from '@/component/QueryCard';
import ReplyModal from '@/component/ReplyModal';
 import QueryReplies from '@/component/QueryReplies';
const Page = () => {
    const [queries, setQueries] = useState([]);
    const [replies, setReplies] = useState({});
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [stats, setStats] = useState({});
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    
    // Fetch queries
    const fetchQueries = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/queries?status=${filter}`);
            const data = await res.json();
            
            if (data.success) {
                setQueries(data.data || []);
                setStats(data.counts || {});
            }
        } catch (error) {
            console.error("Error fetching queries:", error);
        } finally {
            setLoading(false);
        }
    }, [filter]);
    
    // Fetch replies for a query
    const fetchReplies = useCallback(async (queryId) => {
        try {
            const res = await fetch(`/api/admin/reply?queryId=${queryId}`);
            const data = await res.json();
            if (data.success) {
                setReplies(prev => ({ ...prev, [queryId]: data.data }));
            }
        } catch (error) {
            console.error("Error fetching replies:", error);
        }
    }, []);
    
    useEffect(() => {
        fetchQueries();
    }, [fetchQueries]);
    
    useEffect(() => {
        queries.forEach(query => {
            if (!replies[query._id]) {
                fetchReplies(query._id);
            }
        });
    }, [queries, fetchReplies, replies]);
    
    const handleReply = (query) => {
        setSelectedQuery(query);
        setIsReplyOpen(true);
    };
    
    const handleReplySent = () => {
        fetchQueries();
        if (selectedQuery) {
            fetchReplies(selectedQuery._id);
        }
    };
    
    const handleStatusChange = (queryId, newStatus) => {
        setQueries(prev => prev.map(q => 
            q._id === queryId ? { ...q, status: newStatus } : q
        ));
        fetchQueries(); // Refresh counts
    };
    
    const filters = [
        { key: 'all', label: 'All', icon: Inbox, count: stats?.total },
        { key: 'pending', label: 'Pending', icon: AlertCircle, count: stats?.pending, color: 'text-yellow-600' },
        { key: 'replied', label: 'Replied', icon: MessageCircle, count: stats?.replied, color: 'text-blue-600' },
        { key: 'resolved', label: 'Resolved', icon: CheckCircle, count: stats?.resolved, color: 'text-green-600' }
    ];
    
    const filteredQueries = queries.filter(q => {
        if (filter === 'all') return true;
        return q.status === filter;
    });
    
    return (
        <main className="min-h-screen mt-16 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <ReplyModal
                isOpen={isReplyOpen}
                onClose={() => {
                    setIsReplyOpen(false);
                    setSelectedQuery(null);
                }}
                query={selectedQuery}
                onReplySent={handleReplySent}
            />
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        📬 Query Management
                    </h1>
                    <p className="text-gray-500 mt-1">Manage and respond to user inquiries</p>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {filters.map(({ key, label, icon: Icon, count, color }) => (
                        <div
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`bg-white rounded-2xl p-4 shadow-sm border-2 cursor-pointer transition-all ${
                                filter === key ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <Icon className={`w-5 h-5 ${color || 'text-gray-500'}`} />
                                <span className="text-2xl font-bold text-gray-800">{count || 0}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{label}</p>
                        </div>
                    ))}
                </div>
                
                {/* Refresh Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={fetchQueries}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
                
                {/* Queries List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <LoaderCircle className="animate-spin w-12 h-12 text-blue-600 mb-4" />
                        <p className="text-gray-500">Loading queries...</p>
                    </div>
                ) : filteredQueries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl">
                        <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No queries found</h3>
                        <p className="text-gray-400">When users contact you, their messages will appear here.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredQueries.map(query => (
                            <QueryCard
                                key={query._id}
                                query={query}
                                onReply={handleReply}
                                onStatusChange={handleStatusChange}
                                replies={replies[query._id] || []}
                            />
                        ))}
                    </div>
                )}
                <QueryReplies 
                  userEmail={selectedQuery?.email || ""}    
                />
            </div>
        </main>
    );
};

export default Page;