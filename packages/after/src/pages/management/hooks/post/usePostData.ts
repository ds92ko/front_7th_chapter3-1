import type { Post } from '@/services/postService';
import { postService } from '@/services/postService';
import { useEntityData } from '../useEntityData';

export function usePostData() {
  return useEntityData<Post>(postService);
}
