import { useApi } from "@/hooks/useApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export interface Order {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

const OrdersPage = () => {
  const { data: orders, loading } = useApi<Order>({ endpoint: "/orders" });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.productId}>
              <TableCell>{order.productId}</TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>
                {order.productImage ? (
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-10 h-10 rounded mx-auto"
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>${order.price.toLocaleString()}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => console.log("Delete", order.productId)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
