"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" className={isScrolled ? "scrolled" : ""}>
      <div className="container">
        <Link href="/" className="logo-container">
          <img src="/logo.png" alt="Trisno Jaya Barokah Logo" className="logo-img" />
        </Link>
        
        <nav id="nav-menu" className={isMobileMenuOpen ? "active" : ""}>
          <ul>
            <li><Link href={isHome ? "#home" : "/"} onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link></li>
            <li><Link href={isHome ? "#why-choose-us" : "/#why-choose-us"} onClick={() => setIsMobileMenuOpen(false)}>Keunggulan</Link></li>
            <li><Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>Produk</Link></li>
            <li><Link href={isHome ? "#about" : "/#about"} onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</Link></li>
            <li><Link href={isHome ? "#contact" : "/#contact"} onClick={() => setIsMobileMenuOpen(false)}>Kontak</Link></li>
          </ul>
        </nav>

        <div className="nav-btns">
          <Link href="https://wa.me/6285229608785" target="_blank" className="btn-order">
            <i className="fab fa-whatsapp"></i> <span>Pesan Sekarang</span>
          </Link>
          <div className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </div>
    </header>
  );
}
