import { userService } from '@/services/userService';
import type { User } from '@/services/userService';
import { userMessages } from '../../constants/messages';
import { userFormSchema, type UserFormData } from '../../schemas/user.schema';
import { useEntityCRUD } from '../useEntityCRUD';

export function useUserCRUD(
  loadData: () => Promise<void>,
  showSuccess: (message: string) => void,
  showError: (message: string) => void
) {
  return useEntityCRUD<
    User,
    UserFormData,
    Omit<User, 'id' | 'createdAt'>,
    Partial<Omit<User, 'id' | 'createdAt'>>
  >(
    {
      service: userService,
      schema: userFormSchema,
      formDefaults: {
        username: '',
        email: '',
        role: 'user',
        status: 'active',
      },
      mapFormToCreate: (data): Omit<User, 'id' | 'createdAt'> => ({
        username: data.username,
        email: data.email,
        role: data.role,
        status: data.status,
      }),
      mapFormToUpdate: (data): Partial<Omit<User, 'id' | 'createdAt'>> => {
        const updateData: Partial<Omit<User, 'id' | 'createdAt'>> = {};
        if (data.username !== undefined) updateData.username = data.username;
        if (data.email !== undefined) updateData.email = data.email;
        if (data.role !== undefined) updateData.role = data.role;
        if (data.status !== undefined) updateData.status = data.status;
        return updateData;
      },
      mapEntityToForm: (entity) => ({
        username: entity.username,
        email: entity.email,
        role: entity.role,
        status: entity.status,
      }),
      getEntityId: (entity) => entity.id,
      successMessages: userMessages.success,
    },
    loadData,
    showSuccess,
    showError
  );
}

