import { useState, useEffect, useCallback } from "react";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  deleteProduct,
} from "../models/productModel";

export const useProductController = ({ autoLoad = true } = {}) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProductById = useCallback(async (id) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (formData) => {
    setLoading(true);
    setError("");
    try {
      await createProduct(formData);
      await loadProducts();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setLoading(true);
    setError("");
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      loadProducts();
    }
  }, [autoLoad, loadProducts]);

  return {
    products,
    product,
    loading,
    error,
    loadProducts,
    loadProductById,
    addProduct,
    removeProduct,
  };
};
