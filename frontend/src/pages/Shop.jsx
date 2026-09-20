import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const categories = [
  "All",
  "Home",
  "Furniture",
  "Lighting",
  "Decor",
];

function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (active) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load products:", error);

        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const search = searchQuery.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(search) ||
          product.category?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search)
        );
      });
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "Price: Low to High") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "Price: High to Low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, category, sort, searchQuery]);

  return (
    <main className="shop-page">
      <section className="shop-header">
        <span>THE COLLECTION</span>

        <h1>
          Shop essentials made for everyday living.
        </h1>

        <p>
          Explore our carefully selected collection of
          modern essentials, designed with simplicity and
          purpose.
        </p>

        {searchQuery && (
          <p className="search-result-text">
            Showing results for "{searchQuery}"
          </p>
        )}
      </section>

      <div className="shop-toolbar">
        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item ? "active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
          aria-label="Sort products"
        >
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="shop-status">
          Loading collection...
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="shop-status">
          No products found.
        </div>
      ) : (
        <section className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Shop;