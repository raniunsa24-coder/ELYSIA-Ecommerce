import { useEffect, useState } from "react";
import {
  Edit3,
  Image,
  LoaderCircle,
  Plus,
  Trash2,
  X,
} from "lucide-react";

const API_URL = "https://elysia-meyrk4k6.b4a.run/api";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
  stock: "",
};

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load products.");
      }

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function openCreateForm() {
    setForm(emptyForm);
    setEditingId("");
    setError("");
    setMessage("");
    setShowForm(true);
  }

  function openEditForm(product) {
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      image: product.image || "",
      description: product.description || "",
      stock: product.stock ?? 0,
    });

    setEditingId(product._id);
    setError("");
    setMessage("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingId("");
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const token = localStorage.getItem("elysia-token");

      if (!token) {
        throw new Error("Admin authentication required.");
      }

      const productData = {
        name: form.name.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        image: form.image.trim(),
        description: form.description.trim(),
        stock: Number(form.stock),
      };

      if (
        !productData.name ||
        !productData.category ||
        !productData.image ||
        !productData.description
      ) {
        throw new Error("Please fill in all product fields.");
      }

      if (!Number.isFinite(productData.price) || productData.price < 0) {
        throw new Error("Please enter a valid price.");
      }

      if (!Number.isInteger(productData.stock) || productData.stock < 0) {
        throw new Error("Stock must be a whole number.");
      }

      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${editingId ? "update" : "create"} product.`
        );
      }

      if (editingId) {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product._id === editingId ? data.product : product
          )
        );
        setMessage("Product updated successfully.");
      } else {
        setProducts((currentProducts) => [
          data.product,
          ...currentProducts,
        ]);
        setMessage("Product added successfully.");
      }

      setForm(emptyForm);
      setEditingId("");
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Unable to save product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(productId) {
    if (deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeleting(productId);
      setError("");
      setMessage("");

      const token = localStorage.getItem("elysia-token");

      if (!token) {
        throw new Error("Admin authentication required.");
      }

      const response = await fetch(
        `${API_URL}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product."
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== productId
        )
      );

      setMessage("Product deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete product.");
    } finally {
      setDeleting("");
    }
  }

  if (loading) {
    return (
      <main className="admin-products-page page-status">
        <LoaderCircle size={28} className="loading-icon" />
        <span>Loading products...</span>
      </main>
    );
  }

  return (
    <main className="admin-products-page">
      <div className="admin-products-header">
        <div>
          <span>ADMIN</span>
          <h1>Product management.</h1>
          <p>Manage the products available in your ELYSIA store.</p>
        </div>

        <button
          type="button"
          className="admin-dashboard-button"
          onClick={showForm ? closeForm : openCreateForm}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close" : "Add product"}
        </button>
      </div>

      {message && (
        <div className="admin-success-message">
          {message}
        </div>
      )}

      {error && <div className="form-error">{error}</div>}

      {showForm && (
        <section className="admin-product-form-section">
          <div className="admin-section-heading">
            <div>
              <span>{editingId ? "EDIT" : "NEW PRODUCT"}</span>
              <h2>
                {editingId ? "Update product." : "Add product."}
              </h2>
            </div>
          </div>

          <form
            className="admin-product-form"
            onSubmit={handleSubmit}
          >
            <div className="admin-product-form-grid">
              <label>
                Product name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Aura Ceramic"
                  required
                />
              </label>

              <label>
                Category
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Decor"
                  required
                />
              </label>

              <label>
                Price
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="48"
                  required
                />
              </label>

              <label>
                Stock
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="20"
                  required
                />
              </label>
            </div>

            <label>
              Image URL
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the product..."
                rows="5"
                required
              />
            </label>

            <div className="admin-product-form-actions">
              <button
                type="button"
                className="back-link"
                onClick={closeForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="auth-button"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="loading-icon"
                    />
                    {editingId ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    {editingId ? (
                      <Edit3 size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                    {editingId ? "Update product" : "Add product"}
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="admin-products-section">
        <div className="admin-section-heading">
          <div>
            <span>PRODUCTS</span>
            <h2>Store catalogue.</h2>
          </div>

          <span>{products.length} products</span>
        </div>

        {products.length === 0 ? (
          <div className="admin-empty-state">
            <PackageIcon />
            <h2>No products yet.</h2>
            <p>Add your first product to the ELYSIA catalogue.</p>
          </div>
        ) : (
          <div className="admin-products-grid">
            {products.map((product) => (
              <article
                className="admin-product-card"
                key={product._id}
              >
                <div className="admin-product-image">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  ) : (
                    <Image size={30} />
                  )}
                </div>

                <div className="admin-product-card-content">
                  <span>{product.category}</span>

                  <h2>{product.name}</h2>

                  <p>
                    {product.description}
                  </p>

                  <div className="admin-product-meta">
                    <strong>
                      ${Number(product.price || 0).toFixed(2)}
                    </strong>

                    <span>
                      Stock: {Number(product.stock || 0)}
                    </span>
                  </div>

                  <div className="admin-product-actions">
                    <button
                      type="button"
                      onClick={() => openEditForm(product)}
                    >
                      <Edit3 size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      disabled={deleting === product._id}
                    >
                      {deleting === product._id ? (
                        <LoaderCircle
                          size={15}
                          className="loading-icon"
                        />
                      ) : (
                        <Trash2 size={15} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function PackageIcon() {
  return (
    <div className="admin-empty-icon">
      <Package size={34} />
    </div>
  );
}

export default ProductsAdmin;