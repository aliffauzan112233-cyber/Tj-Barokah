import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const features = [
  { icon: "fa-certificate", title: "100% Halal", desc: "Proses pemotongan sesuai syariat Islam dengan sertifikat Halal resmi dari MUI." },
  { icon: "fa-temperature-low", title: "Selalu Segar", desc: "Ayam dipotong setiap hari dan disimpan pada suhu optimal untuk menjaga kesegaran." },
  { icon: "fa-shield-halved", title: "Higienis & Bersih", desc: "Proses penanganan produk dengan standar kebersihan tinggi di setiap tahapan." },
  { icon: "fa-truck-fast", title: "Pengiriman Cepat", desc: "Layanan pengiriman ke seluruh Banyumas dan sekitarnya setiap hari kerja." },
];

const products = [
  {
    name: "Ayam Broiler Utuh",
    category: "Ayam Utuh",
    price: "Rp 35.000",
    unit: "/ Ekor",
    rating: "4.9",
    img: "/img/ayam1.jpg",
    badge: "Best Seller",
    badgeColor: "badge-gold",
  },
  {
    name: "Fillet Dada Ayam",
    category: "Ayam Potong",
    price: "Rp 55.000",
    unit: "/ Kg",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
    badge: "Favorit",
    badgeColor: "badge-green",
  },
  {
    name: "Telur Ayam Negeri",
    category: "Telur Segar",
    price: "Rp 28.000",
    unit: "/ Kg",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1516733978644-10ef0c0ceaf6?auto=format&fit=crop&w=800&q=80",
    badge: "Segar Setiap Hari",
    badgeColor: "badge-green",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ────── HERO ────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Blobs */}
        <div className="blob w-[600px] h-[600px] bg-primary top-[-200px] left-[-200px]" />
        <div className="blob w-[500px] h-[500px] bg-gold bottom-[-200px] right-[-200px]" />

        {/* Hero grid bg */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="badge-green mb-8 inline-block animate-slide-in">
            <i className="fas fa-certificate mr-2" />
            Premium Poultry Supplier — Banyumas
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white">
            Ayam Segar{" "}
            <span className="text-grad">Berkualitas&nbsp;Premium</span>
            <br />
            Langsung ke Pintu Anda
          </h1>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
            Menyediakan ayam broiler, ayam kampung, potongan pilihan, dan telur segar.
            Higienis, 100% Halal, dan siap diantar ke lokasi Anda.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products" className="btn-gold text-base px-10 py-4 font-black">
              <i className="fas fa-basket-shopping" /> Lihat Katalog Lengkap
            </Link>
            <Link href="https://wa.me/6285229608785" target="_blank" className="btn-ghost text-base px-10 py-4">
              <i className="fab fa-whatsapp text-green-500" /> Pesan via WhatsApp
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center mt-16 text-xs font-black uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            {["100% Halal MUI", "10+ Tahun Pengalaman", "5.000+ Pelanggan Puas", "Gratis Ongkir*"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <i className="fas fa-check-circle text-primary-light" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── STATS ────── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "10+", l: "Tahun Berpengalaman", icon: "fa-award", c: "text-primary-light" },
            { n: "5K+", l: "Pelanggan Puas", icon: "fa-users", c: "text-gold" },
            { n: "100%", l: "Bersertifikat Halal", icon: "fa-certificate", c: "text-primary-light" },
            { n: "Daily", l: "Pemotongan Segar", icon: "fa-calendar-check", c: "text-gold" },
          ].map((s) => (
            <div key={s.l} className="stat-card flex items-center gap-5 hover-lift">
              <div className={`text-3xl ${s.c}`}><i className={`fas ${s.icon}`} /></div>
              <div>
                <div className={`text-2xl font-black ${s.c}`}>{s.n}</div>
                <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: "var(--muted)" }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────── KEUNGGULAN ────── */}
      <section id="features" className="section max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label"><i className="fas fa-star mr-2" />Mengapa Memilih Kami</p>
          <h2 className="section-title">
            Standar Tertinggi untuk Setiap <span className="text-grad">Potongan Ayam</span>
          </h2>
          <p className="section-sub max-w-xl mx-auto">
            Kami tidak sekadar menjual ayam. Kami memastikan setiap produk memenuhi standar kualitas dan kebersihan terbaik.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-8 hover-lift text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto" style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)", color: "var(--primary-light)" }}>
                <i className={`fas ${f.icon}`} />
              </div>
              <h3 className="font-black text-lg mb-3">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ────── PRODUK UNGGULAN ────── */}
      <section id="products" className="section max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <p className="section-label"><i className="fas fa-basket-shopping mr-2" />Katalog Produk</p>
            <h2 className="section-title m-0">Pilihan <span className="text-grad">Produk Unggulan</span></h2>
          </div>
          <Link href="/products" className="btn-ghost text-sm">
            Lihat Semua Produk <i className="fas fa-arrow-right ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.name} className="glass-card overflow-hidden hover-lift group">
              <div className="relative h-56 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <span className={p.badgeColor}>{p.badge}</span>
                  <span className="badge-green">{p.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3 text-gold text-xs font-black">
                  <i className="fas fa-star" />
                  <span>{p.rating}</span>
                  <span className="font-bold ml-2" style={{ color: "var(--muted)" }}>Kualitas Terverifikasi</span>
                </div>
                <h3 className="font-black text-xl mb-4 group-hover:text-primary-light transition-colors">{p.name}</h3>
                <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <div>
                    <span className="font-black text-2xl text-primary-light">{p.price}</span>
                    <span className="text-xs ml-1 font-bold" style={{ color: "var(--muted)" }}>{p.unit}</span>
                  </div>
                  <Link href="https://wa.me/6285229608785" target="_blank" className="btn-primary text-xs px-4 py-2.5">
                    <i className="fab fa-whatsapp" /> Pesan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────── TENTANG KAMI ────── */}
      <section id="about" className="section max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80"
              alt="Peternakan Trisno Jaya Barokah"
              className="w-full rounded-3xl object-cover h-96 shadow-2xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl text-center shadow-xl">
              <div className="text-4xl font-black text-primary-light">10+</div>
              <div className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: "var(--muted)" }}>Tahun<br />Pengalaman</div>
            </div>
          </div>
          <div>
            <p className="section-label"><i className="fas fa-leaf mr-2" />Tentang Kami</p>
            <h2 className="section-title">Dedikasi Kami untuk <span className="text-grad">Keluarga Indonesia</span></h2>
            <p className="section-sub mb-6">
              Trisno Jaya Barokah hadir sebagai solusi kebutuhan protein hewani berkualitas tinggi bagi masyarakat Banyumas dan sekitarnya sejak lebih dari satu dekade.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              Kami percaya kesehatan berawal dari kualitas bahan pangan. Oleh karena itu, setiap produk kami melalui proses seleksi ketat, penanganan higienis, dan pemotongan sesuai syariat Islam.
            </p>
            <div className="flex gap-8 mb-8">
              {[{ n: "5.000+", l: "Pelanggan Puas" }, { n: "15+", l: "Mitra Bisnis" }].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-black text-primary-light">{s.n}</div>
                  <div className="text-xs font-black uppercase tracking-widest mt-1" style={{ color: "var(--muted)" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <Link href="https://wa.me/6285229608785" target="_blank" className="btn-primary">
              <i className="fab fa-whatsapp" /> Hubungi Kami Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* ────── KONTAK ────── */}
      <section id="contact" className="section max-w-6xl mx-auto">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="blob w-72 h-72 bg-primary top-[-100px] left-[-100px]" />
          <div className="blob w-72 h-72 bg-gold bottom-[-100px] right-[-100px]" />
          <div className="relative z-10">
            <p className="section-label"><i className="fas fa-phone mr-2" />Kontak Kami</p>
            <h2 className="section-title">Siap Melayani <span className="text-grad">Pesanan Anda</span></h2>
            <p className="section-sub max-w-xl mx-auto mb-10">
              Hubungi kami melalui WhatsApp untuk pemesanan, pertanyaan harga, atau pengiriman.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="https://wa.me/6285229608785" target="_blank" className="btn-gold text-base px-10 py-4 font-black">
                <i className="fab fa-whatsapp text-xl" /> Chat WhatsApp — 085229608785
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 justify-center mt-10 text-sm font-bold" style={{ color: "var(--muted)" }}>
              <div className="flex items-center gap-2"><i className="fas fa-clock text-gold" /> 05:00 – 17:00 WIB</div>
              <div className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-red-500" /> Jatilawang, Banyumas</div>
              <div className="flex items-center gap-2"><i className="fas fa-envelope text-primary-light" /> tjbarokah@gmail.com</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
