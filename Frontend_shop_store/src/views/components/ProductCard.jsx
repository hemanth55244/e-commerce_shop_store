import { Link } from "react-router-dom";
import { getImageUrl } from "../../models/api";
import Button from "./Button";

function ProductCard({ product, onAddToCart, onDelete, showActions = false, showAddToCart = false }) {
  const imageUrl = getImageUrl(product.image);

  return (
    <article className="product-card">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.name}
          className="product-card-image"
          onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
        />
      ) : null}
      <div
        className="product-card-image product-card-placeholder"
        style={{ display: imageUrl ? 'none' : 'flex' }}
      >
        <span style={{ fontSize: '40px' }}>📦</span>
        <span style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '8px' }}>No Image</span>
      </div>
      <div className="product-card-body">
        <span className="pill-tag">{product.category || "General"}</span>
        <h3 className="heading-md">{product.name}</h3>
        <p className="caption text-muted">
          {product.description?.slice(0, 80)}
          {product.description?.length > 80 ? "..." : ""}
        </p>
        <p className="product-price">
          {product.price != null
            ? `₹${Number(product.price).toLocaleString('en-IN')}`
            : 'Price not set'}
        </p>
        <div className="hero-actions">
          <Link to={`/products/${product._id}`}>
            <Button variant="outline-light">View Details</Button>
          </Link>
          {showAddToCart && onAddToCart && (
            <Button variant="primary" onClick={() => onAddToCart(product._id)}>
              Add to Cart
            </Button>
          )}
          {showActions && onDelete && (
            <Button variant="danger" onClick={() => onDelete(product._id)}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
