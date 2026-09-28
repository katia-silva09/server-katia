import {
  CreateProducto,
  Producto,
  UpdateProducto,
} from '@/types/productos';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PRODUCTOS_URL = `${API_URL}/productos`;

console.log('API_URL:', API_URL);
console.log('PRODUCTOS_URL:', PRODUCTOS_URL);

export async function getProductos(): Promise<Producto[]> {
  console.log('GET productos:', PRODUCTOS_URL);

  try {
    const response = await fetch(PRODUCTOS_URL);

    console.log('GET productos status:', response.status);

    if (!response.ok) {
      throw new Error('No se pudieron obtener los productos');
    }

    const data = await response.json();

    console.log('GET productos data:', data);

    return data;
  } catch (error) {
    console.error('GET productos error:', error);
    throw error;
  }
}

export async function getProducto(id: number): Promise<Producto> {
  console.log('GET producto:', `${PRODUCTOS_URL}/${id}`);

  try {
    const response = await fetch(`${PRODUCTOS_URL}/${id}`);

    console.log('GET producto status:', response.status);

    if (!response.ok) {
      throw new Error('No se pudo obtener el producto');
    }

    const data = await response.json();

    console.log('GET producto data:', data);

    return data;
  } catch (error) {
    console.error('GET producto error:', error);
    throw error;
  }
}

export async function createProducto(
  data: CreateProducto,
): Promise<Producto> {
  console.log('POST producto:', PRODUCTOS_URL);
  console.log('POST producto data:', data);

  try {
    const response = await fetch(PRODUCTOS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('POST producto status:', response.status);

    if (!response.ok) {
      throw new Error('No se pudo crear el producto');
    }

    const responseData = await response.json();

    console.log('POST producto response:', responseData);

    return responseData;
  } catch (error) {
    console.error('POST producto error:', error);
    throw error;
  }
}

export async function updateProducto(
  id: number,
  data: UpdateProducto,
): Promise<Producto> {
  console.log('PATCH producto:', `${PRODUCTOS_URL}/${id}`);
  console.log('PATCH producto data:', data);

  try {
    const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('PATCH producto status:', response.status);

    if (!response.ok) {
      throw new Error('No se pudo actualizar el producto');
    }

    const responseData = await response.json();

    console.log('PATCH producto response:', responseData);

    return responseData;
  } catch (error) {
    console.error('PATCH producto error:', error);
    throw error;
  }
}

export async function deleteProducto(id: number): Promise<void> {
  console.log('DELETE producto:', `${PRODUCTOS_URL}/${id}`);

  try {
    const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
      method: 'DELETE',
    });

    console.log('DELETE producto status:', response.status);

    if (!response.ok) {
      throw new Error('No se pudo eliminar el producto');
    }

    console.log('DELETE producto realizado correctamente');
  } catch (error) {
    console.error('DELETE producto error:', error);
    throw error;
  }
}