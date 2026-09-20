import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <section className="empty-cart">
          <span>YOUR BAG</span>

          <h1>Your cart is empty.</h1>

          <p>
            Discover something beautiful for your space.
          </p>

          <Link to="/shop" className="dark-button">
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <span>YOUR BAG</span>
        <h1>Shopping cart.</h1>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => {
            const quantity = item.quantity || 1;

            return (
              <article
                className="cart-item"
                key={item._id}
              >
                <Link
                  to={`/product/${item._id}`}
                  className="cart-item-image"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </Link>

                <div className="cart-item-info">
                  <span>{item.category}</span>

                  <h2>{item.name}</h2>

                  <p>
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <div className="cart-item-bottom">
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={15} />
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                <strong className="cart-item-total">
                  $
                  {(
                    Number(item.price) * quantity
                  ).toFixed(2)}
                </strong>
              </article>
            );
          })}
        </section>

        <aside className="cart-summary">
          <span>ORDER SUMMARY</span>

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

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/shop"
            className="back-link"
            style={{ marginTop: "20px" }}
          >
            <ArrowLeft size={15} />
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;