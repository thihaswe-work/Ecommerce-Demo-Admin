"use client";

import { ConfirmDialog } from "@/components/ConfirmationDialog";
import { DataTable } from "@/components/DataTable";
import { EntityForm } from "@/components/EntityForm";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import type { User } from "@/types/type";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CopyIcon,
  ListChevronsDownUp,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function UsersPage() {
  const { data, loading, removeItem, createItem, updateItem } = useApi<User>({
    endpoint: "/users",
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const navigate = useNavigate();
  const columns: ColumnDef<User>[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        const user = row.original as User;
        return (
          <div>
            {user.firstName} {user.lastName}
          </div>
        );
      },
    },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) =>
        row.getValue("avatar") ? (
          <img
            src={row.getValue("avatar") as string}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            N/A
          </div>
        ),
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2 justify-end">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(user.email);
                toast.success("UserEmail copied to clipboard");
              }}
            >
              <CopyIcon className="w-4 h-4" />
            </Button>
            {/* 👁 View Details */}
            <Button
              size="icon"
              variant="outline"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              <ListChevronsDownUp className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setDeleteTarget(user)}
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
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <DataTable columns={columns} data={data} />

      {/* Form */}
      <EntityForm<User>
        open={formOpen}
        title={editing ? "Edit User" : "Create User"}
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", required: true },
          { name: "avatar", label: "Avatar URL" },
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
        title="Delete User"
        description={`Are you sure you want to delete "${
          (deleteTarget?.firstName, " ", deleteTarget?.lastName)
        }"?`}
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
