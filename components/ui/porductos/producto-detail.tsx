'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { Button } from '../ui/button';

import type { Producto } from '@/types/productos';

interface ProductoDetailDialogProps {
  readonly producto: Producto | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}


export function ProductoDetailDialog({
  producto,
  open,
  onOpenChange,
}: ProductoDetailDialogProps) {
  if (!producto) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalle del producto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">


          <div>
            <p className="text-sm text-muted-foreground">
              Nombre
            </p>
            <p className="font-medium">{producto.nombre}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Precio
            </p>
            <p className="font-medium">
              C$ {Number(producto.precio).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Cantidad
            </p>
            <p className="font-medium">
              {producto.cantidad}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Fecha de creación
            </p>
            <p className="font-medium">
              {new Date(producto.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}