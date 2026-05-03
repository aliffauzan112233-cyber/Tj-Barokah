"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Produk" },
  { href: "/#about", label: "Tentang Kami" },
  { href: "/#contact", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "py-3" : "py-5"}`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-white text-base shadow-lg shadow-green-900/40 group-hover:scale-105 transition-transform">
          TJ
        </div>
        <div className="leading-none">
          <div className="font-black text-white text-base tracking-tight">TRISNO JAYA</div>
          <div className="text-gold text-[9px] font-black tracking-[0.25em] uppercase">Barokah</div>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`transition-colors hover:text-primary-light ${
              pathname === l.href ? "text-primary-light" : "text-white/50"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="https://wa.me/6285229608785"
          target="_blank"
          className="btn-primary text-sm"
        >
          <i className="fab fa-whatsapp text-base" /> Pesan via WhatsApp
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setOpen(!open)}
      >
        <i className={`fas ${open ? "fa-times" : "fa-bars"} text-xl`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 glass border-t border-white/5 p-6 flex flex-col gap-4 md:hidden z-50">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-bold text-sm uppercase tracking-widest text-white/70 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="https://wa.me/6285229608785"
            target="_blank"
            className="btn-primary text-sm w-full justify-center"
          >
            <i className="fab fa-whatsapp" /> Pesan Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
