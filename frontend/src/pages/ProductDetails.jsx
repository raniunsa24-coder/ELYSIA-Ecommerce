import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  ShoppingBag,
} from "lucide-react";

import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import Reveal from "../components/Reveal";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      try {
        setLoading(true);

        const data = await getProductById(id);

        if (mounted) {
          setProduct(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Product not found.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  function handleAdd() {
    if (!product) return;

    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  if (loading) {
    return (
      <main className="page-status">
        <LoaderCircle
          size={28}
          className="loading-icon"
        />
        <span>Loading product...</span>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-status">
        <h1>Product unavailable.</h1>
        <Link to="/shop" className="dark-button">
          Back to shop
          <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} />
        Back to collection
      </Link>

      <div className="product-detail-layout">
        <Reveal direction="left">
          <div className="product-detail-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>
        </Reveal>

        <Reveal
          className="product-detail-content"
          delay={120}
          direction="right"
        >
          <span>{product.category}</span>

          <h1>{product.name}</h1>

          <div className="product-detail-price">
            ${Number(product.price).toFixed(2)}
          </div>

          <div className="detail-line" />

          <p className="product-detail-description">
            {product.description}
          </p>

          <div className="product-detail-features">
            <div>
              <Check size={15} />
              Carefully selected
            </div>

            <div>
              <Check size={15} />
              Designed for everyday living
            </div>

            <div>
              <Check size={15} />
              Secure checkout
            </div>
          </div>

          <button
            type="button"
            className={`add-to-cart-button ${
              added ? "added" : ""
            }`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <Check size={17} />
                Added to cart
              </>
            ) : (
              <>
                <ShoppingBag size={17} />
                Add to cart
              </>
            )}
          </button>
        </Reveal>
      </div>
    </main>
  );
}

export default ProductDetails;