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

function categorize(name: string) {
  const n = name.toLowerCase();
  if (n.includes("telur")) return "telur";
  if (n.includes("fillet") || n.includes("potong") || n.includes("paha") || n.includes("sayap")) return "ayam-potong";
  return "ayam-utuh";
}

export default async function ProductsPage() {
  const dbProducts = await getProducts();

  return (
    <div className="min-h-screen bg-light">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-36 pb-16 px-6 text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto" data-aos="fade-up">
          <span className="sub-title"><i className="fas fa-basket-shopping mr-2" /> Katalog Lengkap</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-primary mt-2">
            Semua <span className="text-secondary">Produk Kami</span>
          </h1>
          <p className="text-muted text-lg">
            Ayam utuh, potongan pilihan, hingga telur segar — semua tersedia dengan kualitas terjamin dan harga terjangkau.
          </p>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <div className="container mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm cursor-pointer transition-all"
              style={{
                background: "var(--white)",
                border: "1px solid var(--gray-200)",
                color: "var(--text-main)",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <i className={`fas ${c.icon} text-secondary`} />
              {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="container pb-24">
        {/* Ayam Utuh */}
        <CategorySection
          title="Ayam Utuh"
          icon="fa-drumstick-bite"
          products={dbProducts.filter((p: any) => categorize(p.name) === "ayam-utuh")}
          fallbackImg="https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        />

        {/* Ayam Potong */}
        <CategorySection
          title="Ayam Potong"
          icon="fa-utensils"
          products={dbProducts.filter((p: any) => categorize(p.name) === "ayam-potong")}
          fallbackImg="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80"
        />

        {/* Telur */}
        <CategorySection
          title="Telur Segar"
          icon="fa-egg"
          products={dbProducts.filter((p: any) => categorize(p.name) === "telur")}
          fallbackImg="https://images.unsplash.com/photo-1516733978644-10ef0c0ceaf6?auto=format&fit=crop&w=800&q=80"
        />

        {/* If DB is empty, show static cards */}
        {dbProducts.length === 0 && (
          <div className="text-center py-24 text-sm font-bold" style={{ color: "var(--text-muted)" }}>
            <i className="fas fa-box-open text-4xl mb-4 block" />
            Belum ada produk. Silakan tambah produk di panel admin.
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container" data-aos="zoom-in">
          <h2>Tidak Menemukan yang Anda Cari?</h2>
          <p>Hubungi kami langsung via WhatsApp. Kami siap melayani permintaan khusus, pemesanan partai besar, dan konsultasi produk.</p>
          <Link href="https://wa.me/6285229608785" target="_blank" className="btn-order" style={{ background: "var(--white)", color: "var(--primary)", fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
            <i className="fab fa-whatsapp"></i> Chat WhatsApp
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
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(217, 119, 6, 0.1)", color: "var(--secondary)", fontSize: "1.25rem" }}>
          <i className={`fas ${icon}`} />
        </div>
        <h2 className="text-2xl font-black text-primary">{title}</h2>
        <span className="product-badge" style={{ position: "relative", top: 0, left: 0, marginLeft: "10px" }}>{products.length} Produk</span>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card" data-aos="fade-up">
            <div className="product-badge" style={{ background: p.stock > 0 ? "var(--primary)" : "var(--gray-300)", color: p.stock > 0 ? "var(--white)" : "var(--text-main)" }}>
              {p.stock > 0 ? "Tersedia" : "Habis"}
            </div>
            <div className="product-image">
              <img src={p.imageUrl || fallbackImg} alt={p.name} />
            </div>
            <div className="product-body">
              <h3>{p.name}</h3>
              <p className="product-price">Rp {Number(p.price).toLocaleString("id-ID")} <span style={{ fontSize: "0.8rem" }}>/ item</span></p>
              {p.description && (
                <p className="mb-4" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</p>
              )}
              <Link href={`https://wa.me/6285229608785?text=Halo, saya ingin memesan ${encodeURIComponent(p.name)}`} target="_blank" className="btn-order btn-product">
                <i className="fab fa-whatsapp"></i> Pesan Sekarang
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
