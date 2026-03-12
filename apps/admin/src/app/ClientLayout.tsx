"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DashboardLayout } from '@arfcodes/ui';
import { signOut } from 'next-auth/react';

export function ClientLayout({ children, userName }: { children: React.ReactNode; userName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine a simple title based on the path
  const title = pathname === '/' 
    ? 'Dashboard' 
    : pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    router.refresh();
  };

  return (
    <DashboardLayout 
      currentPath={pathname} 
      title={title}
      onLogout={handleLogout}
      userName={userName}
    >
      {children}
    </DashboardLayout>
  );
}
