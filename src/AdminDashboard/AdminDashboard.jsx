import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import api from "../api/axios";
import {
    Mail, Phone, User, MessageSquare, Clock, Search, Filter,
    Eye, Trash2, CheckCircle, AlertCircle, XCircle, LogOut,
    Inbox, RefreshCw, X, ChevronDown, Menu,
    Calendar, Tag, Shield, Reply, Send, Check, Loader2
} from "lucide-react";


// ─── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    new: {
        label: "New",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10 border-cyan-400/30",
        icon: AlertCircle,
    },
    read: {
        label: "Read",
        color: "text-amber-400",
        bg: "bg-amber-400/10 border-amber-400/30",
        icon: Eye,
    },
    responded: {
        label: "Responded",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10 border-emerald-400/30",
        icon: CheckCircle,
    },
};

function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function timeAgo(iso) {
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, accent, sub }) {
    return (
        <div className="glass-admin p-6 rounded-2xl flex items-start gap-5 group hover:-translate-y-0.5 transition-all duration-300">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
                <Icon size={22} />
            </div>
            <div>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-1">{label}</p>
                <p className="text-3xl font-black text-white leading-none mb-1">{value}</p>
                {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
            </div>
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.read;
    const Icon = cfg.icon;
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.bg} ${cfg.color}`}
        >
            <Icon size={11} />
            {cfg.label}
        </span>
    );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ sub, onClose, onStatusChange, onDelete }) {
    if (!sub) return null;
    const statuses = ["new", "read", "responded"];
    const [isReplying, setIsReplying] = useState(false);
    const [replyDraft, setReplyDraft] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY);
    }, []);

    const handleSendReply = async () => {
        if (!replyDraft.trim()) return;
        setIsSending(true);

        if (!import.meta.env.VITE_EMAIL_SERVICE_ID || !import.meta.env.VITE_EMAIL_TEMPLATE_ID) {
            alert("EmailJS configuration missing. Please check your .env file and restart the server.");
            setIsSending(false);
            return;
        }

        try {
            const response = await emailjs.send(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                {
                    to_email: sub.email,
                    to_name: sub.name,
                    subject: "HPE IT SOLUTIONS | Response to Your Inquiry",
                    message: `Hello ${sub.name},

Thank you for reaching out to HPE IT Solutions.
Our team has reviewed your message and provided the response below:

${replyDraft}

If you require further information, please reply to this email.

Best Regards,
HPE IT Solutions Team`,
                }
            );

            console.log("Email sent successfully:", response.status, response.text);
            setIsSending(false);
            setShowSuccess(true);
            onStatusChange(sub, "responded");

            setTimeout(() => {
                setShowSuccess(false);
                setIsReplying(false);
                setReplyDraft("");
            }, 2000);
        } catch (error) {
            console.error("Email failed to send:", error);
            setIsSending(false);
            alert("Email failed to send");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                style={{ background: "linear-gradient(135deg,#0c1a2e 0%,#0a1628 100%)" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6 border-b border-white/8 shrink-0">
                    <div>
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-1">Submission Detail</p>
                        <h2 className="text-lg md:text-xl font-black text-white leading-tight">{sub.id}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                    {!isReplying ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InfoRow icon={User} label="Full Name" value={sub.name} />
                                <InfoRow icon={Mail} label="Email" value={sub.email} />
                                <InfoRow icon={Phone} label="Phone Number" value={sub.phone || "N/A"} />
                                <InfoRow icon={Calendar} label="Received" value={formatDate(sub.timestamp)} />
                                <InfoRow icon={Tag} label="Subject" value={sub.subject} span />
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 flex items-center gap-2 mb-3">
                                    <MessageSquare size={12} /> Message
                                </p>
                                <div className="p-4 md:p-5 rounded-xl bg-white/4 border border-white/8 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                    {sub.message}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-400">Compose Reply</p>
                                <button onClick={() => setIsReplying(false)} className="text-[10px] font-black uppercase text-slate-500 hover:text-white">Cancel</button>
                            </div>
                            <textarea
                                value={replyDraft}
                                onChange={(e) => setReplyDraft(e.target.value)}
                                placeholder="Write your professional response here..."
                                className="w-full flex-1 min-h-[160px] p-4 md:p-5 rounded-xl bg-white/4 border border-white/8 text-slate-300 text-sm outline-none focus:border-cyan-400/30 transition-all resize-none"
                                autoFocus
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 shrink-0 border-t border-white/8">
                        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                            {!isReplying && (
                                <>
                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500 mr-1">Status:</p>
                                    {statuses.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => onStatusChange(sub, s)}
                                            className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all duration-200 ${sub.status === s
                                                ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color}`
                                                : "border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300"
                                                }`}
                                        >
                                            {STATUS_CONFIG[s].label}
                                        </button>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {isReplying ? (
                                <button
                                    onClick={handleSendReply}
                                    disabled={isSending || showSuccess || !replyDraft.trim()}
                                    className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showSuccess
                                        ? "bg-emerald-500 text-white"
                                        : "bg-cyan-500 text-slate-900 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        }`}
                                >
                                    {isSending ? (
                                        <><RefreshCw size={14} className="animate-spin" /> Sending...</>
                                    ) : showSuccess ? (
                                        <><Check size={14} /> Sent</>
                                    ) : (
                                        <><Send size={14} /> Send Reply</>
                                    )}
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsReplying(true)}
                                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 text-xs font-bold uppercase tracking-wider transition-all"
                                    >
                                        <Reply size={13} /> Reply
                                    </button>
                                    <button
                                        onClick={() => { onDelete(sub); onClose(); }}
                                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold uppercase tracking-wider transition-all"
                                    >
                                        <Trash2 size={13} /> Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ icon: Icon, label, value, span }) {
    return (
        <div className={span ? "col-span-1 sm:col-span-2" : ""}>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 flex items-center gap-1.5 mb-1.5">
                <Icon size={11} /> {label}
            </p>
            <p className="text-white font-semibold text-sm break-all leading-tight">{value}</p>
        </div>
    );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminDashboard() {
    const navigate = useNavigate();

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSub, setSelectedSub] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showFilter, setShowFilter] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/contacts/all");
            // Map backend fields to frontend fields
            const mappedSubmissions = response.data.map(sub => ({
                id: `SUB-${String(sub.id).padStart(3, "0")}`,
                dbId: sub.id, // Keep numeric ID for deletion/update
                name: sub.name,
                email: sub.email,
                phone: sub.phone,
                subject: sub.category,
                message: sub.description,
                status: sub.status || "new",
                timestamp: sub.timestamp || new Date().toISOString(),
            }));

            setSubmissions(mappedSubmissions);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
            setSubmissions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    // ── Stats ──────────────────────────────────────────────────────────────────
    const total = submissions.length;
    const newCount = submissions.filter((s) => s.status === "new").length;
    const respondedCount = submissions.filter((s) => s.status === "responded").length;
    const todayCount = submissions.filter(
        (s) => new Date(s.timestamp).toDateString() === new Date().toDateString()
    ).length;

    // ── Filtered list ──────────────────────────────────────────────────────────
    const filtered = submissions
        .filter((s) => filterStatus === "all" || s.status === filterStatus)
        .filter(
            (s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleOpen = (sub) => {
        setSelectedSub(sub);
        if (sub.status === "new") handleStatusChange(sub, "read");
    };

    const handleStatusChange = async (sub, status) => {
        const subId = typeof sub === "object" ? sub.id : sub;
        const dbId = typeof sub === "object" ? sub.dbId : submissions.find(s => s.id === subId)?.dbId;

        // Optimistically update local state
        setSubmissions((prev) => prev.map((s) => (s.id === subId ? { ...s, status } : s)));
        setSelectedSub((prev) => (prev?.id === subId ? { ...prev, status } : prev));

        if (dbId) {
            try {
                await api.patch(`/api/contact/status/${dbId}`, { status });
            } catch (error) {
                console.error("Failed to update status on server:", error);
            }
        }
    };

    const handleDelete = async (sub) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this submission?");
        if (!confirmDelete) return;

        try {
            // Check if it's a backend submission or seed data
            if (sub.dbId) {
                await api.delete(`/api/contact/delete/${sub.dbId}`);
            }
            setSubmissions((prev) => prev.filter((s) => s.id !== sub.id));
            setSelectedSub(null);
        } catch (error) {
            console.error("Failed to delete submission:", error);
            alert("Failed to delete submission from server.");
        }
    };

    const handleRefresh = () => {
        fetchSubmissions();
    };

    const handleSignOut = () => {
        sessionStorage.removeItem("hpe_admin_auth");
        navigate("/admin/login", { replace: true });
    };

    return (
        <div className="min-h-screen text-slate-300 font-sans" style={{ background: "#070f1c" }}>
            {/* ── Sidebar (Desktop) ── */}
            <aside
                className="fixed top-0 left-0 h-screen w-64 border-r hidden lg:flex flex-col z-20 transition-all duration-300"
                style={{
                    borderColor: "rgba(255,255,255,0.07)",
                    background: "linear-gradient(180deg,#0a1628 0%,#070f1c 100%)",
                }}
            >
                <SidebarContent newCount={newCount} handleSignOut={handleSignOut} />
            </aside>

            {/* ── Sidebar (Mobile Overlay) ── */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${showMobileNav ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setShowMobileNav(false)}
            />
            <aside
                className={`fixed top-0 left-0 h-screen w-72 lg:hidden z-50 flex flex-col transition-transform duration-300 ease-out border-r border-white/10 ${showMobileNav ? "translate-x-0" : "-translate-x-full"}`}
                style={{ background: "linear-gradient(180deg,#0a1628 0%,#070f1c 100%)" }}
            >
                <div className="absolute right-4 top-4">
                    <button onClick={() => setShowMobileNav(false)} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                        <X size={18} />
                    </button>
                </div>
                <SidebarContent newCount={newCount} handleSignOut={handleSignOut} />
            </aside>

            {/* ── Main Content ── */}
            <main className="lg:ml-64 min-h-screen transition-all duration-300">
                {/* Top Bar */}
                <header
                    className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4"
                    style={{
                        background: "rgba(7,15,28,0.88)",
                        backdropFilter: "blur(12px)",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowMobileNav(true)}
                            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-base md:text-lg font-black text-white leading-tight">Submissions</h1>
                            <p className="text-slate-500 text-[10px] md:text-xs">{total} total &nbsp;·&nbsp; {newCount} unread</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            onClick={handleRefresh}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all bg-white/5"
                            title="Refresh"
                        >
                            <RefreshCw size={15} />
                        </button>
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Live</span>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8 space-y-6 md:space-y-8">
                    {/* ── Stats ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
                        <StatCard icon={Inbox} label="Total" value={total} accent="bg-blue-500/10 border border-blue-500/20 text-blue-400" sub="Requests" />
                        <StatCard icon={AlertCircle} label="Pending" value={newCount} accent="bg-cyan-400/10 border border-cyan-400/20 text-cyan-400" sub="Unread" />
                        <StatCard icon={CheckCircle} label="Responded" value={respondedCount} accent="bg-emerald-400/10 border border-emerald-400/20 text-emerald-400" sub="Resolved" />
                        <StatCard icon={Clock} label="Recent" value={todayCount} accent="bg-violet-400/10 border border-violet-400/20 text-violet-400" sub="Today" />
                    </div>

                    {/* ── Table ── */}
                    <div className="rounded-3xl overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {/* Search + Filter bar */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 p-4 md:p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="relative flex-1">
                                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search entries..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white placeholder:text-slate-600 text-sm outline-none transition-all bg-white/5 border border-white/10"
                                />
                            </div>

                            {/* Filter dropdown */}
                            <div className="relative flex gap-2">
                                <button
                                    onClick={() => setShowFilter((v) => !v)}
                                    className="flex-1 md:flex-initial flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-bold transition-all bg-white/5 border border-white/10"
                                >
                                    <div className="flex items-center gap-2">
                                        <Filter size={14} />
                                        {filterStatus === "all" ? "All Status" : STATUS_CONFIG[filterStatus]?.label}
                                    </div>
                                    <ChevronDown size={13} className={`transition-transform ${showFilter ? "rotate-180" : ""}`} />
                                </button>
                                {showFilter && (
                                    <div className="absolute right-0 top-full mt-2 w-full md:w-44 rounded-xl overflow-hidden z-30 shadow-2xl bg-[#0c1a2e] border border-white/10">
                                        {["all", "new", "read", "responded"].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => { setFilterStatus(s); setShowFilter(false); }}
                                                className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider transition-colors ${filterStatus === s ? "text-cyan-400 bg-cyan-400/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                {s === "all" ? "All Status" : STATUS_CONFIG[s]?.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Table body */}
                        {loading ? (
                            <div className="py-24 text-center text-slate-600">
                                <Loader2 size={40} className="mx-auto mb-4 opacity-40 animate-spin text-cyan-400" />
                                <p className="font-bold text-sm">Loading transmissions...</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="py-24 text-center text-slate-600">
                                <Inbox size={40} className="mx-auto mb-4 opacity-40" />
                                <p className="font-bold text-sm">No submissions found</p>
                            </div>
                        ) : (
                            <>
                                {/* Table body (Desktop) */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                                {["ID", "Name", "Email", "Subject", "Status", "Actions"].map((h) => (
                                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((sub) => (
                                                <tr
                                                    key={sub.id}
                                                    className="group cursor-pointer transition-colors hover:bg-white/[0.03]"
                                                    style={{
                                                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                                                        background: sub.status === "new" ? "rgba(0,229,255,0.025)" : undefined,
                                                    }}
                                                    onClick={() => handleOpen(sub)}
                                                >
                                                    <td className="px-5 py-4">
                                                        <span className="text-slate-500 font-mono text-xs">{sub.id}</span>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black text-cyan-400 shrink-0"
                                                                style={{ background: "linear-gradient(135deg,rgba(0,229,255,0.15),rgba(59,130,246,0.15))", border: "1px solid rgba(255,255,255,0.08)" }}>
                                                                {sub.name.charAt(0)}
                                                            </div>
                                                            <span className={`font-semibold ${sub.status === "new" ? "text-white" : "text-slate-300"}`}>
                                                                {sub.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-slate-400 text-xs truncate max-w-[150px]">{sub.email}</td>
                                                    <td className="px-5 py-4 max-w-[200px]">
                                                        <p className="truncate text-slate-300 font-medium">{sub.subject}</p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <StatusBadge status={sub.status} />
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={(e) => { e.stopPropagation(); handleOpen(sub); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-cyan-400 bg-cyan-400/10"><Eye size={13} /></button>
                                                            <button onClick={(e) => { e.stopPropagation(); handleDelete(sub); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 bg-red-400/10"><Trash2 size={13} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Card List (Mobile) */}
                                <div className="md:hidden divide-y divide-white/5">
                                    {filtered.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className={`p-5 space-y-3 cursor-pointer ${sub.status === "new" ? "bg-cyan-400/[0.03]" : ""}`}
                                            onClick={() => handleOpen(sub)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-mono text-slate-600">{sub.id}</span>
                                                <StatusBadge status={sub.status} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{sub.name}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{sub.email}</p>
                                            </div>
                                            <p className="text-xs text-slate-300 truncate font-medium">{sub.subject}</p>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-[10px] text-slate-600">{timeAgo(sub.timestamp)}</span>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={(e) => { e.stopPropagation(); handleOpen(sub); }} className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400"><Eye size={14} /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(sub); }} className="p-2 rounded-lg bg-red-400/10 text-red-400"><Trash2 size={14} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Footer */}
                        <div className="px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-2"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <p className="text-slate-600 text-[10px] font-bold">
                                Showing <span className="text-slate-400">{filtered.length}</span> of <span className="text-slate-400">{total}</span>
                            </p>
                            <p className="text-slate-600 text-[10px] font-bold tracking-wider">HPE-IT Admin System</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Detail Modal ── */}
            {selectedSub && (
                <DetailModal
                    sub={submissions.find((s) => s.id === selectedSub.id) ?? selectedSub}
                    onClose={() => setSelectedSub(null)}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
// ─── Shared Components ────────────────────────────────────────────────────────
function SidebarContent({ newCount, handleSignOut }) {
    return (
        <>
            {/* Logo */}
            <div className="px-8 pt-8 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-0"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, filter: "brightness(1.2) drop-shadow(0 0 15px rgba(0,229,255,0.4))" }}
                        className="relative group cursor-pointer"
                    >
                        <img
                            src="/HPE LOGO.png"
                            alt="HPE Logo"
                            className="w-32 h-auto drop-shadow-[0_0_8px_rgba(0,229,255,0.2)] transition-all duration-500"
                        />
                        <div className="absolute -inset-2 bg-cyan-400/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] text-nowrap -mt-2"
                        >
                            Admin Portal
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                {[
                    { icon: Inbox, label: "Submissions", active: true, badge: newCount },
                ].map(({ icon: Icon, label, active, badge }) => (
                    <button
                        key={label}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${active
                            ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                            : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                            }`}
                    >
                        <Icon size={18} />
                        {label}
                        {badge > 0 && (
                            <span className="ml-auto bg-cyan-400 text-[10px] font-black rounded-lg px-2 py-0.5"
                                style={{ color: "#0a1628" }}>
                                {badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Sign Out */}
            <div className="px-4 py-8 border-t border-white/5">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-slate-500 hover:text-red-400 text-sm font-bold transition-all duration-300 hover:bg-red-400/5 group"
                >
                    <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" /> Sign Out
                </button>
            </div>
        </>
    );
}
