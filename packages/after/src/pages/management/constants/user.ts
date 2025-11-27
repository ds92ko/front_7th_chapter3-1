import type { User } from '@/services/userService';

export type UserTableColumn = {
  key: string;
  header: string;
  width?: string;
};

export const userTableColumns: UserTableColumn[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'username', header: '사용자명', width: '150px' },
  { key: 'email', header: '이메일' },
  { key: 'role', header: '역할', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
  { key: 'actions', header: '관리', width: '200px' },
];

export const userRoleMap: Record<
  User['role'],
  { variant: 'purple' | 'orange' | 'primary' | 'gray'; label: string }
> = {
  admin: { variant: 'purple', label: '관리자' },
  moderator: { variant: 'orange', label: '운영자' },
  user: { variant: 'primary', label: '사용자' },
};

export const userStatusMap: Record<
  User['status'],
  { variant: 'green' | 'gray' | 'red'; label: string }
> = {
  active: { variant: 'green', label: '활성' },
  inactive: { variant: 'gray', label: '비활성' },
  suspended: { variant: 'red', label: '정지' },
};

