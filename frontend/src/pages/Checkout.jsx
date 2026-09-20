import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      clearCart();
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  if (submitted) {
    return (
      <main className="checkout-page">
        <div className="order-success">
          <CheckCircle2 size={50} />

          <span>ORDER RECEIVED</span>

          <h1>Thank you for shopping with ELYSIA.</h1>

          <p>
            Your order has been successfully placed.
          </p>

          <Link to="/shop" className="dark-button">
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

          <Link to="/shop" className="dark-button">
            Go to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <Link to="/cart" className="back-link">
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
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Last name
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
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
                required
              />
            </label>

            <label>
              Phone
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Address
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </label>

            <div className="form-row">
              <label>
                City
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Postal code
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

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
                  Processing...
                </>
              ) : (
                "Place order"
              )}
            </button>
          </form>
        </section>

        <aside className="checkout-summary">
          <span>YOUR ORDER</span>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item._id}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                $
                {(
                  Number(item.price) *
                  Number(item.quantity)
                ).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <strong>
              ${cartTotal.toFixed(2)}
            </strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;