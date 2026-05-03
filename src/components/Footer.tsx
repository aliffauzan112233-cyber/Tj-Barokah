import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-white text-base shadow-lg">TJ</div>
              <div>
                <div className="font-black text-white text-base tracking-tight">TRISNO JAYA</div>
                <div className="text-gold text-[9px] font-black tracking-[0.25em]">BAROKAH</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Supplier ayam potong segar, higienis, dan halal terpercaya. Melayani kebutuhan rumah tangga dan bisnis kuliner di Banyumas dan sekitarnya.
            </p>
            <div className="flex gap-4 mt-6">
              {["instagram", "facebook", "tiktok"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-primary/20 hover:text-primary-light" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  <i className={`fab fa-${s} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] mb-5" style={{ color: "var(--primary-light)" }}>Navigasi</h4>
            <ul className="space-y-3 text-sm font-bold" style={{ color: "var(--muted)" }}>
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Katalog Produk</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Kontak</Link></li>
              <li><Link href="/login" className="hover:text-gold transition-colors" style={{ color: "var(--gold)" }}>Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] mb-5" style={{ color: "var(--primary-light)" }}>Hubungi Kami</h4>
            <ul className="space-y-4 text-sm font-bold" style={{ color: "var(--muted)" }}>
              <li className="flex items-center gap-3">
                <i className="fab fa-whatsapp text-green-500 text-base w-5" />
                <span>+62 852-2960-8785</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-clock text-gold text-sm w-5" />
                <span>05:00 – 17:00 WIB</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-red-500 text-sm w-5" />
                <span>Jatilawang, Banyumas, Jawa Tengah</span>
              </li>
            </ul>
            <Link
              href="https://wa.me/6285229608785"
              target="_blank"
              className="btn-primary text-xs mt-6 w-full justify-center"
            >
              <i className="fab fa-whatsapp" /> Chat WhatsApp
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          <span>&copy; 2024 Trisno Jaya Barokah. All Rights Reserved.</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>Higienis · Halal · Terpercaya</span>
        </div>
      </div>
    </footer>
  );
}
