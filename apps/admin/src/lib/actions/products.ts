'use server';

import { prisma } from '@arfcodes/database';
import { Product } from '@/app/products/columns';
import { revalidatePath } from 'next/cache';

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        inventory: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return products.map((product) => {
      // Calculate total stock across all stores
      const totalStock = product.inventory.reduce((acc, inv) => acc + inv.quantity, 0);

      return {
        id: product.id,
        name: product.name,
        sku: product.sku,
        // Convert Decimal to number for the UI
        price: Number(product.currentSellingPrice),
        stock: totalStock,
        status: product.isActive ? 'active' : 'archived',
        category: product.category?.name || 'Uncategorized',
        lastUpdated: product.updatedAt.toISOString().split('T')[0],
      };
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function createProduct(formData: FormData) {
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
    return { success: true, product };
  } catch (error) {
    console.error('Failed to create product:', error);
    return { error: 'Failed to create product' };
  }
}
