import { MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명이 여기에 표시됩니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>이것은 카드 콘텐츠 영역입니다. 여기에 어떤 내용이든 넣을 수 있습니다.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">취소</Button>
        <Button>저장</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>액션이 있는 카드</CardTitle>
        <CardDescription>이 카드는 헤더에 액션 버튼이 있습니다.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>헤더에 액션 버튼이 있는 카드 콘텐츠입니다.</p>
      </CardContent>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>간단한 카드</CardTitle>
      </CardHeader>
      <CardContent>
        <p>제목과 콘텐츠만 있는 간단한 카드입니다.</p>
      </CardContent>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>푸터 없는 카드</CardTitle>
        <CardDescription>이 카드는 푸터 섹션이 없습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>푸터 액션이 없는 카드 콘텐츠입니다.</p>
      </CardContent>
    </Card>
  ),
};

export const WithBorder: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="border-b">
        <CardTitle>보더가 있는 카드</CardTitle>
        <CardDescription>이 카드는 헤더와 콘텐츠 사이에 보더가 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>보더 구분선이 있는 카드 콘텐츠입니다.</p>
      </CardContent>
      <CardFooter className="border-t">
        <Button variant="outline" className="w-full">
          액션
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>긴 콘텐츠가 있는 카드</CardTitle>
        <CardDescription>이 카드는 긴 콘텐츠를 어떻게 처리하는지 보여줍니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          이것은 카드가 확장된 콘텐츠를 어떻게 처리하는지 보여주는 긴 문단입니다. 카드는 레이아웃을
          깨뜨리지 않고 모든 텍스트를 적절히 포함하고 표시해야 합니다.
        </p>
        <p>
          카드 콘텐츠 영역 내에 여러 문단, 목록 또는 기타 콘텐츠 요소를 추가할 수 있습니다. 카드는
          구조를 유지하면서 콘텐츠를 수용하도록 적응합니다.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          더 보기
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>카드 1</CardTitle>
          <CardDescription>그리드 레이아웃의 첫 번째 카드입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>첫 번째 카드의 콘텐츠입니다.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">액션 1</Button>
        </CardFooter>
      </Card>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>카드 2</CardTitle>
          <CardDescription>그리드 레이아웃의 두 번째 카드입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>두 번째 카드의 콘텐츠입니다.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">액션 2</Button>
        </CardFooter>
      </Card>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>카드 3</CardTitle>
          <CardDescription>그리드 레이아웃의 세 번째 카드입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>세 번째 카드의 콘텐츠입니다.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">액션 3</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllComponents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>완전한 카드 예제</CardTitle>
          <CardDescription>
            이 예제는 모든 Card 하위 컴포넌트가 함께 작동하는 것을 보여줍니다.
          </CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">
              수정
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="mb-2">이것은 카드의 주요 콘텐츠 영역입니다.</p>
          <p>여기에 폼, 목록, 이미지 등 어떤 콘텐츠든 추가할 수 있습니다.</p>
        </CardContent>
        <CardFooter className="gap-2 border-t">
          <Button variant="outline">취소</Button>
          <Button>변경사항 저장</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
