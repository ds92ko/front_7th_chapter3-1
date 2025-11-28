import { cn } from '@/lib/utils';
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentProps } from 'react';

function Dialog({ ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: ComponentProps<typeof Trigger>) {
  return <Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: ComponentProps<typeof Portal>) {
  return <Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: ComponentProps<typeof Close>) {
  return <Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: ComponentProps<typeof Overlay>) {
  return (
    <Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-foreground/20 fixed inset-0 z-[900] backdrop-blur-sm',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  'aria-describedby': ariaDescribedBy,
  onInteractOutside,
  ...props
}: ComponentProps<typeof Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <Content
        data-slot="dialog-content"
        className={cn(
          'bg-card text-card-foreground border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-[900] flex max-h-[90vh] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-lg border p-5 shadow-lg transition-all',
          'max-w-lg', // 기본 크기
          className
        )}
        aria-describedby={ariaDescribedBy ?? undefined}
        onInteractOutside={event => {
          const target = event.target as HTMLElement | null;
          if (target && target.closest('[data-slot="toast"]')) {
            event.preventDefault();
            return;
          }
          if (onInteractOutside) {
            onInteractOutside(
              event as unknown as Parameters<NonNullable<typeof onInteractOutside>>[0]
            );
          }
        }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <Close
            data-slot="dialog-close"
            className="text-muted-foreground hover:text-foreground focus:ring-ring absolute top-4 right-4 flex items-center justify-center rounded-sm p-1 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
            aria-label="닫기"
          >
            <X className="size-5" />
            <span className="sr-only">닫기</span>
          </Close>
        )}
      </Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: ComponentProps<typeof Title>) {
  return <Title data-slot="dialog-title" className={cn('heading-3', className)} {...props} />;
}

function DialogDescription({ className, ...props }: ComponentProps<typeof Description>) {
  return (
    <Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground body-small', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
