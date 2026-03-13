"use server";

import { prisma } from "@arfcodes/database";
import { revalidatePath } from "next/cache";
import { ToggleUserStatusResult } from "@/lib/types/actions/user.types";

export async function toggleUserStatus(userId: string, isActive: boolean): Promise<ToggleUserStatusResult> {
  try {
    if (!userId) {
      return { error: 'User ID is required' };
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });

    revalidatePath('/users');
    return { success: true, user: {
      id: user.id,
      name: user.name || '',
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString().split('T')[0],
    } };
  } catch (error) {
    console.error('Failed to toggle user status:', error);
    return { error: 'Failed to toggle user status' };
  }
}
