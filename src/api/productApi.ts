import axiosClient from "./axiosClient";

export const productApi = {
  list: (params: any) => axiosClient.get("/products", { params }),

  get: (id: string) => axiosClient.get(`/products/${id}`),

  create: (data: any) => axiosClient.post("/products", data),

  update: (id: string, data: any) => axiosClient.put(`/products/${id}`, data),

  remove: (id: string) => axiosClient.delete(`/products/${id}`),

  uploadImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post(`/products/${id}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  addToCart: (variantId: string, quantity: number) =>
  axiosClient.post("/cart/add", {
    variantId,
    quantity,
  }),
};
