"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { ClientLayout } from './ClientLayout';

export function LayoutWrapper({ 
  children, 
  userName 
}: { 
  children: React.ReactNode; 
  userName?: string;
}) {
  const pathname = usePathname();
  
  // Don't wrap login page with dashboard layout
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <ClientLayout userName={userName}>
      {children}
    </ClientLayout>
  );
}
