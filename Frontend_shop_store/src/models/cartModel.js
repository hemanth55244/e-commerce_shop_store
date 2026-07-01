import { apiRequest } from "./api";

export const fetchCart = async () => {
  const data = await apiRequest("/cart");
  return data.cart || { items: [] };
};

export const addToCart = async (productId, quantity = 1) => {
  return apiRequest("/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

export const removeFromCart = async (productId) => {
  return apiRequest(`/cart/remove/${productId}`, {
    method: "DELETE",
  });
};

export const createCheckoutOrder = async () => {
  return apiRequest("/cart/checkout", {
    method: "POST",
  });
};

export const confirmPayment = async (paymentData) => {
  return apiRequest("/cart/payment", {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
};
