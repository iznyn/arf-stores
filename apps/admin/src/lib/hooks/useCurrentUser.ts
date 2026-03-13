"use client";

import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data: session } = useSession();
  
  return {
    user: session?.user,
    userId: session?.user?.id,
    isAuthenticated: !!session,
  };
}
