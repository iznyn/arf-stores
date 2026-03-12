"use client";

import React, { useState } from 'react';
import { Sidebar } from '../../organisms/Sidebar';
import { Header } from '../../organisms/Header';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  title?: string;
  onLogout?: () => void;
  userName?: string;
}

export const DashboardLayout = ({ 
  children, 
  currentPath = '/',
  title = 'Dashboard',
  onLogout,
  userName
}: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground font-sans antialiased">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          currentPath={currentPath}
        />
      </div>

      {/* Main content */}
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <Header 
          title={title}
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={onLogout}
          userName={userName}
        />
        
        <main className="flex-1 overflow-auto bg-background p-8">
          <div className="mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
