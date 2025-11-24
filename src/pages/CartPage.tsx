import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cartApi";
import { apiRoot } from "../api/axiosClient";
import { useCart } from "../store/cartStore";

export default function CartPage() {
  const queryClient = useQueryClient();

  // Zustand sync
  const removeLocal = useCart((s) => s.remove);
  const clearLocal = useCart((s) => s.clear);

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.getCart().then((res) => res.data),
  });

  const removeMutation = useMutation({
    mutationFn: (variantId: string) => cartApi.remove(variantId),
    onSuccess: (_, variantId) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      removeLocal(variantId); // sync local badge
    },
  });

  const clearMutation = useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      clearLocal(); // sync local badge
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data || !data.items || data.items.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Your cart is empty
      </p>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {data.items.map((item: any) => (
          <div
            key={item.productId}
            className="flex gap-4 border rounded p-4 bg-white shadow-sm"
          >
            {/* Image */}
            <img
              src={
                item.imageUrl
                  ? `${apiRoot}${item.imageUrl}`
                  : `https://placehold.co/120?text=${item.name}`
              }
              className="w-24 h-24 rounded object-contain bg-gray-100 border"
            />

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500">{item.brand}</p>

              <p className="mt-1 font-medium text-lg">${item.price}</p>

              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => removeMutation.mutate(item.variantId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          onClick={() => clearMutation.mutate()}
        >
          Clear Cart
        </button>

        <button className="px-6 py-3 bg-green-600 text-white rounded text-lg font-semibold hover:bg-green-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
