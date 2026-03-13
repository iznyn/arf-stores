"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { LoginResult } from "@/lib/types/actions/auth.types";

export async function login(email: string, password: string): Promise<LoginResult> {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials" };
    }
    return { error: "An error occurred" };
  }
}
