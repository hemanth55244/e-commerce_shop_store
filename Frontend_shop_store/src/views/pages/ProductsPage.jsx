import { useState, useMemo } from "react";
import { useProductController } from "../../controllers/useProductController";
import { useAuthController } from "../../controllers/useAuthController";
import { useCartController } from "../../controllers/useCartController";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function ProductsPage() {
  const { products, loading, error, removeProduct } = useProductController();
  const { isLoggedIn } = useAuthController();
  const { addToCart, error: cartError } = useCartController({ autoLoad: false });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category || "General"))];
    return ["All", ...cats.sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => (p.category || "General") === selectedCategory);
  }, [products, selectedCategory]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
    } catch (_) {
      // toast is handled in the controller
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">Catalog</span>
          <h1 className="display-lg">Our Products</h1>
          <p className="body-md text-muted">
            Browse our curated collection of premium products.
          </p>
        </div>

        {isLoggedIn && (
          <div style={{ marginBottom: "32px" }}>
            <Link to="/add-product">
              <Button variant="aloe">+ Add New Product</Button>
            </Link>
          </div>
        )}

        {/* Category Filter */}
        {!loading && products.length > 0 && (
          <div className="category-filter" style={{ marginBottom: "32px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? "btn-primary" : "btn-outline-light"}`}
                style={{ padding: "8px 20px", fontSize: "14px", minHeight: "36px" }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="loading-state">Loading products...</p>}
        {error && <div className="alert alert-error" style={{ marginBottom: "16px" }}>{error}</div>}
        {cartError && <div className="alert alert-error" style={{ marginBottom: "16px" }}>{cartError}</div>}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty-state">
            <p className="heading-md">
              {selectedCategory !== "All" ? `No products in ${selectedCategory}` : "No products yet"}
            </p>
            <p className="caption text-muted">
              {isLoggedIn
                ? "Add your first product to get started."
                : "Login to add products to the store."}
            </p>
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showActions={isLoggedIn}
                showAddToCart={isLoggedIn}
                onAddToCart={handleAddToCart}
                onDelete={removeProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsPage;
