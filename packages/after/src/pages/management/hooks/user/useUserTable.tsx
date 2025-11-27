import { Badge } from '@/components/data-display';
import { Button } from '@/components/form';
import type { User } from '@/services/userService';
import type { ReactNode } from 'react';
import { userRoleMap, userStatusMap } from '../../constants/user';

type UseUserTableProps = {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export function useUserTable({ onEdit, onDelete }: UseUserTableProps) {
  const cellRenderers: Record<string, (user: User) => ReactNode> = {
    role: user => {
      const config = userRoleMap[user.role];
      return (
        <Badge variant={config.variant} rounded>
          {config.label}
        </Badge>
      );
    },
    status: user => {
      const config = userStatusMap[user.status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    lastLogin: user => user.lastLogin || '-',
    actions: user => (
      <div className="flex gap-2">
        <Button variant="default" size="sm" onClick={() => onEdit(user)}>
          수정
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(user.id)}>
          삭제
        </Button>
      </div>
    ),
  };

  const renderCellContent = (user: User, columnKey: string): ReactNode => {
    const renderer = cellRenderers[columnKey];
    return renderer ? renderer(user) : user[columnKey as keyof User];
  };

  return { renderCellContent };
}

