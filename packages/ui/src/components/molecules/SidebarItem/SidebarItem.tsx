import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Badge } from '../../atoms/Badge';

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  badge?: string;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive = false,
  isCollapsed = false,
  badge,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 ease-in-out",
        "hover:bg-secondary/80 hover:text-foreground",
        isActive ? "bg-secondary text-foreground font-medium shadow-sm" : "text-muted-foreground",
        isCollapsed ? "justify-center" : "justify-start"
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon size={18} className={cn("shrink-0 transition-colors", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
      
      {!isCollapsed && (
        <div className="flex flex-1 items-center justify-between overflow-hidden">
          <span className="truncate">{label}</span>
          {badge && (
            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] pointer-events-none">
              {badge}
            </Badge>
          )}
        </div>
      )}
    </Link>
  );
};
