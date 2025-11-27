import { Button } from '@/components/form/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form';
import { Input } from '@/components/form/input';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta = {
  title: 'Form/Form',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 폼 스키마
const basicFormSchema = z.object({
  username: z.string().min(2, {
    message: '사용자명은 최소 2자 이상이어야 합니다.',
  }),
  email: z.string().email({
    message: '올바른 이메일 주소를 입력해주세요.',
  }),
});

// 복잡한 폼 스키마
const complexFormSchema = z.object({
  username: z.string().min(2, {
    message: '사용자명은 최소 2자 이상이어야 합니다.',
  }),
  email: z.string().email({
    message: '올바른 이메일 주소를 입력해주세요.',
  }),
  password: z.string().min(8, {
    message: '비밀번호는 최소 8자 이상이어야 합니다.',
  }),
  bio: z.string().max(160, {
    message: '자기소개는 160자 이하여야 합니다.',
  }),
});

function BasicFormExample() {
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof basicFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="사용자명을 입력하세요" {...field} />
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
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  );
}

function FormWithDescriptionExample() {
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof basicFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="사용자명을 입력하세요" {...field} />
              </FormControl>
              <FormDescription>이 이름은 공개 프로필에 표시됩니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일을 입력하세요" {...field} />
              </FormControl>
              <FormDescription>로그인에 사용할 이메일 주소입니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  );
}

function ComplexFormExample() {
  const form = useForm<z.infer<typeof complexFormSchema>>({
    resolver: zodResolver(complexFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      bio: '',
    },
  });

  function onSubmit(values: z.infer<typeof complexFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="사용자명을 입력하세요" {...field} />
              </FormControl>
              <FormDescription>이 이름은 공개 프로필에 표시됩니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
              </FormControl>
              <FormDescription>비밀번호는 최소 8자 이상이어야 합니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>자기소개</FormLabel>
              <FormControl>
                <Input placeholder="자기소개를 입력하세요" {...field} />
              </FormControl>
              <FormDescription>160자 이내로 작성해주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">가입하기</Button>
          <Button type="button" variant="outline">
            취소
          </Button>
        </div>
      </form>
    </Form>
  );
}

function ErrorStateExample() {
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      username: 'a', // 에러를 발생시키기 위한 짧은 값
      email: 'invalid-email', // 에러를 발생시키기 위한 잘못된 이메일
    },
  });

  // 에러를 표시하기 위해 수동으로 트리거
  useEffect(() => {
    form.trigger();
  }, [form]);

  function onSubmit(values: z.infer<typeof basicFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="사용자명을 입력하세요" {...field} />
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
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <BasicFormExample />,
};

export const WithDescription: Story = {
  render: () => <FormWithDescriptionExample />,
};

export const Complex: Story = {
  render: () => <ComplexFormExample />,
};

export const ErrorState: Story = {
  render: () => <ErrorStateExample />,
};
