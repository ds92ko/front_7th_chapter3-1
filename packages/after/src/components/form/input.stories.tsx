import { Input } from '@/components/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      description: '입력 필드의 타입',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화 여부',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    type: 'text',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력하세요',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '숫자를 입력하세요',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 입력 필드',
    disabled: true,
    defaultValue: '비활성화된 값',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    defaultValue: '기본 값',
  },
};

export const Error: Story = {
  args: {
    placeholder: '이메일을 입력하세요',
    type: 'email',
    'aria-invalid': true,
    defaultValue: 'invalid-email',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-4">
      <div>
        <label className="label mb-2 block">텍스트</label>
        <Input type="text" placeholder="텍스트를 입력하세요" />
      </div>
      <div>
        <label className="label mb-2 block">이메일</label>
        <Input type="email" placeholder="이메일을 입력하세요" />
      </div>
      <div>
        <label className="label mb-2 block">비밀번호</label>
        <Input type="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <div>
        <label className="label mb-2 block">숫자</label>
        <Input type="number" placeholder="숫자를 입력하세요" />
      </div>
      <div>
        <label className="label mb-2 block">전화번호</label>
        <Input type="tel" placeholder="전화번호를 입력하세요" />
      </div>
      <div>
        <label className="label mb-2 block">URL</label>
        <Input type="url" placeholder="https://example.com" />
      </div>
      <div>
        <label className="label mb-2 block">검색</label>
        <Input type="search" placeholder="검색어를 입력하세요" />
      </div>
      <div>
        <label className="label mb-2 block">날짜</label>
        <Input type="date" />
      </div>
      <div>
        <label className="label mb-2 block">시간</label>
        <Input type="time" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const States: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-4">
      <div>
        <label className="label mb-2 block">기본</label>
        <Input placeholder="기본 입력 필드" />
      </div>
      <div>
        <label className="label mb-2 block">값이 있는 경우</label>
        <Input defaultValue="입력된 값" />
      </div>
      <div>
        <label className="label mb-2 block">비활성화</label>
        <Input placeholder="비활성화된 입력 필드" disabled />
      </div>
      <div>
        <label className="label mb-2 block">에러 상태</label>
        <Input
          placeholder="이메일을 입력하세요"
          type="email"
          aria-invalid={true}
          defaultValue="invalid-email"
        />
      </div>
      <div>
        <label className="label mb-2 block">에러 상태 (값 없음)</label>
        <Input placeholder="이메일을 입력하세요" type="email" aria-invalid={true} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
