import type { Post } from '@/services/postService';

export type PostTableColumn = {
  key: string;
  header: string;
  width?: string;
};

export const postTableColumns: PostTableColumn[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: '제목' },
  { key: 'author', header: '작성자', width: '120px' },
  { key: 'category', header: '카테고리', width: '140px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'views', header: '조회수', width: '100px' },
  { key: 'createdAt', header: '작성일', width: '120px' },
  { key: 'actions', header: '관리', width: '250px' },
];

export const postCategoryMap: Partial<
  Record<string, { variant: 'primary' | 'pink' | 'green' | 'secondary' }>
> = {
  development: { variant: 'primary' },
  design: { variant: 'pink' },
  accessibility: { variant: 'green' },
};

export const postStatusMap: Record<
  Post['status'],
  { variant: 'green' | 'yellow' | 'gray' | 'red'; label: string }
> = {
  published: { variant: 'green', label: '게시됨' },
  draft: { variant: 'yellow', label: '임시저장' },
  archived: { variant: 'gray', label: '보관됨' },
};

