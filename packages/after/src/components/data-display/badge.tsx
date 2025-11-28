import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap label-small border transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary-dark border-primary/30',
        secondary: 'bg-secondary text-secondary-foreground border-border',
        blue: 'bg-info/10 text-info-dark border-info/30',
        green: 'bg-success/10 text-success-dark border-success/30',
        orange: 'bg-warning/10 text-warning-dark border-warning/30',
        red: 'bg-destructive/10 text-destructive-dark border-destructive/30',
        gray: 'bg-gray/10 text-gray-dark border-gray/30',
        yellow: 'bg-yellow/10 text-yellow-dark border-yellow/30',
        purple: 'bg-purple/10 text-purple-dark border-purple/30',
        pink: 'bg-pink/10 text-pink-dark border-pink/30',
        outline: 'bg-transparent border-border text-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1',
        lg: 'px-3 py-1.5 text-sm',
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: false,
    },
  }
);

interface BadgeProps extends ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, rounded, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
