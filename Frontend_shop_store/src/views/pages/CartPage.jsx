import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useCartController } from "../../controllers/useCartController";
import { getImageUrl } from "../../models/api";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

function CartPage() {
  const {
    cart,
    loading,
    error,
    createCheckoutOrder,
    confirmPayment,
    removeItem,
  } = useCartController();

  const [paymentLoading, setPaymentLoading] = useState(false);

  const total = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart.items]
  );

  const handleCheckout = async () => {
    try {
      setPaymentLoading(true);

      // 1. Create order on backend
      const data = await createCheckoutOrder();

      // 2. Open Razorpay checkout modal
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amountInPaise,
        currency: data.currency || "INR",
        name: "ShopStore",
        description: "Purchase from ShopStore",
        order_id: data.order.id,
        handler: async (response) => {
          // 3. Confirm payment on backend (verifies signature)
          try {
            await confirmPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            // toast.success is already fired in the controller
          } catch (err) {
            toast.error("❌ Payment verification failed. Please contact support.");
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            toast.warning("Payment was cancelled. Your cart is still saved.");
          },
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#1a1a2e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        toast.error(`❌ Payment failed: ${response.error.description}`);
        setPaymentLoading(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(`Checkout error: ${err.message}`);
      setPaymentLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">Cart</span>
          <h1 className="display-lg">Your Shopping Cart</h1>
          <p className="body-md text-muted">
            Review items in your cart and proceed to secure Razorpay payment.
          </p>
        </div>

        {loading && <p className="loading-state">Loading cart...</p>}
        {error && <div className="alert alert-error" style={{ marginBottom: "16px" }}>{error}</div>}

        {!loading && cart.items.length === 0 && (
          <div className="empty-state">
            <p className="heading-md">Your cart is empty.</p>
            <p className="caption text-muted" style={{ marginBottom: "24px" }}>
              Add a product and come back to checkout.
            </p>
            <Link to="/products">
              <Button variant="primary">Browse Products</Button>
            </Link>
          </div>
        )}

        {!loading && cart.items.length > 0 && (
          <div>
            <div className="product-grid">
              {cart.items.map((item) => (
                <article className="product-card" key={item.product}>
                  {item.image ? (
                    <img src={getImageUrl(item.image)} alt={item.name} className="product-card-image" />
                  ) : (
                    <div
                      className="product-card-image product-card-placeholder"
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                    >
                      <span style={{ fontSize: "40px" }}>📦</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa", marginTop: "8px" }}>No Image</span>
                    </div>
                  )}
                  <div className="product-card-body">
                    <span className="pill-tag">In Cart</span>
                    <h3 className="heading-md">{item.name}</h3>
                    <p className="body-md">Qty: {item.quantity}</p>
                    <p className="product-price">₹{Number(item.price).toLocaleString("en-IN")}</p>
                    <p className="caption text-muted">
                      Subtotal: ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <div className="hero-actions">
                      <Button
                        variant="outline-light"
                        onClick={() => removeItem(item.product)}
                        disabled={loading}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div className="form-card" style={{ marginTop: "40px", maxWidth: "480px" }}>
              <span className="eyebrow">Order Summary</span>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {cart.items.map((item) => (
                  <div key={item.product} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="body-md">{item.name} × {item.quantity}</span>
                    <span className="body-md">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <hr style={{ border: "none", borderTop: "1px solid var(--color-hairline-light)" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="body-lg">Total</span>
                  <span className="body-lg">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Button
                  variant="primary"
                  onClick={handleCheckout}
                  disabled={paymentLoading || loading}
                  style={{ flex: 1 }}
                >
                  {paymentLoading ? "Opening Payment..." : "Pay with Razorpay"}
                </Button>
                <Link to="/products">
                  <Button variant="outline-light">Continue Shopping</Button>
                </Link>
              </div>

              <p className="caption text-muted" style={{ marginTop: "12px" }}>
                🔒 Secured by Razorpay — 100+ payment options supported
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
