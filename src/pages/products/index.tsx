import { useApi } from "../../hooks/useApi";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage = () => {
  const {
    data: products,
    loading,
    removeItem: deleteProduct,
  } = useApi<Product>({
    endpoint: "/products",
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((u) => (
            <tr key={u.id} className="text-center">
              <td>{u.name}</td>
              <td>{u.description}</td>
              <td>
                {u.image ? (
                  <img src={u.image} className="w-10 h-10 rounded" />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => deleteProduct(u.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
