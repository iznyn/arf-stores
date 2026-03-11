import React from 'react';
import { cn } from '../../../lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'small' | 'muted';
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', ...props }, ref) => {
    const Component = (variant === 'muted' ? 'p' : variant) as any;
    
    const variants = {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      span: "",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    };

    return (
      <Component 
        ref={ref} 
        className={cn(variants[variant], className)} 
        {...props} 
      />
    );
  }
);
Typography.displayName = 'Typography';
