"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { EntityForm } from "@/components/EntityForm";
import { ConfirmDialog } from "@/components/ConfirmationDialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export default function ProductsPage() {
  const { data, loading, removeItem, createItem, updateItem } = useApi<Product>(
    { endpoint: "/products" }
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const columns: ColumnDef<Product>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.getValue("price") as number)}
        </div>
      ),
    },
    { accessorKey: "stock", header: "Stock" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex gap-2 justify-end">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setEditing(product);
                setFormOpen(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setDeleteTarget(product)}
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
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Product
        </Button>
      </div>

      <DataTable columns={columns} data={data} />

      {/* Form */}
      <EntityForm<Product>
        open={formOpen}
        title={editing ? "Edit Product" : "Create Product"}
        fields={[
          { name: "name", label: "Name" },
          { name: "category", label: "Category" },
          { name: "price", label: "Price", type: "number" },
          { name: "stock", label: "Stock", type: "number" },
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
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
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
