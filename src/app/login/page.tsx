"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate auth check — replace with real server action if needed
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        router.push("/admin");
      } else {
        setError("Username atau password salah. Silakan coba lagi.");
        setLoading(false);
      }
    }, 900);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Blobs */}
      <div className="blob w-[500px] h-[500px] bg-primary top-[-200px] right-[-200px]" />
      <div className="blob w-[500px] h-[500px] bg-gold bottom-[-200px] left-[-200px]" />

      {/* Grid bg */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center font-black text-white text-2xl shadow-2xl shadow-green-900/40 group-hover:scale-105 transition-transform animate-pulse-glow">
              TJ
            </div>
            <div>
              <div className="font-black text-2xl tracking-tight text-white">TRISNO JAYA</div>
              <div className="text-gold text-[10px] font-black tracking-[0.3em] uppercase">Barokah</div>
            </div>
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">
            Admin <span className="text-grad">Login</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Portal Manajemen Trisno Jaya Barokah
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-10 animate-slide-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 rounded-2xl p-4 text-sm font-bold" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                <i className="fas fa-triangle-exclamation" /> {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="form-label">Username</label>
              <div className="relative">
                <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted)" }} />
                <input
                  id="username"
                  type="text"
                  className="form-input pl-12"
                  placeholder="Masukkan username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="form-label m-0">Password</label>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest transition-colors hover:text-white" style={{ color: "var(--gold)" }}>Lupa sandi?</a>
              </div>
              <div className="relative">
                <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted)" }} />
                <input
                  id="password"
                  type="password"
                  className="form-input pl-12"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-4 text-base font-black uppercase tracking-widest mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin" /> Memverifikasi...
                </>
              ) : (
                <>
                  <i className="fas fa-right-to-bracket" /> Masuk ke Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 flex flex-col items-center gap-4" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              <i className="fas fa-shield-halved" /> Secure Encrypted Connection
            </div>
            <Link href="/" className="text-xs font-bold transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
              <i className="fas fa-arrow-left mr-2" />Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
