import { Routes, Route } from "react-router-dom";
import Navbar from "./views/components/Navbar";
import Footer from "./views/components/Footer";
import HomePage from "./views/pages/HomePage";
import ProductsPage from "./views/pages/ProductsPage";
import ProductDetailPage from "./views/pages/ProductDetailPage";
import CartPage from "./views/pages/CartPage";
import LoginPage from "./views/pages/LoginPage";
import RegisterPage from "./views/pages/RegisterPage";
import AddProductPage from "./views/pages/AddProductPage";
import ProtectedRoute from "./views/components/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
