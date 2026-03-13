import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
});
