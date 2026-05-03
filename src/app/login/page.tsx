"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth delay for "premium" feel
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        router.push("/admin");
      } else {
        alert("Username atau password salah.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8 font-outfit relative overflow-hidden">
      {/* Ornaments */}
      <div className="bg-ornament w-[600px] h-[600px] bg-primary top-[-300px] right-[-300px]" />
      <div className="bg-ornament w-[600px] h-[600px] bg-secondary bottom-[-300px] left-[-300px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 font-black text-xl text-white">TJ</div>
            <div className="text-left">
              <span className="font-black text-xl block leading-none text-white uppercase tracking-tight">TRISNO JAYA</span>
              <span className="text-secondary text-[10px] font-bold tracking-[0.2em]">BAROKAH</span>
            </div>
          </Link>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Admin <span className="text-primary">Login</span></h2>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Portal Manajemen Dashboard</p>
        </div>

        <div className="glass-card rounded-[40px] p-10 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Username / Email</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="admin" 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-6 focus:outline-none focus:border-primary transition-all text-white font-bold"
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Password</label>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-white transition-colors">Lupa sandi?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-6 focus:outline-none focus:border-primary transition-all text-white font-bold"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-800 disabled:cursor-not-allowed py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-white shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-3 active:scale-95 group"
            >
              {loading ? "Authenticating..." : (
                <>
                  <span>Masuk Panel</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
              <ShieldCheck size={14} />
              <span>Secure Encrypted Portal</span>
            </div>
          </div>
        </div>

        <Link href="/" className="mt-10 text-gray-600 hover:text-white transition-colors font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2">
          ← Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
