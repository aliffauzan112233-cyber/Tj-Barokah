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
    <div className="admin-wrapper">
      {/* ═══════════════════════════════
          SIDEBAR
      ══════════════════════════════ */}
      <aside className="admin-sidebar">
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2.5rem" }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "12px",
            background: "#16a34a", display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 900, color: "#fff",
            fontSize: "15px", boxShadow: "0 4px 20px rgba(22,163,74,0.3)"
          }}>TJ</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: "13px", color: "#f0f6fc", letterSpacing: "-0.02em" }}>ADMIN PANEL</div>
            <div style={{ fontSize: "9px", fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", color: "#f59e0b" }}>Trisno Jaya Barokah</div>
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
            <div key={l.label} className={`sidebar-link${l.active ? " active" : ""}`}>
              <i className={`fas ${l.icon}`} style={{ width: "18px", textAlign: "center" }} />
              <span>{l.label}</span>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: "4px" }}>
          <Link href="/" target="_blank" className="sidebar-link">
            <i className="fas fa-arrow-up-right-from-square" style={{ width: "18px", textAlign: "center", color: "#f59e0b" }} />
            <span>Lihat Website</span>
          </Link>
          <Link href="/login" className="sidebar-link" style={{ color: "rgba(248,113,113,0.7)" }}>
            <i className="fas fa-right-from-bracket" style={{ width: "18px", textAlign: "center" }} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* ═══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <main className="admin-main">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.875rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Dashboard <span style={{ color: "#22c55e" }}>Overview</span>
            </h1>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#8b949e" }}>
              Kelola semua produk ayam dan telur secara real-time.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <i className="fas fa-search" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#8b949e", fontSize: "13px" }} />
            <input
              type="text"
              placeholder="Cari produk..."
              className="form-input"
              style={{ paddingLeft: "40px", width: "220px", paddingTop: "10px", paddingBottom: "10px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <StatCard icon="fa-box-open" iconColor="#22c55e" label="Total Produk" value={String(products.length)} />
          <StatCard icon="fa-cubes-stacked" iconColor="#f59e0b" label="Total Stok" value={totalStock.toLocaleString("id-ID")} />
          <StatCard icon="fa-circle-check" iconColor="#4ade80" label="Stok Tersedia" value={String(inStock)} />
          <StatCard icon="fa-circle-xmark" iconColor="#f87171" label="Stok Habis" value={String(outOfStock)} />
        </div>

        {/* ── Product Table Card ── */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                Daftar Produk
              </h2>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#8b949e" }}>
                {filtered.length} produk ditemukan
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => setModal({ type: "add" })}
            >
              <i className="fas fa-plus" /> Tambah Produk Baru
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "4rem", color: "#8b949e", fontWeight: 700 }}>
                      <i className="fas fa-circle-notch spin" style={{ fontSize: "24px", color: "#22c55e", display: "block", marginBottom: "12px" }} />
                      Memuat data dari database...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "4rem", color: "#8b949e", fontWeight: 700 }}>
                      <i className="fas fa-box-open" style={{ fontSize: "2rem", display: "block", marginBottom: "12px" }} />
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id}>
                      {/* Product info */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div style={{ width: "52px", height: "52px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
                            <img
                              src={p.imageUrl || "/img/ayam1.jpg"}
                              alt={p.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e: any) => { e.target.src = "/img/ayam1.jpg"; }}
                            />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: "14px", marginBottom: "2px" }}>{p.name}</div>
                            {p.description && (
                              <div style={{ fontSize: "12px", color: "#8b949e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
                                {p.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td style={{ color: "#22c55e", fontWeight: 800 }}>
                        Rp {Number(p.price).toLocaleString("id-ID")}
                      </td>

                      {/* Stock */}
                      <td style={{ fontWeight: 800 }}>
                        {p.stock.toLocaleString("id-ID")}
                      </td>

                      {/* Status */}
                      <td>
                        {p.stock > 10 ? (
                          <span className="badge-green">Tersedia</span>
                        ) : p.stock > 0 ? (
                          <span className="badge-gold">Stok Rendah</span>
                        ) : (
                          <span className="badge-red">Habis</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px" }}>
                          <button
                            className="btn-edit"
                            onClick={() => setModal({ type: "edit", product: p })}
                          >
                            <i className="fas fa-pen-to-square" /> Edit
                          </button>
                          <button
                            className="btn-danger"
                            onClick={() => handleDelete(p.id)}
                            disabled={deleteId === p.id}
                          >
                            {deleteId === p.id ? (
                              <i className="fas fa-circle-notch spin" />
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
          className="animate-fade-in"
        >
          {/* Backdrop */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(13,17,23,0.88)", backdropFilter: "blur(16px)" }}
            onClick={() => setModal({ type: "closed" })}
          />

          {/* Card */}
          <div
            className="glass-card animate-slide-in"
            style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "520px", padding: "2.5rem" }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
                {modal.type === "edit" ? (
                  <>Edit <span style={{ color: "#22c55e" }}>Produk</span></>
                ) : (
                  <>Tambah <span style={{ color: "#22c55e" }}>Produk Baru</span></>
                )}
              </h3>
              <button
                onClick={() => setModal({ type: "closed" })}
                style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "#8b949e", cursor: "pointer", fontSize: "16px" }}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Name */}
                <div>
                  <label className="form-label">Nama Produk *</label>
                  <input
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Ayam Broiler Utuh 1 Ekor"
                    defaultValue={modal.type === "edit" ? modal.product.name : ""}
                    required
                  />
                </div>

                {/* Price + Stock */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="form-label">Harga (Rp) *</label>
                    <input
                      name="price"
                      type="number"
                      className="form-input"
                      placeholder="35000"
                      min="0"
                      defaultValue={modal.type === "edit" ? modal.product.price : ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Stok *</label>
                    <input
                      name="stock"
                      type="number"
                      className="form-input"
                      placeholder="100"
                      min="0"
                      defaultValue={modal.type === "edit" ? modal.product.stock : ""}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="form-label">Deskripsi</label>
                  <input
                    name="description"
                    type="text"
                    className="form-input"
                    placeholder="Deskripsi singkat produk (opsional)"
                    defaultValue={modal.type === "edit" ? (modal.product.description || "") : ""}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="form-label">URL Gambar *</label>
                  <input
                    name="imageUrl"
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    defaultValue={modal.type === "edit" ? (modal.product.imageUrl || "") : ""}
                    required
                  />
                  {modal.type === "edit" && modal.product.imageUrl && (
                    <div style={{ marginTop: "10px", borderRadius: "12px", overflow: "hidden", height: "80px", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <img src={modal.product.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "1rem", marginTop: "0.5rem" }}
                  disabled={saving}
                >
                  {saving ? (
                    <><i className="fas fa-circle-notch spin" /> Menyimpan...</>
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
    <div className="stat-card">
      <div style={{ fontSize: "1.75rem", color: iconColor, marginBottom: "12px" }}>
        <i className={`fas ${icon}`} />
      </div>
      <div style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "#8b949e", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  );
}
