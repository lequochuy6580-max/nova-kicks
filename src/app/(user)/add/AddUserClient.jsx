"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [status, setStatus] = useState("Hoạt động");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, status }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Thêm người dùng thất bại.");
      }

      router.push("/admin/user");
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="content admin-product-form">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title mb-4">Thêm người dùng</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input type="text" className="form-control" placeholder="Nhập tên" value={name}
                onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Nhập email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input type="password" className="form-control" placeholder="Nhập mật khẩu" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="row row-cols-2 g-3 mb-3">
              <div className="col">
                <label className="form-label">Vai trò</label>
                <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="MEMBER">MEMBER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="col">
                <label className="form-label">Trạng thái</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Bị cấm">Bị cấm</option>
                </select>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>
                {saving ? "Đang lưu..." : "Thêm người dùng"}
              </button>
              <Link href="/admin/user" className="btn btn-outline-secondary">Hủy</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}