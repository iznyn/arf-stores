"use server";

import { prisma } from "@arfcodes/database";
import { User } from "@/lib/types/actions/user.types";

export async function getUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name || '',
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString().split('T')[0],
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}
