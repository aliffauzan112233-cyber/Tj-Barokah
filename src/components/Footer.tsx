import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <img src="/logo.png" alt="Trisno Jaya Barokah Logo" className="logo-img" style={{ marginBottom: "2rem", height: "60px", filter: "brightness(0) invert(1) contrast(1.2)", mixBlendMode: "screen" }} />
            <p>Supplier ayam potong segar terpercaya dengan jaminan kualitas terbaik dan 100% Halal. Melayani kebutuhan rumah tangga dan bisnis.</p>
            <div className="social-links">
              <Link href="#"><i className="fab fa-facebook-f"></i></Link>
              <Link href="#"><i className="fab fa-instagram"></i></Link>
              <Link href="#"><i className="fab fa-tiktok"></i></Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/#why-choose-us">Keunggulan</Link></li>
              <li><Link href="/products">Katalog Produk</Link></li>
              <li><Link href="/#about">Tentang Kami</Link></li>
              <li><Link href="/login" style={{ color: "var(--secondary)", fontWeight: 800 }}>Admin Login</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontak Kami</h4>
            <ul className="footer-contact">
              <li><i className="fas fa-map-marker-alt"></i> <span>Jatilawang, Tunjung, Kec. Jatilawang, Kabupaten Banyumas, Jawa Tengah 53174</span></li>
              <li><i className="fas fa-phone"></i> <span>+62 852-2960-8785</span></li>
              <li><i className="fas fa-envelope"></i> <span>tjbarokah@gmail.com</span></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Trisno Jaya Barokah.
        </div>
      </div>
    </footer>
  );
}
