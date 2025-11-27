import { useState } from 'react';
import { useForm, type DefaultValues, type FieldValues } from 'react-hook-form';

type Service<TEntity, TCreateData, TUpdateData> = {
  create: (data: TCreateData) => Promise<TEntity>;
  update: (id: number, data: TUpdateData) => Promise<TEntity>;
  delete: (id: number) => Promise<void>;
  publish?: (id: number) => Promise<TEntity>;
  archive?: (id: number) => Promise<TEntity>;
  restore?: (id: number) => Promise<TEntity>;
};

type EntityCRUDConfig<
  TEntity extends { id: number },
  TFormData extends FieldValues,
  TCreateData,
  TUpdateData,
> = {
  service: Service<TEntity, TCreateData, TUpdateData>;
  formDefaults: TFormData;
  validate: (data: TFormData) => string | null;
  mapFormToCreate: (data: TFormData) => TCreateData;
  mapFormToUpdate: (data: TFormData, entity: TEntity) => TUpdateData;
  mapEntityToForm: (entity: TEntity) => TFormData;
  getEntityId: (entity: TEntity) => number;
  successMessages: {
    create: string;
    update: string;
    delete: string;
  };
  hasStatusAction?: boolean;
  handleStatusAction?: (
    id: number,
    action: string,
    service: Service<TEntity, TCreateData, TUpdateData>
  ) => Promise<void>;
  getStatusActionMessage?: (action: string) => string;
};

type BaseReturn<TEntity extends { id: number }, TFormData extends FieldValues> = {
  form: ReturnType<typeof useForm<TFormData>>;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedItem: TEntity | null;
  setIsCreateModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setSelectedItem: (item: TEntity | null) => void;
  handleCreate: (formData: TFormData) => Promise<void>;
  handleEdit: (item: TEntity) => void;
  handleUpdate: (formData: TFormData) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
};

type ReturnWithStatusAction<
  TEntity extends { id: number },
  TFormData extends FieldValues,
> = BaseReturn<TEntity, TFormData> & {
  handleStatusAction: (id: number, action: string) => Promise<void>;
};

export function useEntityCRUD<
  TEntity extends { id: number },
  TFormData extends FieldValues,
  TCreateData,
  TUpdateData,
>(
  config: EntityCRUDConfig<TEntity, TFormData, TCreateData, TUpdateData> & {
    hasStatusAction: true;
  },
  loadData: () => Promise<void>,
  showSuccess: (message: string) => void,
  showError: (message: string) => void
): ReturnWithStatusAction<TEntity, TFormData>;
export function useEntityCRUD<
  TEntity extends { id: number },
  TFormData extends FieldValues,
  TCreateData,
  TUpdateData,
>(
  config: EntityCRUDConfig<TEntity, TFormData, TCreateData, TUpdateData> & {
    hasStatusAction?: false;
  },
  loadData: () => Promise<void>,
  showSuccess: (message: string) => void,
  showError: (message: string) => void
): BaseReturn<TEntity, TFormData>;
export function useEntityCRUD<
  TEntity extends { id: number },
  TFormData extends FieldValues,
  TCreateData,
  TUpdateData,
>(
  config: EntityCRUDConfig<TEntity, TFormData, TCreateData, TUpdateData>,
  loadData: () => Promise<void>,
  showSuccess: (message: string) => void,
  showError: (message: string) => void
): BaseReturn<TEntity, TFormData> | ReturnWithStatusAction<TEntity, TFormData> {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TEntity | null>(null);

  const form = useForm<TFormData>({
    defaultValues: config.formDefaults as DefaultValues<TFormData>,
  });

  const handleCreate = async (formData: TFormData) => {
    try {
      const validationError = config.validate(formData);
      if (validationError) {
        showError(validationError);
        return;
      }

      await config.service.create(config.mapFormToCreate(formData));

      await loadData();
      setIsCreateModalOpen(false);
      form.reset(config.formDefaults);
      showSuccess(config.successMessages.create);
    } catch (error) {
      const message = error instanceof Error ? error.message : '생성에 실패했습니다';
      showError(message);
    }
  };

  const handleEdit = (item: TEntity) => {
    setSelectedItem(item);
    form.reset(config.mapEntityToForm(item));
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (formData: TFormData) => {
    if (!selectedItem) return;

    try {
      await config.service.update(
        config.getEntityId(selectedItem),
        config.mapFormToUpdate(formData, selectedItem)
      );

      await loadData();
      setIsEditModalOpen(false);
      form.reset(config.formDefaults);
      setSelectedItem(null);
      showSuccess(config.successMessages.update);
    } catch (error) {
      const message = error instanceof Error ? error.message : '수정에 실패했습니다';
      showError(message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await config.service.delete(id);
      await loadData();
      showSuccess(config.successMessages.delete);
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
      showError(message);
    }
  };

  const handleStatusAction = async (id: number, action: string) => {
    if (!config.hasStatusAction || !config.handleStatusAction) {
      return;
    }

    try {
      await config.handleStatusAction(id, action, config.service);
      await loadData();
      const message = config.getStatusActionMessage
        ? config.getStatusActionMessage(action)
        : `${action}되었습니다`;
      showSuccess(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      showError(message);
    }
  };

  const resetForm = () => {
    form.reset(config.formDefaults);
    setSelectedItem(null);
  };

  const baseReturn = {
    form,
    isCreateModalOpen,
    isEditModalOpen,
    selectedItem,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    setSelectedItem,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    resetForm,
  };

  if (config.hasStatusAction) {
    return {
      ...baseReturn,
      handleStatusAction,
    } as ReturnWithStatusAction<TEntity, TFormData>;
  }

  return baseReturn;
}
