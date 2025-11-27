import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useEffect, type ComponentProps } from 'react';
import { createPortal } from 'react-dom';

const toastVariants = cva(
  'relative flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-card border-border text-card-foreground',
        info: 'bg-info-light border-info/30 text-info',
        success: 'bg-success-light border-success/30 text-success',
        warning: 'bg-warning-light border-warning/30 text-warning',
        error: 'bg-destructive-light border-destructive/30 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ToastProps extends ComponentProps<'div'>, VariantProps<typeof toastVariants> {
  title?: string;
  onClose?: () => void;
  duration?: number;
}

const variantIcons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

function Toast({
  children,
  variant = 'default',
  title,
  onClose,
  duration,
  className,
  ...props
}: ToastProps) {
  const Icon = variantIcons[variant || 'default'];

  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      data-slot="toast"
      className={cn(toastVariants({ variant, className }), 'pointer-events-auto')}
      onClick={e => e.stopPropagation()}
      {...props}
    >
      <div className="shrink-0">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        {title && <div className="label mb-1">{title}</div>}
        <div className="body-small">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
          className="focus:ring-ring text-muted-foreground hover:text-foreground shrink-0 self-start rounded-sm transition-opacity focus:ring-2 focus:ring-offset-2 focus:outline-none"
          aria-label="닫기"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

function ToastContainer({ children, className, ...props }: ComponentProps<'div'>) {
  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      data-slot="toast-container"
      className={cn(
        'pointer-events-none fixed top-4 right-4 z-[1000] flex w-full max-w-md flex-col gap-2',
        className
      )}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
}

export { Toast, ToastContainer };
