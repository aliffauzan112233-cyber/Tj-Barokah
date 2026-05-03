"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate login for now, will connect to server action later
    try {
        // We will implement the actual login logic in a server action
        if (username === "admin" && password === "admin") {
            router.push("/admin");
        } else {
            setError("Username atau password salah.");
        }
    } catch (err) {
        setError("Terjadi kesalahan saat login.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] flex items-center justify-center p-4 font-outfit text-white relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#10b98122] blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#f59e0b22] blur-[120px] rounded-full"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#1a1f1d]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center shadow-lg shadow-[#10b98144] mb-4">
              <Lock className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Admin <span className="text-[#10b981]">Login</span></h1>
            <p className="text-gray-400 mt-2 text-center">Silakan masuk untuk mengelola Trisno Jaya Barokah</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#10b981] transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-[#10b981] focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#10b981] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-[#10b981] focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#10b98133] flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
              &larr; Kembali ke Beranda
            </a>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-600 text-sm">
          &copy; 2024 Trisno Jaya Barokah. All rights reserved.
        </p>
      </div>
    </div>
  );
}
