"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@arfcodes/ui';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Determine a simple title based on the path
  const title = pathname === '/' 
    ? 'Dashboard' 
    : pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);

  return (
    <DashboardLayout currentPath={pathname} title={title}>
      {children}
    </DashboardLayout>
  );
}
