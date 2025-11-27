import type { User } from '@/services/userService';
import { userService } from '@/services/userService';
import { useEntityData } from '../useEntityData';

export function useUserData() {
  return useEntityData<User>(userService);
}
