import { Toast, ToastContainer } from '@/components/feedback/toast';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: '토스트의 스타일 variant',
    },
    title: {
      control: 'text',
      description: '토스트 제목',
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: '자동으로 닫히는 시간 (밀리초). 0이면 자동으로 닫히지 않습니다.',
    },
    onClose: {
      action: 'closed',
      description: '토스트가 닫힐 때 호출되는 함수',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '기본 토스트 메시지입니다.',
    variant: 'default',
  },
  render: args => (
    <div className="w-full max-w-md">
      <Toast {...args} onClose={() => {}} />
    </div>
  ),
};

export const Info: Story = {
  args: {
    children: '정보 메시지입니다.',
    variant: 'info',
    title: '정보',
  },
  render: args => (
    <div className="w-full max-w-md">
      <Toast {...args} onClose={() => {}} />
    </div>
  ),
};

export const Success: Story = {
  args: {
    children: '작업이 성공적으로 완료되었습니다.',
    variant: 'success',
    title: '성공',
  },
  render: args => (
    <div className="w-full max-w-md">
      <Toast {...args} onClose={() => {}} />
    </div>
  ),
};

export const Warning: Story = {
  args: {
    children: '경고 메시지입니다. 주의가 필요합니다.',
    variant: 'warning',
    title: '경고',
  },
  render: args => (
    <div className="w-full max-w-md">
      <Toast {...args} onClose={() => {}} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    children: '오류가 발생했습니다. 다시 시도해주세요.',
    variant: 'error',
    title: '오류',
  },
  render: args => (
    <div className="w-full max-w-md">
      <Toast {...args} onClose={() => {}} />
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: {
    children: '제목 없이 표시되는 토스트입니다.',
    variant: 'success',
  },
  render: args => (
    <div className="w-full max-w-md">
      <Toast {...args} onClose={() => {}} />
    </div>
  ),
};

export const WithoutCloseButton: Story = {
  args: {
    children: '닫기 버튼이 없는 토스트입니다.',
    variant: 'info',
    title: '정보',
    onClose: undefined,
  },
  render: ({ onClose: _, ...args }) => (
    <div className="w-full max-w-md">
      <Toast {...args} />
    </div>
  ),
};

function AutoCloseExample() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setShowToast(true)}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2"
      >
        자동 닫기 토스트 표시 (3초)
      </button>
      {showToast && (
        <ToastContainer>
          <Toast variant="success" title="성공" duration={3000} onClose={() => setShowToast(false)}>
            이 토스트는 3초 후 자동으로 닫힙니다.
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
}

export const AutoClose: Story = {
  render: () => <AutoCloseExample />,
  parameters: {
    layout: 'padded',
  },
};

function MultipleToastsExample() {
  const [toasts, setToasts] = useState<
    Array<{ id: number; variant: 'info' | 'success' | 'warning' | 'error' }>
  >([]);

  const addToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, variant }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => addToast('info')}
          className="bg-info text-info-foreground rounded-md px-4 py-2"
        >
          Info 토스트 추가
        </button>
        <button
          type="button"
          onClick={() => addToast('success')}
          className="bg-success text-success-foreground rounded-md px-4 py-2"
        >
          Success 토스트 추가
        </button>
        <button
          type="button"
          onClick={() => addToast('warning')}
          className="bg-warning text-warning-foreground rounded-md px-4 py-2"
        >
          Warning 토스트 추가
        </button>
        <button
          type="button"
          onClick={() => addToast('error')}
          className="bg-destructive text-destructive-foreground rounded-md px-4 py-2"
        >
          Error 토스트 추가
        </button>
      </div>
      <ToastContainer>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            title={
              toast.variant === 'info'
                ? '정보'
                : toast.variant === 'success'
                  ? '성공'
                  : toast.variant === 'warning'
                    ? '경고'
                    : '오류'
            }
            onClose={() => removeToast(toast.id)}
          >
            {toast.variant === 'info'
              ? '정보 메시지입니다.'
              : toast.variant === 'success'
                ? '작업이 성공적으로 완료되었습니다.'
                : toast.variant === 'warning'
                  ? '경고 메시지입니다.'
                  : '오류가 발생했습니다.'}
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
}

export const MultipleToasts: Story = {
  render: () => <MultipleToastsExample />,
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Toast variant="default" title="기본" onClose={() => {}}>
        기본 토스트 메시지입니다.
      </Toast>
      <Toast variant="info" title="정보" onClose={() => {}}>
        정보 메시지입니다.
      </Toast>
      <Toast variant="success" title="성공" onClose={() => {}}>
        작업이 성공적으로 완료되었습니다.
      </Toast>
      <Toast variant="warning" title="경고" onClose={() => {}}>
        경고 메시지입니다. 주의가 필요합니다.
      </Toast>
      <Toast variant="error" title="오류" onClose={() => {}}>
        오류가 발생했습니다. 다시 시도해주세요.
      </Toast>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
