import { Alert } from '@/components/feedback';
import type { Post } from '@/services/postService';
import { entityNames } from '../../constants/ui';
import { useEntityDialog } from '../useEntityDialog';

type UsePostDialogProps = {
  mode: 'create' | 'edit';
  selectedItem?: Post | null;
};

export function usePostDialog({ mode, selectedItem }: UsePostDialogProps) {
  return useEntityDialog({
    mode,
    selectedItem,
    config: {
      entityName: entityNames.post,
      formatInfo: item => (
        <Alert variant="info">
          ID: {item.id} | 생성일: {item.createdAt} | 조회수: {item.views}
        </Alert>
      ),
    },
  });
}
