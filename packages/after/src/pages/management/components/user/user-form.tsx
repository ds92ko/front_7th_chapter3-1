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
} from '@/components/form';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { userRoleMap, userStatusMap } from '../../constants/user';
import { useUserForm, type UserFormData } from '../../hooks/user';

type UserFormProps = {
  form: UseFormReturn<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  showInfo?: ReactNode;
};

export function UserForm({ form, onSubmit, showInfo }: UserFormProps) {
  const { onChangeHandlers, defaults } = useUserForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {showInfo && <div className="mb-4">{showInfo}</div>}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                사용자명 <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="사용자명을 입력하세요" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                이메일 <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일을 입력하세요" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>역할</FormLabel>
                <FormControl>
                  <NativeSelect
                    name="role"
                    value={field.value || defaults.role}
                    onChange={e => onChangeHandlers.role(e.target.value, field.onChange)}
                  >
                    {Object.entries(userRoleMap).map(([key, config]) => (
                      <NativeSelectOption key={key} value={key}>
                        {config.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상태</FormLabel>
                <FormControl>
                  <NativeSelect
                    name="status"
                    value={field.value || defaults.status}
                    onChange={e => onChangeHandlers.status(e.target.value, field.onChange)}
                  >
                    {Object.entries(userStatusMap).map(([key, config]) => (
                      <NativeSelectOption key={key} value={key}>
                        {config.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
