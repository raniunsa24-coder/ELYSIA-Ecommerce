import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Truck,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";

import { getProducts } from "../services/api";
import Reveal from "../components/Reveal";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getProducts();

        if (mounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredProducts = Array.isArray(products)
    ? products.slice(0, 3)
    : [];

  return (
    <main className="home-page">
      <section className="hero">
        <Reveal className="hero-content">
          <span className="hero-label">
            <Sparkles size={14} />
            NEW COLLECTION 2026
          </span>

          <h1>
            Everything you need.
            <br />
            <em>Nothing you don't.</em>
          </h1>

          <p>
            Discover thoughtfully designed products made
            for modern living, selected with simplicity and
            purpose.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="hero-button">
              Explore Collection
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>

        <Reveal
          className="hero-visual"
          delay={150}
          direction="right"
        >
          <div className="hero-card">
            <div className="hero-card-top">
              <span>01</span>
              <span>ELYSIA</span>
            </div>

            <div className="hero-shape">
              <div className="shape-large" />
              <div className="shape-small" />
            </div>

            <div className="hero-card-bottom">
              <span>ESSENTIALS</span>
              <span>2026</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="benefits-section">
        <Reveal className="benefit">
          <Truck size={22} />

          <div>
            <strong>Simple delivery</strong>
            <span>Reliable delivery experience.</span>
          </div>
        </Reveal>

        <Reveal className="benefit" delay={100}>
          <Sparkles size={22} />

          <div>
            <strong>Curated essentials</strong>
            <span>Products chosen with purpose.</span>
          </div>
        </Reveal>

        <Reveal className="benefit" delay={180}>
          <ShieldCheck size={22} />

          <div>
            <strong>Secure checkout</strong>
            <span>A smooth shopping experience.</span>
          </div>
        </Reveal>
      </section>

      <section className="featured-section">
        <Reveal className="section-heading">
          <div>
            <span>CURATED FOR YOU</span>
            <h2>Everyday essentials.</h2>
          </div>

          <Link to="/shop" className="section-link">
            Explore all
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        {loading ? (
          <div className="shop-status">
            <LoaderCircle className="loading-icon" size={24} />
            <span>Loading collection...</span>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="shop-status">
            <span>No products available.</span>
          </div>
        ) : (
          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <Reveal
                key={product._id}
                delay={index * 120}
              >
                <Link
                  to={`/product/${product._id}`}
                  className={
                    index === 1
                      ? "featured-card featured-card-large"
                      : "featured-card"
                  }
                >
                  <div className="featured-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    <span className="featured-arrow">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <div className="featured-info">
                    <div>
                      <span>{product.category}</span>
                      <h3>{product.name}</h3>
                    </div>

                    <strong>
                      ${Number(product.price).toFixed(2)}
                    </strong>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <Reveal className="statement-section">
        <span>THE ELYSIA APPROACH</span>

        <h2>
          Less noise.
          <br />
          More meaning.
        </h2>

        <p>
          We believe the things around you should feel
          intentional. ELYSIA brings together modern
          essentials that balance function, form and
          everyday comfort.
        </p>

        <Link to="/shop" className="dark-button">
          Discover ELYSIA
          <ArrowRight size={16} />
        </Link>
      </Reveal>
    </main>
  );
}

export default Home;