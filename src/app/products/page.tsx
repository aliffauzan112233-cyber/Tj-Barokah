import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProducts } from "@/app/actions";
import Link from "next/link";

const categories = [
  { id: "all", label: "Semua Produk", icon: "fa-th-large" },
  { id: "ayam-utuh", label: "Ayam Utuh", icon: "fa-drumstick-bite" },
  { id: "ayam-potong", label: "Ayam Potong", icon: "fa-utensils" },
  { id: "telur", label: "Telur Segar", icon: "fa-egg" },
];

// Map DB products to a category label
function categorize(name: string) {
  const n = name.toLowerCase();
  if (n.includes("telur")) return "telur";
  if (n.includes("fillet") || n.includes("potong") || n.includes("paha") || n.includes("sayap")) return "ayam-potong";
  return "ayam-utuh";
}

export default async function ProductsPage() {
  const dbProducts = await getProducts();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ────── HEADER ────── */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
        <div className="blob w-96 h-96 bg-primary top-[-150px] left-[-150px]" />
        <div className="blob w-96 h-96 bg-gold top-[-150px] right-[-150px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="section-label"><i className="fas fa-basket-shopping mr-2" />Katalog Lengkap</p>
          <h1 className="section-title text-5xl md:text-6xl">
            Semua <span className="text-grad">Produk Kami</span>
          </h1>
          <p className="section-sub">
            Ayam utuh, potongan pilihan, hingga telur segar — semua tersedia dengan kualitas terjamin dan harga terjangkau.
          </p>
        </div>
      </section>

      {/* ────── CATEGORY PILLS ────── */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm cursor-pointer transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              <i className={`fas ${c.icon} text-primary-light`} />
              {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* ────── PRODUCT GRID ────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* Ayam Utuh */}
        <CategorySection
          title="Ayam Utuh"
          icon="fa-drumstick-bite"
          products={dbProducts.filter((p) => categorize(p.name) === "ayam-utuh")}
          fallbackImg="/img/ayam1.jpg"
        />

        {/* Ayam Potong */}
        <CategorySection
          title="Ayam Potong"
          icon="fa-utensils"
          products={dbProducts.filter((p) => categorize(p.name) === "ayam-potong")}
          fallbackImg="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80"
        />

        {/* Telur */}
        <CategorySection
          title="Telur Segar"
          icon="fa-egg"
          products={dbProducts.filter((p) => categorize(p.name) === "telur")}
          fallbackImg="https://images.unsplash.com/photo-1516733978644-10ef0c0ceaf6?auto=format&fit=crop&w=800&q=80"
        />

        {/* If DB is empty, show static cards */}
        {dbProducts.length === 0 && (
          <div className="text-center py-24 text-sm font-bold" style={{ color: "var(--muted)" }}>
            <i className="fas fa-box-open text-4xl mb-4 block" />
            Belum ada produk. Silakan tambah produk di panel admin.
          </div>
        )}
      </section>

      {/* ────── CTA ────── */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center rounded-3xl">
          <h2 className="text-3xl font-black mb-4">Tidak Menemukan yang Anda Cari?</h2>
          <p className="mb-8 text-sm" style={{ color: "var(--muted)" }}>
            Hubungi kami langsung via WhatsApp. Kami siap melayani permintaan khusus, pemesanan partai besar, dan konsultasi produk.
          </p>
          <Link href="https://wa.me/6285229608785" target="_blank" className="btn-primary text-base px-10 py-4 font-black">
            <i className="fab fa-whatsapp text-lg" /> Chat Sekarang
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CategorySection({
  title,
  icon,
  products,
  fallbackImg,
}: {
  title: string;
  icon: string;
  products: any[];
  fallbackImg: string;
}) {
  if (products.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.2)", color: "var(--primary-light)" }}>
          <i className={`fas ${icon}`} />
        </div>
        <h2 className="text-2xl font-black">{title}</h2>
        <span className="badge-green">{products.length} Produk</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="glass-card overflow-hidden hover-lift group">
            <div className="relative h-44 overflow-hidden">
              <img
                src={p.imageUrl || fallbackImg}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
              />
              <div className="absolute top-3 left-3">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${p.stock > 0 ? "badge-green" : "badge-gold"}`}>
                  {p.stock > 0 ? "Tersedia" : "Habis"}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-black text-base mb-3 leading-tight group-hover:text-primary-light transition-colors">{p.name}</h3>
              {p.description && (
                <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: "var(--muted)" }}>{p.description}</p>
              )}
              <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="font-black text-primary-light">Rp {Number(p.price).toLocaleString("id-ID")}</span>
                <Link
                  href={`https://wa.me/6285229608785?text=Halo, saya ingin memesan ${encodeURIComponent(p.name)}`}
                  target="_blank"
                  className="text-xs font-black px-3 py-2 rounded-xl transition-all hover:bg-primary hover:text-white"
                  style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)", color: "var(--primary-light)" }}
                >
                  <i className="fab fa-whatsapp mr-1" />Pesan
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
