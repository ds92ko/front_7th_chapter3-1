import { Badge } from '@/components/data-display';
import { Button } from '@/components/form';
import type { Post } from '@/services/postService';
import type { ReactNode } from 'react';
import { postCategoryMap, postStatusMap } from '../../constants/post';

type UsePostTableProps = {
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => void;
};

export function usePostTable({ onEdit, onDelete, onStatusAction }: UsePostTableProps) {
  const cellRenderers: Record<string, (post: Post) => ReactNode> = {
    category: post => {
      const config = postCategoryMap[post.category] || { variant: 'secondary' as const };
      return (
        <Badge variant={config.variant} rounded>
          {post.category}
        </Badge>
      );
    },
    status: post => {
      const config = postStatusMap[post.status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    views: post => post.views.toLocaleString(),
    actions: post => (
      <div className="flex flex-wrap gap-2">
        <Button variant="default" size="sm" onClick={() => onEdit(post)}>
          수정
        </Button>
        {post.status === 'draft' && (
          <Button variant="success" size="sm" onClick={() => onStatusAction(post.id, 'publish')}>
            게시
          </Button>
        )}
        {post.status === 'published' && (
          <Button variant="secondary" size="sm" onClick={() => onStatusAction(post.id, 'archive')}>
            보관
          </Button>
        )}
        {post.status === 'archived' && (
          <Button variant="info" size="sm" onClick={() => onStatusAction(post.id, 'restore')}>
            복원
          </Button>
        )}
        <Button variant="destructive" size="sm" onClick={() => onDelete(post.id)}>
          삭제
        </Button>
      </div>
    ),
  };

  const renderCellContent = (post: Post, columnKey: string): ReactNode => {
    const renderer = cellRenderers[columnKey];
    return renderer ? renderer(post) : post[columnKey as keyof Post];
  };

  return { renderCellContent };
}

