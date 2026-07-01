import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  fetchCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  createCheckoutOrder as apiCreateCheckoutOrder,
  confirmPayment as apiConfirmPayment,
} from "../models/cartModel";

export const useCartController = ({ autoLoad = true } = {}) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkoutData, setCheckoutData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCart();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    setError("");
    try {
      const data = await apiAddToCart(productId, quantity);
      setCart(data.cart);
      toast.success("🛒 Product added to cart!");
      return data.cart;
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to add to cart: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRemoveFromCart(productId);
      setCart(data.cart);
      toast.info("Item removed from cart.");
      return data.cart;
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to remove item: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiCreateCheckoutOrder();
      setCheckoutData(data);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error(`Checkout failed: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (paymentData) => {
    setLoading(true);
    setError("");
    try {
      const data = await apiConfirmPayment(paymentData);
      setPaymentStatus(data.message);
      setCart({ items: [] });
      toast.success("🎉 Payment successful! Your order has been placed.");
      return data;
    } catch (err) {
      setError(err.message);
      toast.error(`Payment verification failed: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      loadCart();
    }
  }, [autoLoad, loadCart]);

  return {
    cart,
    loading,
    error,
    checkoutData,
    paymentStatus,
    loadCart,
    addToCart,
    removeItem,
    createCheckoutOrder,
    confirmPayment,
  };
};
