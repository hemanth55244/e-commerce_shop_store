import { Link } from "react-router-dom";
import { useAuthController } from "../../controllers/useAuthController";
import Button from "./Button";
import "../styles/navbar.css";

function Navbar() {
  const { user, isLoggedIn, logout } = useAuthController();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="ShopStore Logo" style={{ width: '24px', height: '24px' }} />
          ShopStore
        </Link>

        <nav className="navbar-links">
          <Link to="/products">Products</Link>
          {isLoggedIn && <Link to="/cart">Cart</Link>}
          {isLoggedIn && <Link to="/add-product">Add Product</Link>}
        </nav>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <span className="caption text-muted">Hi, {user?.name}</span>
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline-light">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Start free trial</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
