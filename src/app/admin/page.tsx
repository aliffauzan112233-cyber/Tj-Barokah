"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Plus, 
  Trash2, 
  LogOut, 
  ExternalLink, 
  Search,
  Bell,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { getProducts, deleteProduct, addProduct } from "@/app/actions";
import Link from "next/link";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Hapus produk ini?")) {
      await deleteProduct(id);
      const data = await getProducts();
      setProducts(data);
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addProduct(formData);
    setIsModalOpen(false);
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <div className="flex min-h-screen bg-background text-white font-outfit">
      {/* Sidebar */}
      <aside className="w-72 glass border-r border-white/5 sticky top-0 h-screen p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 font-black">TJ</div>
          <div>
            <span className="font-black text-lg block leading-none">ADMIN</span>
            <span className="text-secondary text-[10px] font-bold tracking-widest">TJB PANEL</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active />
          <SidebarLink icon={<Package size={20} />} label="Produk Ayam" />
          <SidebarLink icon={<ShoppingCart size={20} />} label="Pesanan" />
          <SidebarLink icon={<Users size={20} />} label="Pelanggan" />
          <SidebarLink icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
          <Link href="/" className="flex items-center gap-4 text-gray-400 hover:text-secondary transition-colors font-bold text-sm">
            <ExternalLink size={18} /> Lihat Website
          </Link>
          <Link href="/login" className="flex items-center gap-4 text-gray-400 hover:text-red-500 transition-colors font-bold text-sm">
            <LogOut size={18} /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">Dashboard <span className="text-primary">Overview</span></h1>
            <p className="text-gray-500 font-bold text-sm">Kelola stok ayam dan telur secara real-time.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" placeholder="Cari produk..." className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <button className="bg-white/5 p-3 rounded-2xl border border-white/10 relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Stok" value={products.length} icon={<Package className="text-primary" />} change="+12%" />
          <StatCard label="Pesanan Baru" value="24" icon={<ShoppingCart className="text-secondary" />} change="+5" />
          <StatCard label="Revenue" value="Rp 12.4M" icon={<CheckCircle2 className="text-green-500" />} change="+8.2%" />
          <StatCard label="Alerts" value="2" icon={<AlertCircle className="text-red-500" />} change="Check stock" />
        </div>

        {/* Product List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[32px] p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black uppercase tracking-widest">Daftar Produk Unggulan</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              <Plus size={20} /> Tambah Produk
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
                  <th className="pb-4 font-black">Produk</th>
                  <th className="pb-4 font-black">Kategori</th>
                  <th className="pb-4 font-black">Harga</th>
                  <th className="pb-4 font-black">Stok</th>
                  <th className="pb-4 font-black text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest">Loading data...</td></tr>
                ) : products.map((product) => (
                  <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                          <img src={product.imageUrl || "/img/ayam1.jpg"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-black tracking-tight">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-6"><span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">Ayam Segar</span></td>
                    <td className="py-6 font-black text-primary">Rp {Number(product.price).toLocaleString()}</td>
                    <td className="py-6">
                      <span className={`flex items-center gap-2 font-bold text-xs ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass-card rounded-[40px] p-10 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tight">Tambah <span className="text-primary">Produk Ayam</span></h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">✕</button>
              </div>

              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nama Produk</label>
                  <input name="name" type="text" placeholder="Contoh: Ayam Kampung Utuh" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-bold" required />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Harga (Rp)</label>
                    <input name="price" type="number" placeholder="35000" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Stok</label>
                    <input name="stock" type="number" placeholder="100" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-bold" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">URL Gambar</label>
                  <input name="imageUrl" type="url" placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-bold text-xs" required />
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary-dark p-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all mt-6">
                  Simpan Produk
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarLink({ icon, label, active }: any) {
  return (
    <a href="#" className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
      {icon} <span>{label}</span>
    </a>
  );
}

function StatCard({ label, value, icon, change }: any) {
  return (
    <div className="glass-card p-6 rounded-[24px]">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
          {icon}
        </div>
        <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg uppercase">{change}</span>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <h3 className="text-2xl font-black tracking-tight">{value}</h3>
    </div>
  );
}
