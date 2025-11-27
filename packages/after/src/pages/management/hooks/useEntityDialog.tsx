import { Alert } from '@/components/feedback';
import type { ReactNode } from 'react';
import { dialogMessages } from '../constants/messages';

type EntityInfo = {
  id: number;
  createdAt: string;
};

type UseEntityDialogProps<T extends EntityInfo> = {
  mode: 'create' | 'edit';
  selectedItem?: T | null;
  config: {
    entityName: string;
    formatInfo?: (item: T) => ReactNode;
  };
};

export function useEntityDialog<T extends EntityInfo>({
  mode,
  selectedItem,
  config,
}: UseEntityDialogProps<T>) {
  const isEdit = mode === 'edit';
  const title = isEdit
    ? dialogMessages.title.edit(config.entityName)
    : dialogMessages.title.create(config.entityName);
  const buttonText = isEdit ? dialogMessages.button.edit : dialogMessages.button.create;

  const infoAlert: ReactNode =
    isEdit && selectedItem
      ? config.formatInfo
        ? config.formatInfo(selectedItem)
        : (
            <Alert variant="info">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
            </Alert>
          )
      : null;

  return {
    isEdit,
    title,
    buttonText,
    infoAlert,
  };
}

