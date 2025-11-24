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

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);

    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

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

    // 1) Create product
    const res = await productApi.create(dto);

    // 2) Upload image (Backend will update product Image)
    if (file) {
      await productApi.uploadImage(res.data.id, file);
    }

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

        <div>
          <label className="block font-medium mb-2">Product Image</label>

          {previewUrl && (
            <img
              src={previewUrl}
              className="w-40 h-40 rounded object-cover border shadow mb-3"
            />
          )}

          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              <polyline points="16 12 12 8 8 12" />
              <line x1="12" y1="8" x2="12" y2="20" />
            </svg>
            Choose Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

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
