import { apiRequest } from "./api";

export const fetchProducts = async () => {
  const data = await apiRequest("/product/get/products");
  return data.products || data.product || [];
};

export const fetchProductById = async (id) => {
  const data = await apiRequest(`/product/get/products/${id}`);
  return data.product;
};

export const createProduct = async (formData) => {
  return apiRequest("/product/add/product", {
    method: "POST",
    body: formData,
  });
};

export const updateProduct = async (id, formData) => {
  return apiRequest(`/product/update/products/${id}`, {
    method: "PUT",
    body: formData,
  });
};

export const deleteProduct = async (id) => {
  return apiRequest(`/product/del/products/${id}`, {
    method: "DELETE",
  });
};
