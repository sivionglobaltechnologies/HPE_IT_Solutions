import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, User, AlertCircle, LogIn } from "lucide-react";

// ── Hardcoded credentials (replace with API call when backend is ready) ────────
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "hpe@admin2026";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [shakeKey, setShakeKey] = useState(0);

    // If already authenticated, redirect straight to dashboard
    useEffect(() => {
        if (sessionStorage.getItem("hpe_admin_auth") === "true") {
            navigate("/admin", { replace: true });
        }
        document.title = "Admin Login | HPE IT Solutions";
    }, [navigate]);

    const handleChange = (e) => {
        setError("");
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        // Simulate async auth check (swap with fetch() when backend ready)
        setTimeout(() => {
            if (
                form.username === ADMIN_USERNAME &&
                form.password === ADMIN_PASSWORD
            ) {
                sessionStorage.setItem("hpe_admin_auth", "true");
                navigate("/admin", { replace: true });
            } else {
                setError("Invalid username or password.");
                setShakeKey((k) => k + 1); // re-trigger shake animation
                setLoading(false);
            }
        }, 700);
    };

    return (
        <div className="admin-login-root min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* ── Animated background blobs ── */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            {/* ── Grid overlay ── */}
            <div className="grid-overlay" />

            {/* ── Card ── */}
            <div
                key={shakeKey}
                className={`login-card relative z-10 w-full max-w-md ${error ? "shake" : ""}`}
            >
                {/* Logo / Brand */}
                <div className="flex flex-col items-center mb-4">
                    {/* HPE Logo */}
                    <img
                        src="/HPE LOGO.png"
                        alt="HPE IT Solutions"
                        className="logo-animation mb-1"
                        style={{
                            height: "140px",
                            width: "auto",
                            display: "block",
                            filter: "drop-shadow(0 0 15px rgba(0,229,255,0.3))",
                        }}
                    />
                    <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                        Admin Portal
                    </p>
                    <div className="w-16 h-[1px] mt-1" style={{ background: "rgba(0,229,255,0.25)" }} />
                </div>

                <h2 className="text-white font-black text-xl mb-0.5 text-center">Sign In</h2>
                <p className="text-slate-500 text-[11px] text-center mb-6 tracking-wide">
                    Enter your credentials to continue.
                </p>

                {/* ── Error banner ── */}
                {error && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-bold mb-6">
                        <AlertCircle size={15} className="shrink-0" />
                        {error}
                    </div>
                )}

                {/* ── Form ── */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                id="admin-username"
                                type="text"
                                name="username"
                                autoComplete="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="login-input px-4"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="admin-password"
                                type={showPass ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="login-input px-4"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((v) => !v)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                aria-label="Toggle password visibility"
                            >
                                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        id="admin-login-btn"
                        type="submit"
                        disabled={loading}
                        className="login-btn"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-[#0a1628]/40 border-t-[#0a1628] rounded-full animate-spin mr-2" />
                                Processing…
                            </>
                        ) : (
                            <>
                                Sign In <LogIn size={15} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer note */}
                <p className="text-center text-slate-500 text-[9px] uppercase tracking-widest mt-6 font-bold opacity-40">
                    Secure · Private · HPE IT Group
                </p>
            </div>

            {/* ── Scoped styles ── */}
            <style>{`
        .admin-login-root {
          background: #070f1c;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* Background blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.18;
          animation: blobFloat 8s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #00e5ff 0%, transparent 70%);
          top: -150px; left: -100px;
          animation-duration: 10s;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
          bottom: -100px; right: -50px;
          animation-duration: 12s;
          animation-delay: -3s;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
          top: 30%; left: 60%;
          animation-duration: 15s;
          animation-delay: -5s;
          opacity: 0.12;
        }
        @keyframes blobFloat {
          from { transform: translate(0, 0) scale(1) rotate(0deg); }
          to   { transform: translate(40px, 30px) scale(1.1) rotate(5deg); }
        }

        /* Logo Animation */
        @keyframes logoFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .logo-animation {
          animation: logoFloat 4s ease-in-out infinite;
        }

        /* Grid overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* Card */
        .login-card {
          background: linear-gradient(135deg, rgba(10,22,40,0.7) 0%, rgba(7,15,28,0.85) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.5rem;
          padding: 2.25rem 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        /* Input */
        .login-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 0.625rem;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .login-input::placeholder { color: rgba(148,163,184,0.4); }
        .login-input:focus {
          border-color: rgba(0,229,255,0.5);
          background: rgba(0,229,255,0.03);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.08);
        }

        /* Button */
        .login-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.875rem;
          background: #00e5ff;
          color: #04111f;
          border: none;
          border-radius: 0.75rem;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: box-shadow 0.3s, transform 0.2s, opacity 0.2s;
          margin-top: 0.5rem;
        }
        .login-btn:hover:not(:disabled) {
          box-shadow: 0 16px 48px -10px rgba(0,229,255,0.45);
          transform: translateY(-2px);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Shake animation on error */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(8px); }
          45%       { transform: translateX(-5px); }
          60%       { transform: translateX(5px); }
          75%       { transform: translateX(-2px); }
          90%       { transform: translateX(2px); }
        }
        .shake { animation: shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
      `}</style>
        </div>
    );
}
