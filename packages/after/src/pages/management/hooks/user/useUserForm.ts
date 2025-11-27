import type { User } from '@/services/userService';
import { userRoleMap, userStatusMap } from '../../constants/user';

const DEFAULT_ROLE: User['role'] = 'user';
const DEFAULT_STATUS: User['status'] = 'active';

const roleKeys = Object.keys(userRoleMap) as User['role'][];
const statusKeys = Object.keys(userStatusMap) as User['status'][];

const isValidRole = (value: string): value is User['role'] =>
  roleKeys.includes(value as User['role']);

const isValidStatus = (value: string): value is User['status'] =>
  statusKeys.includes(value as User['status']);

const createSelectChangeHandler =
  <T extends string>(validator: (value: string) => value is T) =>
  (value: string, onChange: (value: T) => void) => {
    if (validator(value)) {
      onChange(value);
    }
  };

export function useUserForm() {
  const onChangeHandlers = {
    role: createSelectChangeHandler(isValidRole),
    status: createSelectChangeHandler(isValidStatus),
  };

  return {
    onChangeHandlers,
    defaults: {
      role: DEFAULT_ROLE,
      status: DEFAULT_STATUS,
    },
  };
}

