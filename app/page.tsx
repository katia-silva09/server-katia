'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/UI/button';
import { Input } from '@/components/ui/UI/input';
import { Label } from '@/components/ui/UI/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/UI/table';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  createdAt: string;
  updatedAt: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/productos`;
export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const cargarProductos = async () => {
    try {
      setError('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
      }

      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setError('No se pudo conectar con el backend');
      console.error(error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const limpiarFormulario = () => {
    setNombre('');
    setPrecio('');
    setCantidad('');
    setEditandoId(null);
  };

  const guardarProducto = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nombre || !precio || !cantidad) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      setCargando(true);
      setError('');

      const producto = {
        nombre,
        precio: Number(precio),
        cantidad: Number(cantidad),
      };

      const url = editandoId
        ? `${API_URL}/${editandoId}`
        : API_URL;

      const method = editandoId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar el producto');
      }

      await cargarProductos();
      limpiarFormulario();
    } catch (error) {
      setError('No se pudo guardar el producto');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const editarProducto = (producto: Producto) => {
    setEditandoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(String(producto.precio));
    setCantidad(String(producto.cantidad));
    setError('');
  };

  const eliminarProducto = async (id: number) => {
    const confirmar = window.confirm(
      '¿Está seguro de eliminar este producto?',
    );

    if (!confirmar) {
      return;
    }

    try {
      setError('');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar el producto');
      }

      await cargarProductos();
    } catch (error) {
      setError('No se pudo eliminar el producto');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de productos
          </h1>

          <p className="text-muted-foreground">
            CRUD de productos conectado al servidor NestJS.
          </p>
        </div>

        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            {editandoId ? 'Editar producto' : 'Nuevo producto'}
          </h2>

          <form
            onSubmit={guardarProducto}
            className="grid gap-4 md:grid-cols-3"
          >
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>

              <Input
                id="nombre"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Ej. Arroz"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">Precio</Label>

              <Input
                id="precio"
                type="number"
                step="0.01"
                min="0"
                value={precio}
                onChange={(event) => setPrecio(event.target.value)}
                placeholder="Ej. 50.50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad</Label>

              <Input
                id="cantidad"
                type="number"
                min="0"
                value={cantidad}
                onChange={(event) => setCantidad(event.target.value)}
                placeholder="Ej. 10"
              />
            </div>

            <div className="flex gap-2 md:col-span-3">
              <Button type="submit" disabled={cargando}>
                {cargando
                  ? 'Guardando...'
                  : editandoId
                    ? 'Actualizar'
                    : 'Agregar producto'}
              </Button>

              {editandoId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          {error && (
            <p className="mt-4 text-sm font-medium text-destructive">
              {error}
            </p>
          )}
        </section>

        <section className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Productos registrados
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
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
                      className="py-8 text-center text-muted-foreground"
                    >
                      No hay productos registrados.
                    </TableCell>
                  </TableRow>
                ) : (
                  productos.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>{producto.id}</TableCell>

                      <TableCell className="font-medium">
                        {producto.nombre}
                      </TableCell>

                      <TableCell>
                        C$ {Number(producto.precio).toFixed(2)}
                      </TableCell>

                      <TableCell>{producto.cantidad}</TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editarProducto(producto)}
                          >
                            Editar
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              eliminarProducto(producto.id)
                            }
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
        </section>
      </div>
    </main>
  );
}