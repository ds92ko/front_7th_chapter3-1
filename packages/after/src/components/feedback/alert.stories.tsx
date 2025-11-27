import { Alert } from '@/components/feedback/alert';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: '알림의 스타일 변형',
    },
    title: {
      control: 'text',
      description: '알림 제목',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '기본 알림 메시지입니다.',
    variant: 'default',
    title: '알림',
  },
};

export const Info: Story = {
  args: {
    children: '정보성 메시지입니다.',
    variant: 'info',
    title: '정보',
  },
};

export const Success: Story = {
  args: {
    children: '작업이 성공적으로 완료되었습니다.',
    variant: 'success',
    title: '성공',
  },
};

export const Warning: Story = {
  args: {
    children: '주의가 필요한 상황입니다.',
    variant: 'warning',
    title: '경고',
  },
};

export const Error: Story = {
  args: {
    children: '오류가 발생했습니다.',
    variant: 'error',
    title: '오류',
  },
};

export const WithoutTitle: Story = {
  args: {
    children: '제목 없이 표시되는 알림입니다.',
    variant: 'info',
  },
};


export const WithCloseButton: Story = {
  args: {
    children: '닫기 버튼이 있는 알림입니다.',
    variant: 'warning',
    title: '경고',
    onClose: () => alert('닫기 버튼 클릭'),
  },
};

export const LongContent: Story = {
  args: {
    children:
      '이것은 매우 긴 알림 메시지입니다. 여러 줄에 걸쳐 표시될 수 있으며, 사용자에게 중요한 정보를 전달합니다. 긴 텍스트가 있을 때도 레이아웃이 깨지지 않고 잘 표시됩니다.',
    variant: 'info',
    title: '긴 내용',
  },
};

export const AllVariants: Story = {
  args: {
    title: '알림',
    children: '모든 variant를 확인할 수 있습니다.',
  },
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Alert variant="default" title="기본">
        기본 알림 메시지입니다.
      </Alert>
      <Alert variant="info" title="정보">
        정보성 메시지입니다.
      </Alert>
      <Alert variant="success" title="성공">
        작업이 성공적으로 완료되었습니다.
      </Alert>
      <Alert variant="warning" title="경고">
        주의가 필요한 상황입니다.
      </Alert>
      <Alert variant="error" title="오류">
        오류가 발생했습니다.
      </Alert>
      <Alert variant="success" title="닫기 가능" onClose={() => {}}>
        닫기 버튼이 있는 알림입니다.
      </Alert>
    </div>
  ),
};

