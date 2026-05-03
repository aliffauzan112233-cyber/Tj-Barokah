import React from "react";
import { getProducts, deleteProduct } from "@/app/actions";
import ProductManagement from "@/components/ProductManagement";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  ExternalLink, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2,
  TrendingUp,
  Box,
  Wallet
} from "lucide-react";

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#080c0a] text-white flex font-outfit">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0d1210] border-r border-white/5 flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center shadow-lg shadow-[#10b98122]">
            <span className="font-black text-xl">TJ</span>
          </div>
          <span className="font-bold text-xl tracking-tight">ADMIN PORTAL</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <SidebarLink icon={<Package size={20} />} label="Produk" />
          <SidebarLink icon={<ShoppingCart size={20} />} label="Pesanan" />
          <SidebarLink icon={<Users size={20} />} label="Pelanggan" />
          
          <div className="pt-10 pb-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Storefront</div>
          <SidebarLink icon={<ExternalLink size={20} />} label="Lihat Toko" href="/" />
          <SidebarLink icon={<LogOut size={20} />} label="Keluar" href="/login" className="text-red-400 hover:bg-red-400/5" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border border-white/10 flex items-center justify-center font-bold">A</div>
            <div>
              <div className="text-sm font-bold">Admin TJB</div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <ProductManagement initialProducts={products} />
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active = false, href = "#", className = "" }: { icon: React.ReactNode, label: string, active?: boolean, href?: string, className?: string }) {
  return (
    <a 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? "bg-[#10b981] text-white shadow-lg shadow-[#10b98122]" : "text-gray-400 hover:bg-white/5 hover:text-white"} ${className}`}
    >
      <span className={`${active ? "text-white" : "text-gray-500 group-hover:text-[#10b981]"} transition-colors`}>{icon}</span>
      <span className="font-bold text-sm">{label}</span>
    </a>
  );
}

function StatCard({ icon, label, value, trend, color = "text-[#10b981]" }: { icon: React.ReactNode, label: string, value: string, trend: string, color?: string }) {
  return (
    <div className="bg-[#0d1210] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">{trend}</span>
      </div>
      <div className="text-gray-500 text-sm font-bold">{label}</div>
      <div className="text-3xl font-black mt-1">{value}</div>
    </div>
  );
}
