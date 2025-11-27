import { userService } from '@/services/userService';
import type { User } from '@/services/userService';
import { userMessages } from '../../constants/messages';
import { useEntityCRUD } from '../useEntityCRUD';

export type UserFormData = {
  username?: string;
  email?: string;
  role?: User['role'];
  status?: User['status'];
};

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
      formDefaults: {
        username: '',
        email: '',
        role: 'user',
        status: 'active',
      },
      validate: (data) => {
        if (!data.username || !data.email) {
          return userMessages.validation.required;
        }
        const userStatus = data.status || 'active';
        if (userStatus !== 'active' && userStatus !== 'inactive' && userStatus !== 'suspended') {
          return userMessages.validation.invalidStatus;
        }
        return null;
      },
      mapFormToCreate: (data): Omit<User, 'id' | 'createdAt'> => ({
        username: data.username!,
        email: data.email!,
        role: data.role || 'user',
        status: data.status || 'active',
      }),
      mapFormToUpdate: (data): Partial<Omit<User, 'id' | 'createdAt'>> => {
        const updateData: Partial<Omit<User, 'id' | 'createdAt'>> = {};
        if (data.username) updateData.username = data.username;
        if (data.email) updateData.email = data.email;
        if (data.role) updateData.role = data.role;
        const userStatus = data.status;
        if (userStatus === 'active' || userStatus === 'inactive' || userStatus === 'suspended') {
          updateData.status = userStatus;
        }
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

