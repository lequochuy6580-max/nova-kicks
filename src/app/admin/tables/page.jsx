"use client";
import { useEffect, useState } from "react";

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const [ordersRes, productsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/orders`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`),
    ]);

    const [ordersData, productsData] = await Promise.all([ordersRes.json(), productsRes.json()]);
    setOrders(ordersData || []);
    setProducts(productsData || []);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const uniqueCustomers = new Set((orders || []).map((order) => (order.name || "").trim())).size;
  const featuredProducts = products.filter((product) => product.showOnHome).length;
  const pendingOrders = orders.filter((order) => order.status !== "hoan-thanh" && order.status !== "da-huy").length;

  const handleConfirm = async (order) => {
    const statusList = {
      "don-moi": "che-bien",
      "che-bien": "cho-giao",
      "cho-giao": "hoan-thanh",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/orders/${order._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: statusList[order.status] }),
    });
    const data = await res.json();
    if (data.status === "success") {
      fetchData();
    }
  };

  const handleCancel = async (order) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/orders/${order._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "da-huy" }),
    });
    const data = await res.json();
    if (data.status === "success") {
      fetchData();
    }
  };

  return (
    <div className="content">
      <div className="d-flex align-items-start justify-content-between mb-4 flex-column flex-md-row gap-3">
        <div>
          <p className="text-uppercase text-secondary mb-2">Dashboard đơn hàng</p>
          <h2 className="fw-bold">Quản lý đơn hàng Nova-kicks</h2>
          <p className="text-muted mb-0">
            Tổng quan về đơn hàng, sản phẩm nổi bật và số lượng khách hàng đã đặt hàng.
          </p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <small className="text-uppercase text-muted">Tổng đơn hàng</small>
              <h3 className="mt-3 mb-2">{orders.length}</h3>
              <p className="text-muted mb-0">Tổng số đơn hàng trong hệ thống.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <small className="text-uppercase text-muted">Sản phẩm nổi bật</small>
              <h3 className="mt-3 mb-2">{featuredProducts}</h3>
              <p className="text-muted mb-0">Số sản phẩm được đánh dấu hiển thị nổi bật.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <small className="text-uppercase text-muted">Khách hàng</small>
              <h3 className="mt-3 mb-2">{uniqueCustomers}</h3>
              <p className="text-muted mb-0">Số khách hàng khác nhau đã đặt hàng.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h4 className="card-title mb-1">Danh sách đơn hàng</h4>
                  <p className="text-muted mb-0">Quản lý trạng thái các đơn hàng mới và xử lý nhanh.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th className="text-muted">Mã đơn</th>
                      <th className="text-muted">Khách hàng</th>
                      <th className="text-muted">Sản phẩm</th>
                      <th className="text-muted">Thời gian</th>
                      <th className="text-muted">Trạng thái</th>
                      <th className="text-muted">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          Đang tải dữ liệu...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          Chưa có đơn hàng nào.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.name || "Khách lạ"}</td>
                          <td>
                            {order.order_items?.map((item, index) => (
                              <div key={index}>{item.name} x{item.quantity}</div>
                            ))}
                          </td>
                          <td>{new Date(order.created_at).toLocaleString()}</td>
                          <td>
                            {order.status === "don-moi" ? (
                              <span className="badge bg-primary">Đơn mới</span>
                            ) : order.status === "che-bien" ? (
                              <span className="badge bg-warning text-dark">Đang chế biến</span>
                            ) : order.status === "cho-giao" ? (
                              <span className="badge bg-info text-dark">Chờ giao</span>
                            ) : order.status === "hoan-thanh" ? (
                              <span className="badge bg-success">Hoàn thành</span>
                            ) : (
                              <span className="badge bg-danger">Đã hủy</span>
                            )}
                          </td>
                          <td>
                            {order.status !== "hoan-thanh" && order.status !== "da-huy" ? (
                              <>
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() => handleConfirm(order)}
                                >
                                  Tiếp theo
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleCancel(order)}
                                >
                                  Hủy
                                </button>
                              </>
                            ) : (
                              <span className="text-secondary">Không có</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title mb-3">Sản phẩm nổi bật</h4>
              <p className="text-muted">Các sản phẩm đang được đánh dấu hiển thị nổi bật.</p>
              <div className="list-group">
                {(products.filter((product) => product.showOnHome).slice(0, 5)).map((product) => (
                  <div key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{product.name}</span>
                    <span className="badge bg-secondary">{product.price.toLocaleString()}đ</span>
                  </div>
                ))}
                {featuredProducts === 0 && (
                  <div className="list-group-item text-muted">Chưa có sản phẩm nổi bật.</div>
                )}
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mt-4">
            <div className="card-body">
              <h4 className="card-title mb-3">Đơn hàng chờ xử lý</h4>
              <p className="text-muted">Số đơn còn đang ở trạng thái chưa hoàn thành.</p>
              <h2 className="fw-bold">{pendingOrders}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
