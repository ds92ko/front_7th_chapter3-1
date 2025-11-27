import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/forms/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info', 'outline', 'secondary', 'ghost', 'link'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    asChild: {
      control: 'boolean',
      description: 'Slot을 사용하여 자식 요소로 렌더링',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: '삭제',
    variant: 'destructive',
  },
};

export const Success: Story = {
  args: {
    children: '성공',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: '경고',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: '정보',
    variant: 'info',
  },
};

export const Outline: Story = {
  args: {
    children: '외곽선',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: '보조',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: '고스트',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: '링크',
    variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: '작은 버튼',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: '큰 버튼',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <ChevronRight className="size-4" />
        다음
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <ChevronRight className="size-4" />,
    'aria-label': '다음',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">기본</Button>
        <Button variant="destructive">위험</Button>
        <Button variant="success">성공</Button>
        <Button variant="warning">경고</Button>
        <Button variant="info">정보</Button>
        <Button variant="outline">외곽선</Button>
        <Button variant="secondary">보조</Button>
        <Button variant="ghost">고스트</Button>
        <Button variant="link">링크</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">작은</Button>
        <Button size="default">기본</Button>
        <Button size="lg">큰</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button disabled>비활성화</Button>
        <Button variant="outline" disabled>
          비활성화 외곽선
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button>
          <ChevronRight className="size-4" />
          다음
        </Button>
        <Button variant="outline">
          <ChevronRight className="size-4" />
          다음
        </Button>
        <Button size="icon" aria-label="다음">
          <ChevronRight className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" aria-label="다음">
          <ChevronRight className="size-4" />
        </Button>
        <Button size="icon-lg" variant="secondary" aria-label="다음">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  ),
};
