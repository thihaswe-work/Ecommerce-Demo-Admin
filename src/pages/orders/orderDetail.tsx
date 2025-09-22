import { useParams } from "react-router-dom";
import type { Order, OrderItem } from "./index"; // adjust path to your types
import { useApi } from "@/hooks/useApi";

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // Use your hook for a single order

  //     const {
  //     data: order,
  //     loading,
  //     error,
  //     refetch,
  //   } = useFetchSingle<Order>({
  //     endpoint: `/orders/${id}`,
  //   });

  const { data, loading } = useApi<Order>({
    endpoint: `/orders/${id}`, // fetch single order
    transform: (res) => (res ? [res] : []), // wrap single object into array
  });

  const order = data[0];

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;
  console.log;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <p>
        <strong>User ID:</strong> {order.userId}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
      </p>

      <h2 className="text-xl font-semibold mt-4">Items</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 border">Product</th>
            <th className="px-2 py-1 border">Price</th>
            <th className="px-2 py-1 border">Quantity</th>
            <th className="px-2 py-1 border">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item: OrderItem) => (
            <tr key={item.id}>
              <td className="px-2 py-1 border">{item.productName}</td>
              <td className="px-2 py-1 border">${item.price.toFixed(2)}</td>
              <td className="px-2 py-1 border">{item.quantity}</td>
              <td className="px-2 py-1 border">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailPage;
