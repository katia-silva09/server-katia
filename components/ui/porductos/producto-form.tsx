import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CreateProducto, Producto } from "@/types/productos";

interface ProductoFormProps {
  readonly producto?: Producto | null;
  readonly onSubmit: (data: CreateProducto) => Promise<void>;
  readonly onCancel: () => void;
  readonly submitText: string;
}

export function ProductoForm({
  producto,
  onSubmit,
  onCancel,
  submitText,
}: ProductoFormProps) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setPrecio(String(producto.precio));
      setCantidad(String(producto.cantidad));
    } else {
      setNombre('');
      setPrecio('');
      setCantidad('');
    }
  }, [producto]);

  const handleSubmit = async (
  event: React.SubmitEvent,
) => {
    event.preventDefault();

    if (!nombre.trim() || !precio || !cantidad) {
      return;
    }

    try {
      setCargando(true);

      await onSubmit({
        nombre: nombre.trim(),
        precio: Number(precio),
        cantidad: Number(cantidad),
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>

        <Input
          id="nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          placeholder="Ej. Arroz"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="precio">Precio</Label>

        <Input
          id="precio"
          type="number"
          min="0"
          step="0.01"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
          placeholder="Ej. 50.00"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cantidad">Cantidad</Label>

        <Input
          id="cantidad"
          type="number"
          min="0"
          step="1"
          value={cantidad}
          onChange={(event) => setCantidad(event.target.value)}
          placeholder="Ej. 10"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={cargando}
        >
          Cancelar
        </Button>

        <Button type="submit" disabled={cargando}>
          {cargando ? 'Guardando...' : submitText}
        </Button>
      </div>
    </form>
  );
}