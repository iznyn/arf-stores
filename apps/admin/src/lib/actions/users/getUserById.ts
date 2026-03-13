"use server";

import { prisma } from "@arfcodes/database";
import { User } from "@/lib/types/actions/user.types";

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name || '',
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString().split('T')[0],
    };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}
