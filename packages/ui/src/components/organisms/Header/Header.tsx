import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Avatar } from '../../atoms/Avatar';
import { cn } from '../../../lib/utils';

export interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
  title?: string;
}

export const Header = ({ className, onMenuClick, title = 'Dashboard' }: HeaderProps) => {
  return (
    <header className={cn("sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md supports-backdrop-filter:bg-background/60", className)}>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:border-input transition-all"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-primary border border-background"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        
        <div className="h-4 w-px bg-border/50 hidden sm:block mx-1"></div>
        
        <Button variant="ghost" className="relative flex items-center gap-2 px-1 h-9 hover:bg-transparent">
          <Avatar className="h-7 w-7 border border-border" fallback="AD" />
          <span className="hidden text-sm font-medium sm:block text-foreground ml-1">Admin</span>
        </Button>
      </div>
    </header>
  );
};
