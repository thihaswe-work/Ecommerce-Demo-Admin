import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

interface Field {
  name: string;
  label: string;
  type?: string; // text, number, etc.
}

interface EntityFormProps<T extends object> {
  open: boolean;
  title: string;
  fields: Field[];
  initialData?: Partial<T> | null;
  onClose: () => void;
  onSubmit: (values: Partial<T>) => void;
}

export function EntityForm<T extends object>({
  open,
  title,
  fields,
  initialData,
  onClose,
  onSubmit,
}: EntityFormProps<T>) {
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const filled = Object.fromEntries(
        fields.map((f) => [f.name, String((initialData as any)[f.name] ?? "")])
      );
      setForm(filled);
    } else {
      setForm(Object.fromEntries(fields.map((f) => [f.name, ""])));
    }
  }, [initialData, fields]);

  const handleSubmit = () => {
    const parsed = Object.fromEntries(
      fields.map((f) => [
        f.name,
        f.type === "number" ? Number(form[f.name]) : form[f.name],
      ])
    );
    onSubmit(parsed as Partial<T>);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {fields.map((f) => (
            <Input
              key={f.name}
              type={f.type || "text"}
              placeholder={f.label}
              value={form[f.name] || ""}
              onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            />
          ))}
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
