import { Link } from "react-router-dom";
import Button from "../components/Button";

function HomePage() {
  return (
    <>
      <section className="hero-dark">
        <div className="container hero-content">
          <span className="eyebrow text-on-dark">E-Commerce Platform</span>
          <h1 className="display-xxl text-on-dark">
            Build your store. Sell anywhere.
          </h1>
          <p className="body-lg text-on-dark" style={{ opacity: 0.85 }}>
            A full-stack MERN e-commerce platform with cinematic design,
            product management, and secure authentication.
          </p>
          <div className="hero-actions">
            <Link to="/products">
              <Button variant="outline-dark">Browse Products</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Start free trial</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature-band">
            <span className="eyebrow">Why ShopStore</span>
            <h2 className="display-lg" style={{ marginTop: "12px" }}>
              Everything you need to sell online
            </h2>
            <p className="body-md text-muted" style={{ marginTop: "16px", maxWidth: "600px" }}>
              Manage products, upload images, and showcase your catalog with a
              beautiful Shopify-inspired interface. Built with React MVC on the
              frontend and Express MVC on the backend.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
