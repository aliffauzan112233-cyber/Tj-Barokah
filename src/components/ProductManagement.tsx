"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Box, X, Loader2 } from "lucide-react";
import { deleteProduct, addProduct } from "@/app/actions";

export default function ProductManagement({ initialProducts }: { initialProducts: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      await deleteProduct(id);
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    await addProduct(formData);
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-[#080c0a]/80 backdrop-blur-md sticky top-0 z-10 py-4 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold">Manajemen <span className="text-[#10b981]">Produk</span></h1>
          <p className="text-gray-500 mt-1">Total {initialProducts.length} produk terdaftar.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#10b98122] transition-all transform active:scale-95"
        >
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      <div className="bg-[#0d1210] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-gray-500 text-xs font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {initialProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-800 overflow-hidden border border-white/10">
                        <img src={product.imageUrl || "/img/ayam1.jpg"} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">Ayam Segar</td>
                  <td className="px-6 py-4 font-bold text-[#10b981]">Rp {Number(product.price).toLocaleString()}</td>
                  <td className="px-6 py-4">{product.stock} pcs</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                      {product.stock > 0 ? "Tersedia" : "Habis"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-400/10 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {initialProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                       <Box size={40} className="opacity-20" />
                       <span>Tidak ada produk ditemukan.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d1210] border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold">Tambah Produk Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400 ml-1">Nama Produk</label>
                <input name="name" required placeholder="Contoh: Ayam Broiler Utuh" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#10b981]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400 ml-1">Harga (Rp)</label>
                  <input name="price" type="number" required placeholder="35000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#10b981]" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-400 ml-1">Stok</label>
                  <input name="stock" type="number" required placeholder="100" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#10b981]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-400 ml-1">URL Gambar</label>
                <input name="imageUrl" placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#10b981]" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-400 ml-1">Deskripsi</label>
                <textarea name="description" rows={3} placeholder="Deskripsi produk..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#10b981] resize-none"></textarea>
              </div>
              <div className="pt-4">
                <button 
                  disabled={isLoading}
                  type="submit" 
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Simpan Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
