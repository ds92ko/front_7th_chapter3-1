import { useMemo } from 'react';
import type { Post } from '@/services/postService';

export function usePostStats(posts: Post[]) {
  return useMemo(() => {
    return {
      total: posts.length,
      stat1: {
        label: '게시됨',
        value: posts.filter(p => p.status === 'published').length,
      },
      stat2: {
        label: '임시저장',
        value: posts.filter(p => p.status === 'draft').length,
      },
      stat3: {
        label: '보관됨',
        value: posts.filter(p => p.status === 'archived').length,
      },
      stat4: {
        label: '총 조회수',
        value: posts.reduce((sum, p) => sum + p.views, 0),
      },
    };
  }, [posts]);
}

