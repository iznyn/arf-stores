"use server";

import { prisma } from "@arfcodes/database";
import { revalidatePath } from "next/cache";
import { DeleteUserResult } from "@/lib/types/actions/user.types";

export async function deleteUser(userId: string): Promise<DeleteUserResult> {
  try {
    if (!userId) {
      return { error: 'User ID is required' };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { error: 'Failed to delete user' };
  }
}
