import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Wallet, 
  Settings,
  Store,
  Truck
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Logo } from '../../molecules/Logo';
import { SidebarItem } from '../../molecules/SidebarItem';

export interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  currentPath?: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Inventory', href: '/inventory', icon: Store },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, badge: '12' },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Finances', href: '/financials', icon: Wallet },
  { name: 'Distributors', href: '/distributors', icon: Truck },
];

export const Sidebar = ({ 
  className, 
  isCollapsed = false,
  currentPath = '/'
}: SidebarProps) => {
  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-14 shrink-0 items-center px-4 pt-2">
        <Logo collapsed={isCollapsed} />
      </div>
      
      <div className="flex-1 overflow-auto py-6 px-3">
        <nav className="grid gap-1">
          <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider">
            {!isCollapsed && "Menu"}
          </div>
          {navigation.map((item) => (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              label={item.name}
              href={item.href}
              isActive={currentPath === item.href || (item.href !== '/' && currentPath.startsWith(`${item.href}`))}
              isCollapsed={isCollapsed}
              badge={item.badge}
            />
          ))}
        </nav>
      </div>
      
      <div className="mt-auto border-t border-border/50 p-4">
        <SidebarItem
          icon={Settings}
          label="Settings"
          href="/settings"
          isActive={currentPath === '/settings'}
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
};
