import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading || cart.length === 0) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        customer: form,

        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity) || 1,
          image: item.image || "",
        })),

        total: Number(cartTotal),
      };

      const result = await createOrder(orderData);

      setOrderId(result.order?._id || "");

      clearCart();
      setSubmitted(true);
    } catch (err) {
      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="checkout-page">
        <div className="order-success">
          <CheckCircle2 size={50} />

          <span>ORDER RECEIVED</span>

          <h1>
            Thank you for shopping with ELYSIA.
          </h1>

          <p>
            Your order has been successfully placed.
          </p>

          {orderId && (
            <p>
              Order ID: <strong>{orderId}</strong>
            </p>
          )}

          <Link
            to="/shop"
            className="dark-button"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-cart">
          <h1>Your cart is empty.</h1>

          <p>
            Add something to your cart before checking out.
          </p>

          <Link
            to="/shop"
            className="dark-button"
          >
            Go to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <Link
        to="/cart"
        className="back-link"
      >
        <ArrowLeft size={16} />
        Back to cart
      </Link>

      <div className="checkout-layout">
        <section className="checkout-form">
          <span>CHECKOUT</span>

          <h1>Complete your order.</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                First name
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </label>

              <label>
                Last name
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </label>
            </div>

            <label>
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </label>

            <label>
              Address
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                autoComplete="street-address"
                required
              />
            </label>

            <div className="form-row">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />
              </label>

              <label>
                Postal code
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  required
                />
              </label>
            </div>

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="loading-icon"
                  />
                  Placing order...
                </>
              ) : (
                "Place order"
              )}
            </button>
          </form>
        </section>

        <aside className="checkout-summary">
          <span>YOUR ORDER</span>

          {cart.map((item) => {
            const quantity =
              Number(item.quantity) || 1;

            const price =
              Number(item.price) || 0;

            return (
              <div
                className="checkout-item"
                key={item._id}
              >
                <span>
                  {item.name} × {quantity}
                </span>

                <strong>
                  ${(price * quantity).toFixed(2)}
                </strong>
              </div>
            );
          })}

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${Number(cartTotal).toFixed(2)}
            </strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;