import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../api/productApi";
import { apiRoot } from "../api/axiosClient";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.get(id!).then((res) => res.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSlug(data.slug);
      setBrand(data.brand);
      setStatus(data.status);
      setDescription(data.description);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (dto: any) => productApi.update(id!, dto),
    onSuccess: async () => {
      if (file) {
        await productApi.uploadImage(id!, file);
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/products");
    },
  });

  const handleSubmit = () => {
    if (!name || !slug) {
      alert("Name and Slug is required");
      return;
    }

    const dto = {
      name,
      slug,
      brand,
      description,
      status,
      variants: [],
    };

    updateMutation.mutate(dto);
  };

  const handleFileChange = (e: any) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);

    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Product</h1>

      <div className="space-y-5">
        <input
          className="border p-3 w-full rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <textarea
          className="border p-3 w-full rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-3 w-full rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Archived">Archived</option>
        </select>

        {/* Current Image */}
        {data?.imageUrl && (
          <div>
            <p className="font-medium mb-2">Current Image</p>
            <img
              src={`${apiRoot}${data.imageUrl}`}
              className="w-40 h-40 rounded object-cover border shadow"
            />
          </div>
        )}

        {/* Upload New Image */}
        <div>
          <label className="block font-medium mb-2">Upload New Image</label>

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
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-3 rounded w-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
