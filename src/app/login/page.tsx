"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        router.push("/admin");
      } else {
        setError("Kredensial tidak valid. Silakan coba lagi.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="login-screen">
      <div className="bg-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="login-container animate-fade-in">
        <div className="login-card">
          {/* Brand Header */}
          <div className="brand-section">
            <Link href="/" className="brand-logo group">
              <div className="logo-symbol">TJ</div>
              <div className="brand-info">
                <h1 className="brand-name">TRISNO JAYA</h1>
                <p className="brand-tagline">BAROKAH</p>
              </div>
            </Link>
          </div>

          <div className="form-section">
            <div className="welcome-text">
              <h2>Admin Portal</h2>
              <p>Masukkan akses Anda untuk mengelola toko</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="error-alert">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              <div className="input-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <i className="fas fa-user-circle"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <>
                    <span>MASUK SEKARANG</span>
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="card-footer">
            <p className="security-note">
              <i className="fas fa-shield-alt"></i> Sistem Keamanan Terenkripsi
            </p>
            <Link href="/" className="back-link">
              <i className="fas fa-home"></i> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-screen {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        .bg-decoration {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .blob {
          position: absolute;
          width: 600px;
          height: 600px;
          background: var(--primary);
          filter: blur(100px);
          opacity: 0.1;
          border-radius: 50%;
        }

        .blob-1 { top: -200px; left: -200px; }
        .blob-2 { bottom: -200px; right: -200px; background: var(--secondary); }

        .login-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 460px;
          padding: 20px;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 40px;
          padding: 45px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
        }

        .brand-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .brand-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
        }

        .logo-symbol {
          width: 70px;
          height: 70px;
          background: var(--primary);
          color: white;
          font-size: 24px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          margin-bottom: 15px;
          transform: rotate(-5deg);
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(6, 78, 59, 0.2);
        }

        .brand-logo:hover .logo-symbol {
          transform: rotate(0) scale(1.1);
        }

        .brand-name {
          font-size: 22px;
          font-weight: 900;
          color: var(--primary);
          letter-spacing: -0.5px;
          margin: 0;
        }

        .brand-tagline {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 4px;
          color: var(--secondary);
          margin: 5px 0 0;
          text-transform: uppercase;
        }

        .welcome-text {
          margin-bottom: 30px;
          text-align: center;
        }

        .welcome-text h2 {
          font-size: 24px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .welcome-text p {
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .error-alert {
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #991b1b;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: shake 0.5s ease;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 12px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-left: 5px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper i {
          position: absolute;
          left: 18px;
          color: #94a3b8;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .input-wrapper input {
          width: 100%;
          padding: 15px 15px 15px 50px;
          background: #f1f5f9;
          border: 2px solid transparent;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.3s ease;
          outline: none;
        }

        .input-wrapper input:focus {
          background: white;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(6, 78, 59, 0.05);
        }

        .input-wrapper input:focus + i {
          color: var(--primary);
        }

        .submit-btn {
          margin-top: 10px;
          background: var(--primary);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(6, 78, 59, 0.3);
        }

        .submit-btn:hover {
          background: #065f46;
          transform: translateY(-2px);
          box-shadow: 0 15px 20px -5px rgba(6, 78, 59, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .card-footer {
          margin-top: 35px;
          padding-top: 25px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .security-note {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .back-link {
          text-decoration: none;
          color: #64748b;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: var(--primary);
        }

        .loader {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 30px;
            border-radius: 30px;
          }
        }
      `}</style>
    </div>
  );
}
