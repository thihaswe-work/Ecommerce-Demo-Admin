import { useApi } from "../../hooks/useApi";

export interface Order {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

const OrdersPage = () => {
  const { data: orders, loading } = useApi<Order>({
    endpoint: "/orders",
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((u) => (
            <tr key={u.productId} className="text-center">
              <td>{u.productName}</td>
              <td>{u.productId}</td>
              <td>
                {u.productImage ? (
                  <img src={u.productImage} className="w-10 h-10 rounded" />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{new Date(u.price).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => console.log(u.productId)}
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

export default OrdersPage;
