import type { Post } from '@/services/postService';
import { postService } from '@/services/postService';
import { postMessages } from '../../constants/messages';
import { postFormSchema, type PostFormData } from '../../schemas/post.schema';
import { useEntityCRUD } from '../useEntityCRUD';

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
      schema: postFormSchema,
      formDefaults: {
        title: '',
        content: '',
        author: '',
        category: '',
        status: 'draft',
      },
      mapFormToCreate: (data): Omit<Post, 'id' | 'createdAt' | 'views'> => ({
        title: data.title,
        content: data.content || '',
        author: data.author,
        category: data.category,
        status: data.status,
      }),
      mapFormToUpdate: (data): Partial<Omit<Post, 'id' | 'createdAt' | 'views'>> => {
        const updateData: Partial<Omit<Post, 'id' | 'createdAt' | 'views'>> = {};
        if (data.title !== undefined) updateData.title = data.title;
        if (data.content !== undefined) updateData.content = data.content;
        if (data.author !== undefined) updateData.author = data.author;
        if (data.category !== undefined) updateData.category = data.category;
        if (data.status !== undefined) updateData.status = data.status;
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
