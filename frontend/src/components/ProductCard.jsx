import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  function handleAdd(event) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  }

  return (
    <Link
      to={`/product/${product._id}`}
      className="product-card"
    >
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <span className="product-arrow">
          <ArrowUpRight size={17} />
        </span>

        <button
          type="button"
          className="quick-add"
          onClick={handleAdd}
        >
          <ShoppingBag size={16} />
          Add to cart
        </button>
      </div>

      <div className="product-info">
        <div>
          <span>{product.category}</span>
          <h2>{product.name}</h2>
        </div>

        <strong>
          ${Number(product.price).toFixed(2)}
        </strong>
      </div>
    </Link>
  );
}

export default ProductCard;