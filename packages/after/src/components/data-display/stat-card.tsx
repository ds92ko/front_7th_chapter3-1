import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const statCardVariants = cva('rounded-md border p-3 px-4', {
  variants: {
    variant: {
      default: 'bg-primary/10 border-primary/30',
      info: 'bg-info/10 border-info/30',
      success: 'bg-success/10 border-success/30',
      warning: 'bg-warning/10 border-warning/30',
      error: 'bg-destructive/10 border-destructive/30',
      secondary: 'bg-secondary border-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const statCardValueVariants = cva('', {
  variants: {
    variant: {
      default: 'text-primary-dark',
      info: 'text-info-dark',
      success: 'text-success-dark',
      warning: 'text-warning-dark',
      error: 'text-destructive-dark',
      secondary: 'text-secondary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface StatCardProps extends ComponentProps<'div'>, VariantProps<typeof statCardVariants> {
  label: string;
  value: number;
}

function StatCard({ label, value, variant, className, ...props }: StatCardProps) {
  return (
    <div data-slot="stat-card" className={cn(statCardVariants({ variant, className }))} {...props}>
      <div className="caption text-foreground/60 mb-1">{label}</div>
      <div className={cn('display-1 font-mono tabular-nums', statCardValueVariants({ variant }))}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}

export { StatCard };
