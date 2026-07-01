import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductController } from "../../controllers/useProductController";
import { useCartController } from "../../controllers/useCartController";
import { useAuthController } from "../../controllers/useAuthController";
import { getImageUrl } from "../../models/api";
import Button from "../components/Button";

function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error, loadProductById } = useProductController({
    autoLoad: false,
  });
  const { isLoggedIn } = useAuthController();
  const { addToCart, loading: cartLoading, error: cartError } = useCartController({ autoLoad: false });

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
    } catch (_) {
      // toast is handled in controller
    }
  };

  useEffect(() => {
    loadProductById(id);
  }, [id, loadProductById]);

  if (loading) {
    return <p className="loading-state">Loading product...</p>;
  }

  if (error) {
    return (
      <div className="centered-page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!product) {
    return <p className="empty-state">Product not found.</p>;
  }

  const imageUrl = getImageUrl(product.image);

  return (
    <section className="section">
      <div className="container">
        <Link to="/products" className="caption text-muted" style={{ display: "inline-block", marginBottom: "24px" }}>
          &larr; Back to products
        </Link>

        <div className="detail-layout">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} className="detail-image" />
          ) : (
            <div className="detail-image" />
          )}

          <div>
            <span className="pill-tag">{product.category || "General"}</span>
            <h1 className="display-lg" style={{ marginTop: "16px" }}>
              {product.name}
            </h1>
            <p className="product-price" style={{ margin: "16px 0" }}>
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>
            <p className="body-lg" style={{ marginBottom: "32px" }}>
              {product.description}
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Button variant="primary" onClick={handleAddToCart} disabled={cartLoading || !isLoggedIn}>
                {cartLoading ? "Adding..." : isLoggedIn ? "Add to Cart" : "Login to Add"}
              </Button>
              <Link to="/products">
                <Button variant="outline-light">Continue Shopping</Button>
              </Link>
            </div>
            {cartError && <div className="alert alert-error" style={{ marginTop: "16px" }}>{cartError}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
