import { useEffect, useState } from "react";
import {
  ChevronDown,
  LoaderCircle,
  Package,
  RefreshCw,
} from "lucide-react";

const API_URL = "https://elysia-r374leng.b4a.run/api";

const orderStatuses = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("elysia-token");

      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders.");
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid orders response.");
      }

      setOrders(data);
    } catch (err) {
      setError(err?.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(orderId, status) {
    try {
      setUpdating(orderId);
      setError("");

      const token = localStorage.getItem("elysia-token");

      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order.");
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );
    } catch (err) {
      setError(err?.message || "Unable to update order.");
    } finally {
      setUpdating("");
    }
  }

  if (loading) {
    return (
      <main className="admin-orders-page page-status">
        <LoaderCircle size={28} className="loading-icon" />
        <span>Loading orders...</span>
      </main>
    );
  }

  return (
    <main className="admin-orders-page">
      <div className="admin-orders-header">
        <div>
          <span>ADMIN</span>
          <h1>Order management.</h1>
          <p>
            View and manage customer orders from ELYSIA.
          </p>
        </div>

        <button
          type="button"
          className="refresh-orders-button"
          onClick={loadOrders}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && <div className="form-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="admin-empty-state">
          <Package size={34} />
          <h2>No orders yet.</h2>
          <p>
            Customer orders will appear here once they
            are placed.
          </p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <article
              className="admin-order-card"
              key={order._id}
            >
              <div className="admin-order-top">
                <div>
                  <span>ORDER</span>
                  <h2>#{order._id}</h2>
                </div>

                <div className="order-status-control">
                  <label htmlFor={`status-${order._id}`}>
                    Status
                  </label>

                  <div className="status-select">
                    <select
                      id={`status-${order._id}`}
                      value={order.status}
                      onChange={(event) =>
                        updateStatus(
                          order._id,
                          event.target.value
                        )
                      }
                      disabled={updating === order._id}
                    >
                      {orderStatuses.map((status) => (
                        <option
                          value={status}
                          key={status}
                        >
                          {status.charAt(0).toUpperCase() +
                            status.slice(1)}
                        </option>
                      ))}
                    </select>

                    {updating === order._id ? (
                      <LoaderCircle
                        size={15}
                        className="loading-icon"
                      />
                    ) : (
                      <ChevronDown size={15} />
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-order-content">
                <div className="admin-customer">
                  <span>CUSTOMER</span>

                  <strong>
                    {order.customer.firstName}{" "}
                    {order.customer.lastName}
                  </strong>

                  <p>{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                  <p>
                    {order.customer.address},{" "}
                    {order.customer.city}{" "}
                    {order.customer.postalCode}
                  </p>
                </div>

                <div className="admin-order-items">
                  <span>ITEMS</span>

                  {order.items.map((item, index) => (
                    <div
                      className="admin-order-item"
                      key={`${order._id}-${index}`}
                    >
                      <div>
                        <strong>{item.name}</strong>
                        <span>
                          Quantity: {item.quantity}
                        </span>
                      </div>

                      <strong>
                        $
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-order-bottom">
                <span>
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </span>

                <strong>
                  Total ${Number(order.total).toFixed(2)}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminOrders;