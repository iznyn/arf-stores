"use server";

import { signOut } from "@/lib/auth";
import { SignOutResult } from "@/lib/types/actions/auth.types";

export async function signOutUser(): Promise<SignOutResult> {
  try {
    await signOut({ redirect: false });
    return { success: true };
  } catch (error) {
    console.error("Failed to sign out:", error);
    return { error: "Failed to sign out" };
  }
}
