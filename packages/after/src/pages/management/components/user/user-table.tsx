import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/data-display';
import type { User } from '@/services/userService';
import { userTableColumns } from '../../constants/user';
import { useUserTable } from '../../hooks/user';

type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const { renderCellContent } = useUserTable({ onEdit, onDelete });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {userTableColumns.map(column => (
            <TableHead key={column.key} style={column.width ? { width: column.width } : undefined}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, rowIndex) => (
          <TableRow key={rowIndex}>
            {userTableColumns.map(column => (
              <TableCell key={column.key}>{renderCellContent(user, column.key)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
