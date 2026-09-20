import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { cart = [] } = useCart();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSearch(event) {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) {
      navigate("/shop");
      setSearchOpen(false);
      return;
    }

    navigate(`/shop?search=${encodeURIComponent(value)}`);
    setSearchOpen(false);
    closeMenu();
  }

  function toggleSearch() {
    setSearchOpen((current) => !current);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="navbar">
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          ELYSIA
        </Link>

        <nav className="nav-links">
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={
              location.pathname === "/shop" ? "active" : ""
            }
          >
            Shop
          </Link>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-button"
            aria-label="Search"
            onClick={toggleSearch}
          >
            <Search size={19} strokeWidth={1.7} />
          </button>

          <Link
            to="/login"
            className="icon-button"
            aria-label="Account"
          >
            <UserRound size={19} strokeWidth={1.7} />
          </Link>

          <Link
            to="/cart"
            className="icon-button"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={20} strokeWidth={1.7} />

            {cart.length > 0 && (
              <span className="cart-count">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="menu-button"
            onClick={() => {
              setMenuOpen((current) => !current);
              setSearchOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={21} strokeWidth={1.7} />
            ) : (
              <Menu size={21} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <form
            className="search-form"
            onSubmit={handleSearch}
          >
            <Search size={19} strokeWidth={1.7} />

            <input
              type="text"
              value={searchValue}
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
              placeholder="Search products..."
              autoFocus
            />

            <button type="submit">
              Search
            </button>
          </form>
        </div>
      )}

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/shop" onClick={closeMenu}>
          Shop
        </Link>

        <Link to="/login" onClick={closeMenu}>
          Account
        </Link>

        <Link to="/cart" onClick={closeMenu}>
          Cart
          {cart.length > 0 && ` (${cart.length})`}
        </Link>
      </div>
    </>
  );
}

export default Navbar;