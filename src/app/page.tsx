"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, CheckCircle2, Star, WhatsApp } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen font-outfit text-white">
      {/* Background Ornaments */}
      <div className="bg-ornament w-[500px] h-[500px] bg-primary top-[-250px] left-[-250px]" />
      <div className="bg-ornament w-[500px] h-[500px] bg-secondary bottom-[-250px] right-[-250px]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] glass border-b border-white/5 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-black text-xl">TJB</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none tracking-tight">TRISNO JAYA</span>
            <span className="text-secondary text-[10px] font-bold tracking-[0.2em]">BAROKAH</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
          <a href="#home" className="hover:text-primary transition-colors text-primary">Beranda</a>
          <a href="#products" className="hover:text-primary transition-colors">Produk</a>
          <a href="#about" className="hover:text-primary transition-colors">Tentang</a>
          <a href="#contact" className="hover:text-primary transition-colors">Kontak</a>
        </div>

        <Link href="https://wa.me/6285229608785" target="_blank" className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-primary/20">
          <i className="fab fa-whatsapp"></i>
          <span>Pesan Sekarang</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-20 px-8 flex flex-col items-center text-center">
        <motion.div 
          {...fadeInUp}
          className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-secondary mb-8"
        >
          ✨ Premium Poultry Supplier
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-6 max-w-4xl"
        >
          Kualitas Ayam Segar <span className="text-gradient">Terbaik & Higienis</span>
        </motion.h1>
        
        <motion.p 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
        >
          Menyediakan ayam potong kualitas premium untuk kebutuhan rumah tangga dan bisnis kuliner Anda dengan jaminan 100% Halal dan Segar.
        </motion.p>

        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#products" className="bg-secondary hover:bg-amber-600 px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-2 transition-all shadow-xl shadow-secondary/20">
            Lihat Katalog <ArrowRight size={20} />
          </a>
          <a href="#contact" className="bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-5 rounded-2xl font-bold text-lg transition-all backdrop-blur-md">
            Hubungi Kami
          </a>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">Pilihan Produk <span className="text-primary">Unggulan</span></h2>
            <p className="text-gray-400 text-lg">Daging ayam pilihan, dipotong segar setiap hari.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">Ayam Utuh</span>
            <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">Ayam Potong</span>
            <span className="bg-amber-500/10 text-amber-500 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">Telur Segar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard 
            title="Ayam Broiler Utuh" 
            price="Rp 35.000" 
            image="/img/ayam1.jpg" 
            category="Ayam Utuh"
            rating="4.9"
            badge="Best Seller"
          />
          <ProductCard 
            title="Fillet Dada Ayam" 
            price="Rp 55.000" 
            image="https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            category="Ayam Potong"
            rating="4.8"
          />
          <ProductCard 
            title="Telur Ayam Negeri" 
            price="Rp 28.000" 
            image="https://images.unsplash.com/photo-1516733978644-10ef0c0ceaf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            category="Telur"
            rating="5.0"
            badge="Paling Segar"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <h4 className="text-4xl font-black text-primary mb-2">10+</h4>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">Tahun Pengalaman</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-secondary mb-2">5K+</h4>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">Pelanggan Puas</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-primary mb-2">100%</h4>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">Jaminan Halal</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-secondary mb-2">24/7</h4>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">Layanan Pesan</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black">TJ</div>
              <span className="font-black text-xl tracking-tight">TRISNO JAYA</span>
            </div>
            <p className="text-gray-500 text-sm">Supplier ayam potong segar terpercaya untuk keluarga Indonesia. Higienis, Halal, dan Berkualitas.</p>
          </div>
          <div className="flex gap-12 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link href="/login" className="hover:text-secondary">Admin Login</Link>
            <a href="#contact" className="hover:text-primary">Bantuan</a>
            <a href="#" className="hover:text-primary">Kebijakan</a>
          </div>
        </div>
        <div className="text-center mt-20 text-xs text-gray-700 uppercase tracking-widest">
          &copy; 2024 Trisno Jaya Barokah. Crafted with Premium Quality.
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ title, price, image, category, rating, badge }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card rounded-[32px] overflow-hidden group p-2"
    >
      <div className="relative h-[250px] rounded-[24px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">{category}</span>
          {badge && <span className="bg-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-secondary/20">{badge}</span>}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-secondary mb-2 text-sm">
          <Star size={14} fill="currentColor" />
          <span className="font-black">{rating}</span>
          <span className="text-gray-600 text-[10px] ml-2 font-bold uppercase tracking-widest">Verified quality</span>
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
          <span className="text-2xl font-black text-primary">{price}</span>
          <button className="bg-white/5 hover:bg-primary hover:text-white p-3 rounded-2xl transition-all group-hover:shadow-lg group-hover:shadow-primary/20">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
