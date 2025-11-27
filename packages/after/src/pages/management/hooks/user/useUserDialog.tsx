import { Alert } from '@/components/feedback';
import type { User } from '@/services/userService';
import { entityNames } from '../../constants/ui';
import { useEntityDialog } from '../useEntityDialog';

type UseUserDialogProps = {
  mode: 'create' | 'edit';
  selectedItem?: User | null;
};

export function useUserDialog({ mode, selectedItem }: UseUserDialogProps) {
  return useEntityDialog({
    mode,
    selectedItem,
    config: {
      entityName: entityNames.user,
      formatInfo: item => (
        <Alert variant="info">
          ID: {item.id} | 생성일: {item.createdAt}
        </Alert>
      ),
    },
  });
}

