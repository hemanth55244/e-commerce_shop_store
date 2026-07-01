import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <h3 className="heading-md text-on-dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="ShopStore Logo" style={{ width: '24px', height: '24px', filter: 'invert(1)' }} />
            ShopStore
          </h3>
          <p className="caption footer-muted">
            MERN stack e-commerce platform built with MVC architecture.
          </p>
        </div>
        <div className="footer-links">
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <p className="caption footer-muted">
          &copy; {new Date().getFullYear()} ShopStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
