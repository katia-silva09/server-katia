import { CreateProducto, Producto, UpdateProducto } from "@/types/productos";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PRODUCTOS_URL = `${API_URL}/productos`;

export async function getProductos(): Promise<Producto[]> {
  const response = await fetch(PRODUCTOS_URL);

  if (!response.ok) {
    throw new Error('No se pudieron obtener los productos');
  }

  return response.json();
}

export async function getProducto(id: number): Promise<Producto> {
  const response = await fetch(`${PRODUCTOS_URL}/${id}`);

  if (!response.ok) {
    throw new Error('No se pudo obtener el producto');
  }

  return response.json();
}

export async function createProducto(
  data: CreateProducto,
): Promise<Producto> {
  const response = await fetch(PRODUCTOS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('No se pudo crear el producto');
  }

  return response.json();
}

export async function updateProducto(
  id: number,
  data: UpdateProducto,
): Promise<Producto> {
  const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('No se pudo actualizar el producto');
  }

  return response.json();
}

export async function deleteProducto(id: number): Promise<void> {
  const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar el producto');
  }
}