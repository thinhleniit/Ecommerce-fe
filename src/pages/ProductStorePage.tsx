import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/productApi";
import { useCart } from "../store/cartStore";
import { apiRoot } from "../api/axiosClient";
import { useState } from "react";

export default function ProductStorePage() {
  const addToCart = useCart((state) => state.add);
  const [toast, setToast] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["store-products"],
    queryFn: () =>
      productApi.list({ PageNumber: 1, PageSize: 30 }).then((res) => res.data),
  });

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 1400);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {/* Toast Notify */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
          Added to cart!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.items
          .filter((p: any) => p.status !== "Archived")
          .map((p: any) => {
            const v = p.variants.find((v: any) => v.isDefault) || p.variants[0];

            return (
              <div key={p.id} className="bg-white shadow rounded-lg p-4 border">
                <img
                  src={
                    p.imageUrl
                      ? `${apiRoot}${p.imageUrl}`
                      : `https://placehold.co/300x200?text=${p.name}`
                  }
                  className="rounded mb-3 w-full h-44 object-contain bg-white"
                />

                <h3 className="text-lg font-bold leading-tight">{p.name}</h3>
                <p className="text-gray-400 text-sm">{p.brand}</p>

                <p className="text-xl font-semibold mt-2">${v.price}</p>

                <button
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  onClick={async () => {
                    try {
                      await productApi.addToCart(v.id, 1);

                      // update UI local (optional)
                      addToCart({
                        productId: p.id,
                        name: p.name,
                        price: v.price,
                        quantity: 1,
                      });

                      showToast();
                    } catch (err) {
                      console.error("Add to cart failed", err);
                    }
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
