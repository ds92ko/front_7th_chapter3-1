import type { Post } from '@/services/postService';
import { postService } from '@/services/postService';
import { postMessages } from '../../constants/messages';
import { useEntityCRUD } from '../useEntityCRUD';

export type PostFormData = {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  status?: Post['status'];
};

export function usePostCRUD(
  loadData: () => Promise<void>,
  showSuccess: (message: string) => void,
  showError: (message: string) => void
) {
  return useEntityCRUD<
    Post,
    PostFormData,
    Omit<Post, 'id' | 'createdAt' | 'views'>,
    Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>
  >(
    {
      service: postService,
      formDefaults: {
        title: '',
        content: '',
        author: '',
        category: '',
        status: 'draft',
      },
      validate: data => {
        if (!data.title || !data.author || !data.category) {
          return postMessages.validation.required;
        }
        const postStatus = data.status || 'draft';
        if (postStatus !== 'draft' && postStatus !== 'published' && postStatus !== 'archived') {
          return postMessages.validation.invalidStatus;
        }
        return null;
      },
      mapFormToCreate: (data): Omit<Post, 'id' | 'createdAt' | 'views'> => ({
        title: data.title!,
        content: data.content || '',
        author: data.author!,
        category: data.category!,
        status: data.status || 'draft',
      }),
      mapFormToUpdate: (data): Partial<Omit<Post, 'id' | 'createdAt' | 'views'>> => {
        const updateData: Partial<Omit<Post, 'id' | 'createdAt' | 'views'>> = {};
        if (data.title) updateData.title = data.title;
        if (data.content !== undefined) updateData.content = data.content;
        if (data.author) updateData.author = data.author;
        if (data.category) updateData.category = data.category;
        const postStatus = data.status;
        if (postStatus === 'draft' || postStatus === 'published' || postStatus === 'archived') {
          updateData.status = postStatus;
        }
        return updateData;
      },
      mapEntityToForm: entity => ({
        title: entity.title,
        content: entity.content,
        author: entity.author,
        category: entity.category,
        status: entity.status,
      }),
      getEntityId: entity => entity.id,
      successMessages: postMessages.success,
      hasStatusAction: true,
      handleStatusAction: async (id, action, service) => {
        if (action === 'publish' && service.publish) {
          await service.publish(id);
        } else if (action === 'archive' && service.archive) {
          await service.archive(id);
        } else if (action === 'restore' && service.restore) {
          await service.restore(id);
        }
      },
      getStatusActionMessage: action => {
        const message =
          action === 'publish'
            ? postMessages.statusAction.publish
            : action === 'archive'
              ? postMessages.statusAction.archive
              : postMessages.statusAction.restore;
        return `${message}되었습니다`;
      },
    },
    loadData,
    showSuccess,
    showError
  );
}
