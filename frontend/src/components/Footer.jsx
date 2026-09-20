import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="footer-logo">
            ELYSIA
          </Link>

          <p>
            Modern essentials for thoughtful everyday living.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>

            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart</Link>
          </div>

          <div>
            <h4>Categories</h4>

            <Link to="/shop">Home</Link>
            <Link to="/shop">Furniture</Link>
            <Link to="/shop">Lighting</Link>
            <Link to="/shop">Decor</Link>
          </div>

          <div>
            <h4>Connect</h4>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
              <ArrowUpRight size={13} />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight size={13} />
            </a>

            <a href="mailto:hello@elysia.com">
              Email
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ELYSIA. All rights reserved.</span>
        <span>Designed & developed with purpose.</span>
      </div>
    </footer>
  );
}

export default Footer;