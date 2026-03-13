"use server";

import { prisma, UserRole } from "@arfcodes/database";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { CreateUserResult } from "@/lib/types/actions/user.types";

export async function createUser(formData: FormData): Promise<CreateUserResult> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!name || !email || !password || !role) {
      return { error: 'All fields are required' };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as UserRole,
        isActive: true,
      },
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
    console.error('Failed to create user:', error);
    return { error: 'Failed to create user' };
  }
}
