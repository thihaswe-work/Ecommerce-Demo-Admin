// import { useApi } from "@/hooks/useApi";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// export interface Order {
//   productId: string;
//   productName: string;
//   productImage: string;
//   quantity: number;
//   price: number;
// }

// const OrdersPage = () => {
//   const { data: orders, loading } = useApi<Order>({ endpoint: "/orders" });

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Orders</h1>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Id</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Image</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Quantity</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {orders.map((order) => (
//             <TableRow key={order.productId}>
//               <TableCell>{order.productId}</TableCell>
//               <TableCell>{order.productName}</TableCell>
//               <TableCell>
//                 {order.productImage ? (
//                   <img
//                     src={order.productImage}
//                     alt={order.productName}
//                     className="w-10 h-10 rounded mx-auto"
//                   />
//                 ) : (
//                   "N/A"
//                 )}
//               </TableCell>
//               <TableCell>${order.price.toLocaleString()}</TableCell>
//               <TableCell>{order.quantity}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => console.log("Delete", order.productId)}
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}

//           {orders.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={6} className="text-center text-gray-500">
//                 No orders found.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default OrdersPage;
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { EntityForm } from "@/components/EntityForm";
import { ConfirmDialog } from "@/components/ConfirmationDialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
}

export default function OrdersPage() {
  const { data, loading, removeItem, createItem, updateItem } = useApi<Order>({
    endpoint: "/orders",
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);

  const columns: ColumnDef<Order>[] = [
    { accessorKey: "userId", header: "User ID" },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <div className="text-right font-medium">${row.getValue("total")}</div>
      ),
    },
    { accessorKey: "status", header: "Status" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex gap-2 justify-end">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setEditing(order);
                setFormOpen(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setDeleteTarget(order)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Order
        </Button>
      </div>

      <DataTable columns={columns} data={data} />

      {/* Form */}
      <EntityForm<Order>
        open={formOpen}
        title={editing ? "Edit Order" : "Create Order"}
        fields={[
          { name: "userId", label: "User ID" },
          { name: "total", label: "Total", type: "number" },
          { name: "status", label: "Status" },
        ]}
        initialData={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={async (values) => {
          if (editing) {
            await updateItem(editing.id, values);
          } else {
            await createItem(values);
          }
          setFormOpen(false);
          setEditing(null);
        }}
      />

      {/* Delete */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Order"
        description={`Are you sure you want to delete order #${deleteTarget?.id}?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (deleteTarget) {
            await removeItem(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
