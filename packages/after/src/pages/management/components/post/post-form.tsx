import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from '@/components/form';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { postCategoryMap } from '../../constants/post';
import { usePostForm, type PostFormData } from '../../hooks/post';

type PostFormProps = {
  form: UseFormReturn<PostFormData>;
  onSubmit: (data: PostFormData) => void;
  showInfo?: ReactNode;
};

export function PostForm({ form, onSubmit, showInfo }: PostFormProps) {
  const { onChangeHandlers, defaults } = usePostForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {showInfo && <div className="mb-4">{showInfo}</div>}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                제목 <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="게시글 제목을 입력하세요" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  작성자 <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="작성자명" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  카테고리 <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <NativeSelect
                    name="category"
                    value={field.value || defaults.category}
                    onChange={e => onChangeHandlers.category(e.target.value, field.onChange)}
                    required
                  >
                    <NativeSelectOption value="" disabled>
                      카테고리 선택
                    </NativeSelectOption>
                    {Object.entries(postCategoryMap).map(([key]) => (
                      <NativeSelectOption key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea placeholder="게시글 내용을 입력하세요" rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
