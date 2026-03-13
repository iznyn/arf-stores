"use server";

import { prisma } from '@arfcodes/database';
import { Product } from '@/lib/types/actions/product.types';

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
