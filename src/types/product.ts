export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  price: number;
  currency: string;
  isDefault: boolean;
  inventory: any;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  status: string;
  variants: ProductVariant[];
  imageUrl?: string;
}

export interface ProductListResponse {
  items: Product[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
