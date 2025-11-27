import { useMemo } from 'react';
import type { User } from '@/services/userService';

export function useUserStats(users: User[]) {
  return useMemo(() => {
    return {
      total: users.length,
      stat1: {
        label: '활성',
        value: users.filter(u => u.status === 'active').length,
      },
      stat2: {
        label: '비활성',
        value: users.filter(u => u.status === 'inactive').length,
      },
      stat3: {
        label: '정지',
        value: users.filter(u => u.status === 'suspended').length,
      },
      stat4: {
        label: '관리자',
        value: users.filter(u => u.role === 'admin').length,
      },
    };
  }, [users]);
}

