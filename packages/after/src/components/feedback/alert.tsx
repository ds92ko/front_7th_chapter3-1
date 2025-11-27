import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

const alertVariants = cva(
  'relative flex items-start gap-3 rounded-lg border p-4 transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-card border-border text-card-foreground',
        info: 'bg-info/10 border-info/30 text-info',
        success: 'bg-success/10 border-success/30 text-success',
        warning: 'bg-warning/10 border-warning/30 text-warning',
        error: 'bg-destructive/10 border-destructive/30 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface AlertProps extends ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

const variantIcons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

function Alert({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
  className,
  ...props
}: AlertProps) {
  const Icon = variantIcons[variant || 'default'];

  return (
    <div data-slot="alert" className={cn(alertVariants({ variant, className }))} {...props}>
      {showIcon && (
        <div className="shrink-0">
          <Icon className="size-5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {title && <div className="label mb-1">{title}</div>}
        <div className="body-small">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="focus:ring-ring text-muted-foreground hover:text-foreground shrink-0 self-start rounded-sm transition-opacity focus:ring-2 focus:ring-offset-2 focus:outline-none"
          aria-label="닫기"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export { Alert };
