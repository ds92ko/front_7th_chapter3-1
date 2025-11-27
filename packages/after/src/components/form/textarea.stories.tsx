import { Textarea } from '@/components/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
      description: '텍스트 영역의 행 수',
    },
    cols: {
      control: 'number',
      description: '텍스트 영역의 열 수',
    },
    disabled: {
      control: 'boolean',
      description: '텍스트 영역 비활성화 여부',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    defaultValue: '이미 입력된 텍스트입니다.',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 텍스트 영역',
    disabled: true,
    defaultValue: '비활성화된 값',
    rows: 4,
  },
};

export const Error: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    'aria-invalid': true,
    defaultValue: '에러가 있는 텍스트',
    rows: 4,
  },
};

export const LongContent: Story = {
  args: {
    placeholder: '긴 텍스트를 입력하세요',
    defaultValue:
      '이것은 매우 긴 텍스트입니다. 여러 줄에 걸쳐 표시되며, 텍스트 영역이 어떻게 긴 콘텐츠를 처리하는지 확인할 수 있습니다. 스크롤이 필요한 경우 자동으로 스크롤바가 표시됩니다.',
    rows: 6,
  },
};

export const Small: Story = {
  args: {
    placeholder: '작은 텍스트 영역',
    rows: 2,
  },
};

export const Large: Story = {
  args: {
    placeholder: '큰 텍스트 영역',
    rows: 10,
  },
};

export const States: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <div>
        <label className="label mb-2 block">기본</label>
        <Textarea placeholder="기본 텍스트 영역" rows={4} />
      </div>
      <div>
        <label className="label mb-2 block">값이 있는 경우</label>
        <Textarea defaultValue="입력된 텍스트입니다." rows={4} />
      </div>
      <div>
        <label className="label mb-2 block">비활성화</label>
        <Textarea placeholder="비활성화된 텍스트 영역" disabled rows={4} />
      </div>
      <div>
        <label className="label mb-2 block">에러 상태</label>
        <Textarea
          placeholder="텍스트를 입력하세요"
          aria-invalid={true}
          defaultValue="에러가 있는 텍스트"
          rows={4}
        />
      </div>
      <div>
        <label className="label mb-2 block">에러 상태 (값 없음)</label>
        <Textarea placeholder="텍스트를 입력하세요" aria-invalid={true} rows={4} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <div>
        <label className="label mb-2 block">작은 크기 (2줄)</label>
        <Textarea placeholder="작은 텍스트 영역" rows={2} />
      </div>
      <div>
        <label className="label mb-2 block">기본 크기 (4줄)</label>
        <Textarea placeholder="기본 텍스트 영역" rows={4} />
      </div>
      <div>
        <label className="label mb-2 block">중간 크기 (6줄)</label>
        <Textarea placeholder="중간 텍스트 영역" rows={6} />
      </div>
      <div>
        <label className="label mb-2 block">큰 크기 (10줄)</label>
        <Textarea placeholder="큰 텍스트 영역" rows={10} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

