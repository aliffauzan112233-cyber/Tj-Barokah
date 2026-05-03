"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ customers: 0, partners: 0 });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      offset: 100,
    });

    // Counter Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
  }, [hasAnimated]);

  const animateCounters = () => {
    const targetCustomers = 500;
    const targetPartners = 100;
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts({
        customers: Math.ceil((targetCustomers / steps) * currentStep),
        partners: Math.ceil((targetPartners / steps) * currentStep),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts({ customers: targetCustomers, partners: targetPartners });
      }
    }, interval);
  };

  return (
    <>
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content" data-aos="fade-up">
          <span className="sub-title" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            Ayam Potong Trisno Jaya
          </span>
          <h1>Ayam Segar <span>Halal</span> & Kualitas Terjamin</h1>
          <p>Trisno Jaya Barokah menghadirkan daging ayam pilihan yang diproses secara higienis, segar setiap hari langsung untuk meja makan Anda.</p>
          <div className="hero-btns">
            <Link href="#products" className="btn-order">Lihat Katalog <i className="fas fa-shopping-basket"></i></Link>
            <Link href="https://wa.me/6285229608785" className="btn-order btn-secondary-custom">
              Hubungi Kami <i className="fab fa-whatsapp"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-choose-us">
        <div className="container">
          <div className="side-wrapper">
            <div className="side-text" data-aos="fade-right">
              <span className="sub-title">Keunggulan Kami</span>
              <h2>Kualitas Terjamin & Higienis Setiap Hari</h2>
              <p>Kami memastikan setiap potong ayam yang Anda terima adalah yang terbaik dari peternakan pilihan dengan standar kualitas yang ketat.</p>
              
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-certificate"></i></div>
                  <div className="feature-content">
                    <h4>100% Halal</h4>
                    <p>Seluruh proses pemotongan dan penanganan sesuai dengan syariat Islam.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-snowflake"></i></div>
                  <div className="feature-content">
                    <h4>Selalu Segar</h4>
                    <p>Ayam dipotong baru setiap hari untuk menjaga tekstur dan rasa alami.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-shield-virus"></i></div>
                  <div className="feature-content">
                    <h4>Sangat Higienis</h4>
                    <p>Area pemrosesan steril dengan standar kebersihan yang sangat tinggi.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="side-image" data-aos="fade-left">
              <img src="https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Keunggulan Trisno Jaya" />
              <div className="image-overlay-card">
                <i className="fas fa-award" style={{ color: "var(--secondary)", fontSize: "2rem", marginBottom: "10px" }}></i>
                <p style={{ fontWeight: 700, color: "var(--primary)" }}>Terpercaya Sejak 2014</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="sub-title">Katalog Produk</span>
            <h2>Pilihan Produk <span>Terbaik</span></h2>
            <p>Ayam segar berkualitas tinggi, diproses secara higienis untuk memenuhi kebutuhan gizi keluarga Anda.</p>
          </div>

          <div className="product-grid">
            {/* Product 1 */}
            <div className="product-card" data-aos="fade-up">
              <div className="product-badge">Terlaris</div>
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Ayam Broiler Utuh" />
              </div>
              <div className="product-body">
                <h3>Ayam Broiler Utuh</h3>
                <p className="product-price">Rp 35.000 <span>/ Ekor</span></p>
                <p>Daging ayam utuh pilihan dengan tekstur lembut, segar langsung dari pemotongan.</p>
                <Link href="https://wa.me/6285229608785?text=Halo%20Trisno%20Jaya%20Barokah,%20saya%20ingin%20pesan%20Ayam%20Broiler%20Utuh" target="_blank" className="btn-order btn-product">
                  <i className="fab fa-whatsapp"></i> Pesan Sekarang
                </Link>
              </div>
            </div>
            {/* Product 2 */}
            <div className="product-card" data-aos="fade-up" data-aos-delay="100">
              <div className="product-badge">Favorit</div>
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fillet Dada Ayam" />
              </div>
              <div className="product-body">
                <h3>Fillet Dada Ayam</h3>
                <p className="product-price">Rp 55.000 <span>/ Kg</span></p>
                <p>Daging dada murni tanpa tulang dan kulit, sangat praktis untuk olahan sehat Anda.</p>
                <Link href="https://wa.me/6285229608785?text=Halo%20Trisno%20Jaya%20Barokah,%20saya%20ingin%20pesan%20Fillet%20Dada%20Ayam" target="_blank" className="btn-order btn-product">
                  <i className="fab fa-whatsapp"></i> Pesan Sekarang
                </Link>
              </div>
            </div>
            {/* Product 3 */}
            <div className="product-card" data-aos="fade-up" data-aos-delay="200">
              <div className="product-badge">Pilihan</div>
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Paha Ayam" />
              </div>
              <div className="product-body">
                <h3>Paha Ayam </h3>
                <p className="product-price">Rp 40.000 <span>/ Kg</span></p>
                <p>Bagian paha bawah (drumstick) yang juicy, cocok untuk digoreng atau dibakar.</p>
                <Link href="https://wa.me/6285229608785?text=Halo%20Trisno%20Jaya%20Barokah,%20saya%20ingin%20pesan%20Paha%20Ayam" target="_blank" className="btn-order btn-product">
                  <i className="fab fa-whatsapp"></i> Pesan Sekarang
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-order">Lihat Semua Produk <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="side-wrapper reverse">
            <div className="about-visual" data-aos="fade-right">
              <div className="main-img-wrapper">
                <img src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Ayam Segar Trisno Jaya" className="about-main-img" />
                <div className="experience-badge">
                  <span className="exp-number">10+</span>
                  <span className="exp-text">Tahun<br/>Pengalaman</span>
                </div>
              </div>
              <div className="secondary-img-wrapper">
                <img src="https://images.unsplash.com/photo-1610411802554-1a93b32c6957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Proses Higienis" />
              </div>
            </div>
            <div className="side-text" data-aos="fade-left">
              <span className="sub-title">Tentang Kami</span>
              <h2>Lebih Dari Sekedar <span>Supplier Ayam</span></h2>
              <p>Berawal dari komitmen keluarga untuk menyediakan bahan pangan berkualitas, Trisno Jaya Barokah telah tumbuh menjadi mitra utama bagi ribuan keluarga dan pelaku bisnis kuliner di Banyumas dan sekitarnya.</p>
              <p>Kami memahami bahwa kualitas hidangan Anda dimulai dari kualitas bahan bakunya. Oleh karena itu, kami menjaga setiap detail proses dari hulu ke hilir untuk memastikan standar kesegaran tertinggi.</p>
              
              <div className="vision-mission-grid">
                <div className="vm-item">
                  <div className="vm-icon"><i className="fas fa-eye"></i></div>
                  <div className="vm-content">
                    <h4>Visi Kami</h4>
                    <p>Menjadi supplier ayam potong terbaik yang mengedepankan kualitas, kehalalan, dan kepercayaan pelanggan.</p>
                  </div>
                </div>
                <div className="vm-item">
                  <div className="vm-icon"><i className="fas fa-bullseye"></i></div>
                  <div className="vm-content">
                    <h4>Misi Kami</h4>
                    <p>Menyediakan produk ayam yang selalu segar, higienis, dan terjangkau dengan pelayanan yang ramah.</p>
                  </div>
                </div>
              </div>

              <div className="counter-container" ref={counterRef}>
                <div className="counter-item">
                  <div className="counter-icon"><i className="fas fa-users"></i></div>
                  <div className="counter-info">
                    <h3 className="count-num">{counts.customers}+</h3>
                    <p>Pelanggan Setia</p>
                  </div>
                </div>
                <div className="counter-item">
                  <div className="counter-icon"><i className="fas fa-truck-loading"></i></div>
                  <div className="counter-info">
                    <h3 className="count-num">{counts.partners}+</h3>
                    <p>Restoran Mitra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="side-wrapper">
            <div className="side-text" data-aos="fade-right">
              <span className="sub-title">Hubungi Kami</span>
              <h2>Siap Melayani Pesanan Anda</h2>
              <p>Punya pertanyaan atau ingin melakukan pemesanan khusus untuk acara Anda? Tim kami siap memberikan pelayanan terbaik.</p>
              
              <div className="contact-links">
                <Link href="https://wa.me/6285229608785" target="_blank" className="contact-link">
                  <i className="fab fa-whatsapp"></i>
                  <div>
                    <span>WhatsApp Admin</span>
                    <p>+62 852-2960-8785</p>
                  </div>
                </Link>
                <div className="contact-link" style={{ cursor: "default" }}>
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <span>Lokasi Kami</span>
                    <p>Jatilawang, Tunjung, Kec. Jatilawang, Kabupaten Banyumas, Jawa Tengah 53174</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-info-card" data-aos="fade-left">
              <h2>Jam Operasional</h2>
              <p>Kami melayani setiap hari untuk memastikan Anda mendapatkan ayam yang paling segar.</p>
              <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                <li style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span>Senin - Sabtu</span>
                  <span>05:00 - 17:00</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                  <span>Minggu</span>
                  <span>05:00 - 12:00</span>
                </li>
              </ul>
              <Link href="https://wa.me/6285229608785" target="_blank" className="btn-order" style={{ width: "100%", justifyContent: "center", background: "var(--secondary)" }}>
                Chat Sekarang <i className="fas fa-paper-plane"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container" data-aos="zoom-in">
          <h2>Dapatkan Ayam Segar Sekarang!</h2>
          <p>Pesan melalui WhatsApp dan nikmati kemudahan pengiriman langsung ke tempat Anda.</p>
          <Link href="https://wa.me/6285229608785" target="_blank" className="btn-order" style={{ background: "var(--white)", color: "var(--primary)", fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
            <i className="fab fa-whatsapp"></i> Pesan via WhatsApp
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
