'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { updateProducto } from '@/services/productos.service';

import type {
  CreateProducto,
  Producto,
} from '@/types/productos';

import { ProductoForm } from './producto-form';

interface ProductoEditDialogProps {
  readonly producto: Producto | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onUpdated: () => Promise<void>;
}

export function ProductoEditDialog({
  producto,
  open,
  onOpenChange,
  onUpdated,
}: ProductoEditDialogProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (data: CreateProducto) => {
    if (!producto) {
      return;
    }

    try {
      setError('');

      await updateProducto(producto.id, data);
      await onUpdated();

      onOpenChange(false);
    } catch (error) {
      console.error(error);
      setError('No se pudo actualizar el producto');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <ProductoForm
          producto={producto}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitText="Actualizar"
        />
      </DialogContent>
    </Dialog>
  );
}