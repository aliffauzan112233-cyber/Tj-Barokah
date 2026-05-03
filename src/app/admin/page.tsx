"use client";

import { useState, useEffect } from "react";
import { getProducts, deleteProduct, addProduct, updateProduct } from "@/app/actions";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  imageUrl: string | null;
  description: string | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
};

type ModalState =
  | { type: "closed" }
  | { type: "add" }
  | { type: "edit"; product: Product };

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ type: "closed" });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const reload = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => { reload(); }, []);

  const handleDelete = async (id: number) => {
    setDeleteId(id);
    await deleteProduct(id);
    setDeleteId(null);
    reload();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    if (modal.type === "edit") {
      await updateProduct(modal.product.id, formData);
    } else {
      await addProduct(formData);
    }
    setSaving(false);
    setModal({ type: "closed" });
    reload();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const inStock = products.filter((p) => p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      {/* ═══════════════════════════════
          SIDEBAR
      ══════════════════════════════ */}
      <aside style={{ background: "var(--white)", borderRight: "1px solid var(--gray-200)", padding: "2rem 1.25rem", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2.5rem" }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "12px",
            background: "var(--primary)", display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 900, color: "var(--white)",
            fontSize: "15px", boxShadow: "var(--shadow-sm)"
          }}>TJ</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: "13px", color: "var(--text-main)", letterSpacing: "-0.02em" }}>ADMIN PANEL</div>
            <div style={{ fontSize: "9px", fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--secondary)" }}>Trisno Jaya Barokah</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { icon: "fa-chart-line", label: "Dashboard", active: true },
            { icon: "fa-box-open", label: "Manajemen Produk", active: false },
            { icon: "fa-shopping-cart", label: "Pesanan", active: false },
            { icon: "fa-users", label: "Pelanggan", active: false },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.875rem", color: l.active ? "var(--primary)" : "var(--text-muted)", background: l.active ? "rgba(6, 78, 59, 0.1)" : "transparent", cursor: "pointer", transition: "var(--transition-fast)", border: l.active ? "1px solid rgba(6, 78, 59, 0.2)" : "1px solid transparent" }}>
              <i className={`fas ${l.icon}`} style={{ width: "18px", textAlign: "center" }} />
              <span>{l.label}</span>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid var(--gray-200)", display: "flex", flexDirection: "column", gap: "4px" }}>
          <Link href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.875rem", color: "var(--text-muted)", cursor: "pointer", textDecoration: "none" }}>
            <i className="fas fa-arrow-up-right-from-square" style={{ width: "18px", textAlign: "center", color: "var(--secondary)" }} />
            <span>Lihat Website</span>
          </Link>
          <Link href="/login" style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", borderRadius: "0.875rem", fontWeight: 700, fontSize: "0.875rem", color: "#ef4444", cursor: "pointer", textDecoration: "none" }}>
            <i className="fas fa-right-from-bracket" style={{ width: "18px", textAlign: "center" }} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* ═══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <main style={{ background: "var(--light)", padding: "2.5rem", overflowY: "auto", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.875rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "4px", color: "var(--text-main)" }}>
              Dashboard <span style={{ color: "var(--primary)" }}>Overview</span>
            </h1>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>
              Kelola semua produk ayam dan telur secara real-time.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <i className="fas fa-search" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "13px" }} />
            <input
              type="text"
              placeholder="Cari produk..."
              style={{ paddingLeft: "40px", width: "220px", paddingTop: "10px", paddingBottom: "10px", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--text-main)", outline: "none", fontSize: "0.875rem", fontWeight: 600 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <StatCard icon="fa-box-open" iconColor="var(--primary)" label="Total Produk" value={String(products.length)} />
          <StatCard icon="fa-cubes-stacked" iconColor="var(--secondary)" label="Total Stok" value={totalStock.toLocaleString("id-ID")} />
          <StatCard icon="fa-circle-check" iconColor="#10b981" label="Stok Tersedia" value={String(inStock)} />
          <StatCard icon="fa-circle-xmark" iconColor="#ef4444" label="Stok Habis" value={String(outOfStock)} />
        </div>

        {/* ── Product Table Card ── */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "1.25rem", padding: "2rem", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px", color: "var(--text-main)" }}>
                Daftar Produk
              </h2>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)" }}>
                {filtered.length} produk ditemukan
              </p>
            </div>
            <button
              className="btn-order"
              style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
              onClick={() => setModal({ type: "add" })}
            >
              <i className="fas fa-plus" /> Tambah Produk Baru
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", padding: "1rem 1.25rem", color: "var(--text-muted)", borderBottom: "1px solid var(--gray-200)" }}>Produk</th>
                  <th style={{ textAlign: "left", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", padding: "1rem 1.25rem", color: "var(--text-muted)", borderBottom: "1px solid var(--gray-200)" }}>Harga</th>
                  <th style={{ textAlign: "left", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", padding: "1rem 1.25rem", color: "var(--text-muted)", borderBottom: "1px solid var(--gray-200)" }}>Stok</th>
                  <th style={{ textAlign: "left", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", padding: "1rem 1.25rem", color: "var(--text-muted)", borderBottom: "1px solid var(--gray-200)" }}>Status</th>
                  <th style={{ textAlign: "right", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", padding: "1rem 1.25rem", color: "var(--text-muted)", borderBottom: "1px solid var(--gray-200)" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)", fontWeight: 700 }}>
                      <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "24px", color: "var(--primary)", display: "block", marginBottom: "12px" }} />
                      Memuat data dari database...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)", fontWeight: 700 }}>
                      <i className="fas fa-box-open" style={{ fontSize: "2rem", display: "block", marginBottom: "12px" }} />
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} style={{ transition: "background .15s" }}>
                      {/* Product info */}
                      <td style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--gray-100)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div style={{ width: "52px", height: "52px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--gray-200)", flexShrink: 0 }}>
                            <img
                              src={p.imageUrl || "/img/ayam1.jpg"}
                              alt={p.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e: any) => { e.target.src = "/img/ayam1.jpg"; }}
                            />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: "14px", marginBottom: "2px", color: "var(--text-main)" }}>{p.name}</div>
                            {p.description && (
                              <div style={{ fontSize: "12px", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
                                {p.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--gray-100)", color: "var(--primary)", fontWeight: 800, fontSize: "0.875rem" }}>
                        Rp {Number(p.price).toLocaleString("id-ID")}
                      </td>

                      {/* Stock */}
                      <td style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--gray-100)", fontWeight: 800, fontSize: "0.875rem", color: "var(--text-main)" }}>
                        {p.stock.toLocaleString("id-ID")}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--gray-100)" }}>
                        {p.stock > 10 ? (
                          <span style={{ display: "inline-block", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 10px", borderRadius: "999px", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)" }}>Tersedia</span>
                        ) : p.stock > 0 ? (
                          <span style={{ display: "inline-block", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 10px", borderRadius: "999px", background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.3)" }}>Stok Rendah</span>
                        ) : (
                          <span style={{ display: "inline-block", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 10px", borderRadius: "999px", background: "rgba(239, 68, 68, 0.15)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.3)" }}>Habis</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--gray-100)", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px" }}>
                          <button
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(6, 78, 59, 0.1)", color: "var(--primary)", fontWeight: 700, padding: "0.5rem 1rem", borderRadius: "0.75rem", border: "1px solid rgba(6, 78, 59, 0.2)", cursor: "pointer", fontSize: "0.75rem" }}
                            onClick={() => setModal({ type: "edit", product: p })}
                          >
                            <i className="fas fa-pen-to-square" /> Edit
                          </button>
                          <button
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontWeight: 700, padding: "0.5rem 1rem", borderRadius: "0.75rem", border: "1px solid rgba(239, 68, 68, 0.2)", cursor: "pointer", fontSize: "0.75rem" }}
                            onClick={() => handleDelete(p.id)}
                            disabled={deleteId === p.id}
                          >
                            {deleteId === p.id ? (
                              <i className="fas fa-circle-notch fa-spin" />
                            ) : (
                              <i className="fas fa-trash" />
                            )}
                            {" "}Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════
          MODAL (Add / Edit)
      ══════════════════════════════ */}
      {modal.type !== "closed" && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
          }}
        >
          {/* Backdrop */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setModal({ type: "closed" })}
          />

          {/* Card */}
          <div
            style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "520px", padding: "2.5rem", background: "var(--white)", borderRadius: "24px", boxShadow: "var(--shadow-xl)" }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, letterSpacing: "-0.02em", color: "var(--text-main)" }}>
                {modal.type === "edit" ? (
                  <>Edit <span style={{ color: "var(--primary)" }}>Produk</span></>
                ) : (
                  <>Tambah <span style={{ color: "var(--primary)" }}>Produk Baru</span></>
                )}
              </h3>
              <button
                onClick={() => setModal({ type: "closed" })}
                style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gray-100)", border: "1px solid var(--gray-200)", color: "var(--text-muted)", cursor: "pointer", fontSize: "16px" }}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Nama Produk *</label>
                  <input
                    name="name"
                    type="text"
                    style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                    placeholder="Contoh: Ayam Broiler Utuh 1 Ekor"
                    defaultValue={modal.type === "edit" ? modal.product.name : ""}
                    required
                  />
                </div>

                {/* Price + Stock */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Harga (Rp) *</label>
                    <input
                      name="price"
                      type="number"
                      style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                      placeholder="35000"
                      min="0"
                      defaultValue={modal.type === "edit" ? modal.product.price : ""}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Stok *</label>
                    <input
                      name="stock"
                      type="number"
                      style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                      placeholder="100"
                      min="0"
                      defaultValue={modal.type === "edit" ? modal.product.stock : ""}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Deskripsi</label>
                  <input
                    name="description"
                    type="text"
                    style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                    placeholder="Deskripsi singkat produk (opsional)"
                    defaultValue={modal.type === "edit" ? (modal.product.description || "") : ""}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Upload Gambar (Lokal)</label>
                  <input
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                  />
                  <div style={{ margin: "10px 0", fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>Atau masukkan URL gambar:</div>
                  <input
                    name="imageUrl"
                    type="url"
                    style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                    placeholder="https://..."
                    defaultValue={modal.type === "edit" ? (modal.product.imageUrl || "") : ""}
                  />
                  {modal.type === "edit" && modal.product.imageUrl && (
                    <div style={{ marginTop: "10px", borderRadius: "12px", overflow: "hidden", height: "80px", border: "1px solid var(--gray-200)" }}>
                      <img src={modal.product.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                {/* Location Section */}
                <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
                  <h4 style={{ fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--primary)", marginBottom: "1rem" }}>Maps Lokasi</h4>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Alamat Lengkap</label>
                      <input
                        name="address"
                        type="text"
                        style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                        placeholder="Contoh: Jl. Raya Jatilawang No. 12"
                        defaultValue={modal.type === "edit" ? (modal.product.address || "") : ""}
                      />
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Latitude</label>
                        <input
                          name="latitude"
                          type="text"
                          style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                          placeholder="-7.123456"
                          defaultValue={modal.type === "edit" ? (modal.product.latitude || "") : ""}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Longitude</label>
                        <input
                          name="longitude"
                          type="text"
                          style={{ width: "100%", fontWeight: 600, fontSize: "0.875rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", border: "1px solid var(--gray-300)", outline: "none", background: "var(--white)", color: "var(--text-main)" }}
                          placeholder="109.123456"
                          defaultValue={modal.type === "edit" ? (modal.product.longitude || "") : ""}
                        />
                      </div>
                    </div>
                    
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", background: "var(--light)", padding: "10px", borderRadius: "10px", border: "1px solid var(--gray-200)" }}>
                      <i className="fas fa-circle-info" style={{ color: "var(--secondary)", marginRight: "6px" }} />
                      Koordinat ini akan digunakan untuk menampilkan lokasi di Google Maps pada website.
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-order"
                  style={{ width: "100%", justifyContent: "center", padding: "1rem", marginTop: "0.5rem" }}
                  disabled={saving}
                >
                  {saving ? (
                    <><i className="fas fa-circle-notch fa-spin" /> Menyimpan...</>
                  ) : modal.type === "edit" ? (
                    <><i className="fas fa-floppy-disk" /> Simpan Perubahan</>
                  ) : (
                    <><i className="fas fa-plus" /> Tambah Produk</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, iconColor, label, value }: { icon: string; iconColor: string; label: string; value: string }) {
  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ fontSize: "1.75rem", color: iconColor, marginBottom: "12px" }}>
        <i className={`fas ${icon}`} />
      </div>
      <div style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-muted)", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em", color: "var(--text-main)" }}>{value}</div>
    </div>
  );
}
