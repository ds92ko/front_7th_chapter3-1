import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/data-display';
import type { Post } from '@/services/postService';
import { postTableColumns } from '../../constants/post';
import { usePostTable } from '../../hooks/post';

type PostTableProps = {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => void;
};

export function PostTable({ posts, onEdit, onDelete, onStatusAction }: PostTableProps) {
  const { renderCellContent } = usePostTable({ onEdit, onDelete, onStatusAction });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {postTableColumns.map(column => (
            <TableHead key={column.key} style={column.width ? { width: column.width } : undefined}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post, rowIndex) => (
          <TableRow key={rowIndex}>
            {postTableColumns.map(column => (
              <TableCell key={column.key}>{renderCellContent(post, column.key)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
