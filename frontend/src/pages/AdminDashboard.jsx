import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

const API_URL = "https://elysia-g6qv1kji.b4a.run/api";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      const response = await fetch(`${API_URL}/orders`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Dashboard error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const stats = {
    totalOrders: orders.length,

    totalSales: orders.reduce(
      (total, order) => total + Number(order.total || 0),
      0
    ),

    pending: orders.filter(
      (order) => order.status === "pending"
    ).length,

    confirmed: orders.filter(
      (order) => order.status === "confirmed"
    ).length,

    shipped: orders.filter(
      (order) => order.status === "shipped"
    ).length,

    delivered: orders.filter(
      (order) => order.status === "delivered"
    ).length,

    cancelled: orders.filter(
      (order) => order.status === "cancelled"
    ).length,
  };

  if (loading) {
    return (
      <main className="admin-dashboard-page page-status">
        <LoaderCircle
          size={28}
          className="loading-icon"
        />
        <span>Loading dashboard...</span>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <div>
          <span>ADMIN</span>

          <h1>Dashboard.</h1>

          <p>
            Overview of ELYSIA store performance.
          </p>

          <Link
            to="/admin/orders"
            className="admin-dashboard-button"
          >
            Manage orders
          </Link>
        </div>
      </div>

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <Package size={20} />

          <span>TOTAL ORDERS</span>

          <strong>{stats.totalOrders}</strong>
        </div>

        <div className="admin-stat-card">
          <span>TOTAL SALES</span>

          <strong>
            ${stats.totalSales.toFixed(2)}
          </strong>
        </div>

        <div className="admin-stat-card">
          <Clock3 size={20} />

          <span>PENDING</span>

          <strong>{stats.pending}</strong>
        </div>

        <div className="admin-stat-card">
          <CheckCircle2 size={20} />

          <span>CONFIRMED</span>

          <strong>{stats.confirmed}</strong>
        </div>

        <div className="admin-stat-card">
          <Truck size={20} />

          <span>SHIPPED</span>

          <strong>{stats.shipped}</strong>
        </div>

        <div className="admin-stat-card">
          <CheckCircle2 size={20} />

          <span>DELIVERED</span>

          <strong>{stats.delivered}</strong>
        </div>

        <div className="admin-stat-card">
          <XCircle size={20} />

          <span>CANCELLED</span>

          <strong>{stats.cancelled}</strong>
        </div>
      </section>

      <section className="admin-recent-orders">
        <div className="admin-section-heading">
          <div>
            <span>ORDERS</span>

            <h2>Recent orders.</h2>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty-state">
            <Package size={34} />

            <h2>No orders yet.</h2>

            <p>
              Orders will appear here once customers
              place them.
            </p>
          </div>
        ) : (
          <div className="admin-recent-list">
            {orders.slice(0, 5).map((order) => (
              <div
                className="admin-recent-order"
                key={order._id}
              >
                <div>
                  <span>#{order._id}</span>

                  <strong>
                    {order.customer.firstName}{" "}
                    {order.customer.lastName}
                  </strong>
                </div>

                <span
                  className={`admin-status ${order.status}`}
                >
                  {order.status}
                </span>

                <strong>
                  ${Number(order.total).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;