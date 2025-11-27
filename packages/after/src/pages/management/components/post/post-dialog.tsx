import { Button } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/overlay';
import type { Post } from '@/services/postService';
import type { UseFormReturn } from 'react-hook-form';
import { usePostDialog, type PostFormData } from '../../hooks/post';
import { PostForm } from './post-form';

type PostDialogProps = {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<PostFormData>;
  selectedItem?: Post | null;
  onSubmit: (data: PostFormData) => void;
  onCancel: () => void;
};

export function PostDialog({
  mode,
  open,
  onOpenChange,
  form,
  selectedItem,
  onSubmit,
  onCancel,
}: PostDialogProps) {
  const { title, buttonText, infoAlert } = usePostDialog({ mode, selectedItem });

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
        <PostForm form={form} onSubmit={onSubmit} showInfo={infoAlert} />
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
