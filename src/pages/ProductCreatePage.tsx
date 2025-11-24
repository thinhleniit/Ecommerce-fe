import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../api/productApi";

export default function ProductCreatePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleCreate = async () => {
    if (!name || !slug) {
      alert("Name and Slug is required");
      return;
    }

    // IMPORTANT: always send imageUrl field
    const dto = {
      name,
      slug,
      brand,
      status,
      description,
      variants: [
        {
          sku: slug + "-default",
          name: "Default",
          price: price,
          currency: "USD",
          isDefault: true,
          imageUrl: null, // <---- ensure field exists
        },
      ],
    };

    const res = await productApi.create(dto);

    navigate("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Product</h1>

      <div className="space-y-4">
        <input
          className="border p-3 w-full rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Slug"
          onChange={(e) => setSlug(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Brand"
          onChange={(e) => setBrand(e.target.value)}
        />

        <textarea
          className="border p-3 w-full rounded"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="border p-3 w-full rounded"
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <select
          className="border p-3 w-full rounded"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Archived">Archived</option>
        </select>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-3 rounded w-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}
