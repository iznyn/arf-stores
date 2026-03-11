import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export interface LogoProps {
  className?: string;
  href?: string;
  collapsed?: boolean;
}

export const Logo = ({ className, href = '/', collapsed = false }: LogoProps) => {
  return (
    <Link 
      href={href} 
      className={cn("flex items-center gap-3 transition-opacity hover:opacity-80 group", className)}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background shadow-sm ring-1 ring-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Layers size={18} className="fill-current" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <Typography variant="h4" className="text-sm font-bold leading-none tracking-wide text-foreground">STORE ADMIN</Typography>
        </div>
      )}
    </Link>
  );
};
