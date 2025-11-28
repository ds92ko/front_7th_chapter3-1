import { z } from 'zod';

export const userFormSchema = z.object({
  username: z.string().min(1, '사용자명을 입력해주세요'),
  email: z.string().email('올바른 이메일 형식이 아닙니다').min(1, '이메일을 입력해주세요'),
  role: z.enum(['user', 'admin', 'moderator'], {
    message: '유효하지 않은 역할입니다',
  }),
  status: z.enum(['active', 'inactive', 'suspended'], {
    message: '유효하지 않은 상태입니다',
  }),
});

export const userCreateSchema = userFormSchema;

export const userUpdateSchema = userFormSchema.partial();

export type UserFormData = z.infer<typeof userFormSchema>;
export type UserCreateData = z.infer<typeof userCreateSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;

