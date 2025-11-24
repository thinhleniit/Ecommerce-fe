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
  const [file, setFile] = useState<File | null>(null);

  const handleCreate = async () => {
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
          price: 0,
          currency: "USD",
          isDefault: true,
        },
      ],
    };

    const res = await productApi.create(dto);

    if (file) {
      await productApi.uploadImage(res.data.id, file);
    }

    navigate("/products");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>

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

        <select
          className="border p-3 w-full rounded"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Archived">Archived</option>
        </select>

        <div>
          <label className="block mb-2">Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}
