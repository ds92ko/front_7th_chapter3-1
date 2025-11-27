import { Button } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/overlay';
import type { User } from '@/services/userService';
import type { UseFormReturn } from 'react-hook-form';
import { useUserDialog, type UserFormData } from '../../hooks/user';
import { UserForm } from './user-form';

type UserDialogProps = {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<UserFormData>;
  selectedItem?: User | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
};

export function UserDialog({
  mode,
  open,
  onOpenChange,
  form,
  selectedItem,
  onSubmit,
  onCancel,
}: UserDialogProps) {
  const { title, buttonText, infoAlert } = useUserDialog({ mode, selectedItem });

  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        onOpenChange(open);
        if (!open) {
          form.reset({});
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserForm form={form} onSubmit={onSubmit} showInfo={infoAlert} />
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" variant="default" onClick={form.handleSubmit(onSubmit)}>
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
