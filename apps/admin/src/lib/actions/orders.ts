'use server';

import { prisma } from '@arfcodes/database';
import { Order } from '@/app/orders/columns';

export async function getOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map((order) => {
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        customer: order.customer?.name || 'Unknown Customer',
        status: order.status.toLowerCase() as Order['status'],
        total: Number(order.totalAmount),
        date: order.createdAt.toISOString().split('T')[0],
        items: order.items.length,
      };
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
}
