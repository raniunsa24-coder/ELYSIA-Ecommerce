import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

function Checkout() {
  const navigate = useNavigate();
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

  useEffect(() => {
    const token = localStorage.getItem("elysia-token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading || cart.length === 0) return;

    const token = localStorage.getItem("elysia-token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();
    const city = form.city.trim();
    const postalCode = form.postalCode.trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode
    ) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (firstName.length < 2 || lastName.length < 2) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const phonePattern = /^[0-9+\-\s()]{7,20}$/;

    if (!phonePattern.test(phone)) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    if (address.length < 5) {
      setError("Please enter a complete address.");
      setLoading(false);
      return;
    }

    if (city.length < 2) {
      setError("Please enter a valid city.");
      setLoading(false);
      return;
    }

    if (postalCode.length < 3) {
      setError("Please enter a valid postal code.");
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        customer: {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          postalCode,
        },
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
      if (
        err?.message?.toLowerCase().includes("authentication") ||
        err?.message?.toLowerCase().includes("token") ||
        err?.message?.toLowerCase().includes("login")
      ) {
        localStorage.removeItem("elysia-token");
        localStorage.removeItem("elysia-user");
        navigate("/login", { replace: true });
        return;
      }

      setError(
        err?.message ||
          "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <CheckCircle2 size={48} />

          <span>ORDER CONFIRMED</span>

          <h1>Thank you for your order.</h1>

          <p>
            Your ELYSIA order has been placed successfully.
            We’ll process it shortly.
          </p>

          {orderId && (
            <div className="order-id">
              <span>ORDER ID</span>
              <strong>{orderId}</strong>
            </div>
          )}

          <Link to="/shop" className="dark-button">
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <section className="empty-cart">
          <span>CHECKOUT</span>

          <h1>Your cart is empty.</h1>

          <p>Add something to your bag before checking out.</p>

          <Link to="/shop" className="dark-button">
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <Link to="/cart" className="back-link">
          <ArrowLeft size={15} />
          Back to cart
        </Link>

        <div>
          <span>CHECKOUT</span>
          <h1>Complete your order.</h1>
        </div>
      </div>

      <div className="checkout-layout">
        <section className="checkout-form-section">
          <div className="section-heading">
            <span>01</span>
            <h2>Contact & delivery</h2>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="form-grid">
              <label>
                First name
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="off"
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
                  autoComplete="off"
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
                autoComplete="off"
                required
              />
            </label>

            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="off"
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

            <div className="form-grid">
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

            <button
              type="submit"
              className="place-order-button"
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
                <>
                  Place Order
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </section>

        <aside className="checkout-summary">
          <span>ORDER SUMMARY</span>

          <div className="checkout-products">
            {cart.map((item) => {
              const quantity = Number(item.quantity) || 1;
              const itemTotal =
                Number(item.price || 0) * quantity;

              return (
                <div
                  className="checkout-product"
                  key={item._id}
                >
                  <div className="checkout-product-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                    <span>{quantity}</span>
                  </div>

                  <div className="checkout-product-info">
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                  </div>

                  <strong>
                    ${itemTotal.toFixed(2)}
                  </strong>
                </div>
              );
            })}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>
              ${Number(cartTotal).toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>

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