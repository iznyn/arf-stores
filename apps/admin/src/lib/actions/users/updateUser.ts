"use server";

import { prisma, UserRole } from "@arfcodes/database";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { UpdateUserResult } from "@/lib/types/actions/user.types";

export async function updateUser(formData: FormData): Promise<UpdateUserResult> {
  try {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const password = formData.get('password') as string;

    if (!id || !name || !email || !role) {
      return { error: 'Required fields are missing' };
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id },
      },
    });

    if (existingUser) {
      return { error: 'Email is already taken by another user' };
    }

    const updateData: any = {
      name,
      email,
      role: role as UserRole,
    };

    // Only update password if provided
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
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
    console.error('Failed to update user:', error);
    return { error: 'Failed to update user' };
  }
}
