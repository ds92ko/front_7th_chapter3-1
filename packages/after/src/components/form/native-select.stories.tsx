import { Label, NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@/components/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Form/NativeSelect',
  component: NativeSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '선택 필드 비활성화 여부',
    },
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeSelect className="w-[200px]">
      <NativeSelectOption value="">선택하세요</NativeSelectOption>
      <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
      <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
      <NativeSelectOption value="option3">옵션 3</NativeSelectOption>
    </NativeSelect>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="select">카테고리</Label>
      <NativeSelect id="select" className="w-full">
        <NativeSelectOption value="">카테고리를 선택하세요</NativeSelectOption>
        <NativeSelectOption value="development">Development</NativeSelectOption>
        <NativeSelectOption value="design">Design</NativeSelectOption>
        <NativeSelectOption value="accessibility">Accessibility</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const WithOptGroup: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="grouped-select">그룹화된 선택</Label>
      <NativeSelect id="grouped-select" className="w-full">
        <NativeSelectOption value="">선택하세요</NativeSelectOption>
        <NativeSelectOptGroup label="프론트엔드">
          <NativeSelectOption value="react">React</NativeSelectOption>
          <NativeSelectOption value="vue">Vue</NativeSelectOption>
          <NativeSelectOption value="angular">Angular</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="백엔드">
          <NativeSelectOption value="node">Node.js</NativeSelectOption>
          <NativeSelectOption value="python">Python</NativeSelectOption>
          <NativeSelectOption value="java">Java</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="disabled-select">비활성화된 선택</Label>
      <NativeSelect id="disabled-select" className="w-full" disabled>
        <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
        <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        <NativeSelectOption value="option3">옵션 3</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="default-select">기본값이 있는 선택</Label>
      <NativeSelect id="default-select" className="w-full" defaultValue="option2">
        <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
        <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        <NativeSelectOption value="option3">옵션 3</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-2">
      <Label htmlFor="error-select" className="text-destructive">
        카테고리
      </Label>
      <NativeSelect id="error-select" className="w-full" aria-invalid={true} defaultValue="">
        <NativeSelectOption value="">카테고리를 선택하세요</NativeSelectOption>
        <NativeSelectOption value="development">Development</NativeSelectOption>
        <NativeSelectOption value="design">Design</NativeSelectOption>
        <NativeSelectOption value="accessibility">Accessibility</NativeSelectOption>
      </NativeSelect>
      <p className="caption text-destructive">카테고리를 선택해주세요.</p>
    </div>
  ),
};

export const MultipleSelects: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="category">카테고리</Label>
        <NativeSelect id="category" className="w-full">
          <NativeSelectOption value="">카테고리를 선택하세요</NativeSelectOption>
          <NativeSelectOption value="development">Development</NativeSelectOption>
          <NativeSelectOption value="design">Design</NativeSelectOption>
          <NativeSelectOption value="accessibility">Accessibility</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="status">상태</Label>
        <NativeSelect id="status" className="w-full">
          <NativeSelectOption value="">상태를 선택하세요</NativeSelectOption>
          <NativeSelectOption value="active">활성</NativeSelectOption>
          <NativeSelectOption value="inactive">비활성</NativeSelectOption>
          <NativeSelectOption value="suspended">정지</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="role">역할</Label>
        <NativeSelect id="role" className="w-full">
          <NativeSelectOption value="">역할을 선택하세요</NativeSelectOption>
          <NativeSelectOption value="user">사용자</NativeSelectOption>
          <NativeSelectOption value="moderator">운영자</NativeSelectOption>
          <NativeSelectOption value="admin">관리자</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="basic">기본 선택</Label>
        <NativeSelect id="basic" className="w-full">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
          <NativeSelectOption value="option3">옵션 3</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="default">기본값</Label>
        <NativeSelect id="default" className="w-full" defaultValue="option2">
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
          <NativeSelectOption value="option3">옵션 3</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="grouped">그룹화</Label>
        <NativeSelect id="grouped" className="w-full">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOptGroup label="그룹 1">
            <NativeSelectOption value="g1-1">그룹 1 옵션 1</NativeSelectOption>
            <NativeSelectOption value="g1-2">그룹 1 옵션 2</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="그룹 2">
            <NativeSelectOption value="g2-1">그룹 2 옵션 1</NativeSelectOption>
            <NativeSelectOption value="g2-2">그룹 2 옵션 2</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="disabled" className="peer-disabled:opacity-50">
          비활성화
        </Label>
        <NativeSelect id="disabled" className="w-full" disabled>
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="error" className="text-destructive">
          에러 상태
        </Label>
        <NativeSelect id="error" className="w-full" aria-invalid={true} defaultValue="">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        </NativeSelect>
        <p className="caption text-destructive">에러 메시지가 여기에 표시됩니다.</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
