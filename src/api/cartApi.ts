import axiosClient from "./axiosClient";

export const cartApi = {
  getCart: () => axiosClient.get("/cart"),

  addToCart: (productId: string, quantity: number) =>
    axiosClient.post("/cart/add", { productId, quantity }),

  remove: (variantId: string) =>
  axiosClient.delete(`/cart/${variantId}`),

  clear: () => axiosClient.post("/cart/clear"),
};
