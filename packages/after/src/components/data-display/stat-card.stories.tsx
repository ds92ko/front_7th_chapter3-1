import { StatCard } from '@/components/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Data Display/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'secondary'],
      description: '카드의 스타일 변형',
    },
    label: {
      control: 'text',
      description: '통계 라벨',
    },
    value: {
      control: { type: 'number' },
      description: '통계 값 (숫자 또는 문자열)',
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '전체',
    value: 100,
    variant: 'default',
  },
};

export const Info: Story = {
  args: {
    label: '전체',
    value: 100,
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    label: '활성',
    value: 75,
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: '비활성',
    value: 20,
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    label: '정지',
    value: 5,
    variant: 'error',
  },
};

export const Secondary: Story = {
  args: {
    label: '관리자',
    value: 10,
    variant: 'secondary',
  },
};

export const LargeNumber: Story = {
  args: {
    label: '총 조회수',
    value: 1234567,
    variant: 'info',
  },
};

export const AllVariants: Story = {
  args: {
    label: '전체',
    value: 100,
    variant: 'default',
  },
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
      <StatCard variant="default" label="전체" value={100} />
      <StatCard variant="info" label="전체" value={100} />
      <StatCard variant="success" label="활성" value={75} />
      <StatCard variant="warning" label="비활성" value={20} />
      <StatCard variant="error" label="정지" value={5} />
      <StatCard variant="secondary" label="관리자" value={10} />
    </div>
  ),
};
