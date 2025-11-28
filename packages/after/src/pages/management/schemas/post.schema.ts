import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().optional(),
  author: z.string().min(1, '작성자를 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  status: z.enum(['draft', 'published', 'archived'], {
    message: '유효하지 않은 상태입니다',
  }),
});

export const postCreateSchema = postFormSchema;

export const postUpdateSchema = postFormSchema.partial();

export type PostFormData = z.infer<typeof postFormSchema>;
export type PostCreateData = z.infer<typeof postCreateSchema>;
export type PostUpdateData = z.infer<typeof postUpdateSchema>;

