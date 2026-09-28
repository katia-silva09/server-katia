'use client';

import { useEffect, useState } from 'react';


import {
  deleteProducto,
  getProductos,
} from '@/services/productos.service';
import { Producto } from '@/types/productos';
import { ProductoCreateDialog } from '@/components/ui/porductos/product-create-dialog';
import { ProductosTable } from '@/components/ui/porductos/productos-table';
import { ProductoDetailDialog } from '@/components/ui/porductos/producto-detail';
import { ProductoEditDialog } from '@/components/ui/porductos/producto-edit-dialog';


export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoVer, setProductoVer] =
    useState<Producto | null>(null);
  const [productoEditar, setProductoEditar] =
    useState<Producto | null>(null);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm(
      '¿Está seguro de eliminar este producto?',
    );

    if (!confirmar) {
      return;
    }

    await deleteProducto(id);
    await cargarProductos();
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Productos
            </h1>

            <p className="text-muted-foreground">
              Administración de productos
            </p>
          </div>

          <ProductoCreateDialog
            onCreated={cargarProductos}
          />
        </div>

        <ProductosTable
          productos={productos}
          onView={setProductoVer}
          onEdit={setProductoEditar}
          onDelete={handleDelete}
        />

        <ProductoDetailDialog
          producto={productoVer}
          open={productoVer !== null}
          onOpenChange={(open) => {
            if (!open) {
              setProductoVer(null);
            }
          }}
        />

        <ProductoEditDialog
          producto={productoEditar}
          open={productoEditar !== null}
          onUpdated={cargarProductos}
          onOpenChange={(open) => {
            if (!open) {
              setProductoEditar(null);
            }
          }}
        />
      </div>
    </main>
  );
}