export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "archived";
  category: string;
  lastUpdated: string;
};

export type CreateProductInput = {
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
};

export type CreateProductResult = {
  success?: boolean;
  error?: string;
  product?: Product;
};
