'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';


import { createProducto } from '@/services/productos.service';


import { ProductoForm } from './producto-form';
import { CreateProducto } from '@/types/productos';

interface ProductoCreateDialogProps {
  readonly onCreated: () => Promise<void>;
}

export function ProductoCreateDialog({
  onCreated,
}: ProductoCreateDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: CreateProducto) => {
    await createProducto(data);
    await onCreated();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90">
        Agregar producto
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar producto</DialogTitle>
        </DialogHeader>

        <ProductoForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          submitText="Agregar producto"
        />
      </DialogContent>
    </Dialog>
  );
}