import { Input, Label } from '@/components/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: '연결된 입력 필드의 ID',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '라벨',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="이메일을 입력하세요" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="username">
        사용자명 <span className="text-destructive">*</span>
      </Label>
      <Input id="username" placeholder="사용자명을 입력하세요" />
    </div>
  ),
};

export const MultipleFields: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" placeholder="이름을 입력하세요" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="이메일을 입력하세요" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">전화번호</Label>
        <Input id="phone" type="tel" placeholder="전화번호를 입력하세요" />
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="username">사용자명</Label>
      <Input id="username" placeholder="사용자명을 입력하세요" />
      <p className="caption text-muted-foreground">이 이름은 공개 프로필에 표시됩니다.</p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="disabled-input" className="peer-disabled:opacity-50">
        비활성화된 필드
      </Label>
      <Input id="disabled-input" placeholder="비활성화된 입력 필드" disabled />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="error-input" className="text-destructive">
        이메일
      </Label>
      <Input
        id="error-input"
        type="email"
        placeholder="이메일을 입력하세요"
        aria-invalid={true}
        defaultValue="invalid-email"
      />
      <p className="caption text-destructive">올바른 이메일 주소를 입력해주세요.</p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="basic">기본 라벨</Label>
        <Input id="basic" placeholder="기본 입력 필드" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="required">
          필수 필드 <span className="text-destructive">*</span>
        </Label>
        <Input id="required" placeholder="필수 입력 필드" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="with-desc">설명이 있는 라벨</Label>
        <Input id="with-desc" placeholder="입력 필드" />
        <p className="caption text-muted-foreground">도움말 텍스트가 여기에 표시됩니다.</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="disabled" className="peer-disabled:opacity-50">
          비활성화
        </Label>
        <Input id="disabled" placeholder="비활성화된 입력 필드" disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="error" className="text-destructive">
          에러 상태
        </Label>
        <Input
          id="error"
          type="email"
          placeholder="이메일을 입력하세요"
          aria-invalid={true}
          defaultValue="invalid"
        />
        <p className="caption text-destructive">에러 메시지가 여기에 표시됩니다.</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
