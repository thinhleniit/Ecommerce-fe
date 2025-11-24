import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { productApi } from "../api/productApi";
import { useAuth } from "../store/authStore";
import { apiRoot } from "../api/axiosClient";

export default function ProductListPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const isAdmin = role === "Admin";

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      productApi.list({ PageNumber: 1, PageSize: 20 }).then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          to="/admin/manage/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Product
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Brand</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((p: any) => (
            <tr key={p.id} className="border-b">
              <td className="p-3">
                <img
                  src={
                    p.imageUrl
                      ? `${apiRoot}${p.imageUrl}`
                      : `https://placehold.co/300x200?text=${p.name}`
                  }
                  className="rounded w-20 h-20 object-cover"
                />
              </td>

              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.brand}</td>
              <td className="p-3">{p.status}</td>

              <td className="p-3 text-right">
                {isAdmin && (
                  <>
                    <Link
                      to={`/admin/manage/edit/${p.id}`}
                      className="text-blue-600 mr-3 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteMutation.mutate(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
