"use server";

import { prisma } from '@arfcodes/database';
import { revalidatePath } from 'next/cache';
import { CreateProductResult } from '@/lib/types/actions/product.types';

export async function createProduct(formData: FormData): Promise<CreateProductResult> {
  try {
    const name = formData.get('name') as string;
    const sku = formData.get('sku') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const categoryName = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!name || !sku || isNaN(price) || isNaN(stock) || !categoryName) {
      return { error: 'Invalid input data' };
    }

    // 1. Find or Create Category
    let category = await prisma.category.findFirst({
      where: { name: { equals: categoryName, mode: 'insensitive' } }
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName }
      });
    }

    // 2. Find a default store (or create one if none exists)
    let store = await prisma.store.findFirst();
    if (!store) {
      store = await prisma.store.create({
        data: {
          name: 'Main Store',
          code: 'MAIN',
        }
      });
    }

    // 3. Create Product
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        description,
        categoryId: category.id,
        currentSellingPrice: price,
        currentCostPrice: 0, // Default cost price
        inventory: {
          create: {
            storeId: store.id,
            quantity: stock,
            lowStockThreshold: 10
          }
        }
      }
    });

    revalidatePath('/products');
    return { success: true, product: {
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: Number(product.currentSellingPrice),
      stock: stock,
      status: product.isActive ? 'active' : 'archived',
      category: category.name,
      lastUpdated: product.updatedAt.toISOString().split('T')[0],
    } };
  } catch (error) {
    console.error('Failed to create product:', error);
    return { error: 'Failed to create product' };
  }
}
