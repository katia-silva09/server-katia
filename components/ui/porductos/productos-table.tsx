'use client';

import { Producto } from '@/types/productos';
import { Button } from '../ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';


interface ProductosTableProps {
  readonly productos: Producto[];
  readonly onView: (producto: Producto) => void;
  readonly onEdit: (producto: Producto) => void;
  readonly onDelete: (id: number) => void;
}

export function ProductosTable({
  productos,
  onView,
  onEdit,
  onDelete,
}: ProductosTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead className="text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productos.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No hay productos registrados.
              </TableCell>
            </TableRow>
          ) : (
            productos.map((producto) => (
              <TableRow key={producto.id}>

                <TableCell className="font-medium">
                  {producto.nombre}
                </TableCell>

                <TableCell>
                  C$ {Number(producto.precio).toFixed(2)}
                </TableCell>

                <TableCell>
                  {producto.cantidad}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(producto)}
                    >
                      Ver
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(producto)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}