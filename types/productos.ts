export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProducto {
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface UpdateProducto {
  nombre?: string;
  precio?: number;
  cantidad?: number;
}