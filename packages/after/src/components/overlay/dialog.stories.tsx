import { Button } from '@/components/form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/overlay';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// 공통 Dialog 래퍼 컴포넌트
function DialogWrapper({
  children,
  defaultOpen = false,
}: {
  children: (open: boolean, setOpen: (open: boolean) => void) => ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return <>{children(open, setOpen)}</>;
}

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>다이얼로그 열기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>다이얼로그 제목</DialogTitle>
              <DialogDescription>이것은 다이얼로그 설명입니다.</DialogDescription>
            </DialogHeader>
            <div className="body">다이얼로그 콘텐츠가 여기에 표시됩니다.</div>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const Simple: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>간단한 다이얼로그</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>간단한 다이얼로그</DialogTitle>
            </DialogHeader>
            <div className="body">제목만 있는 간단한 다이얼로그입니다.</div>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const WithFooter: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>푸터가 있는 다이얼로그</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>확인 다이얼로그</DialogTitle>
              <DialogDescription>이 작업을 계속하시겠습니까?</DialogDescription>
            </DialogHeader>
            <div className="body">이 작업은 되돌릴 수 없습니다.</div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const WithoutCloseButton: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>닫기 버튼 없는 다이얼로그</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>닫기 버튼 없음</DialogTitle>
              <DialogDescription>이 다이얼로그는 닫기 버튼이 없습니다.</DialogDescription>
            </DialogHeader>
            <div className="body">푸터의 버튼을 사용해서 닫아야 합니다.</div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const LongContent: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>긴 콘텐츠 다이얼로그</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>긴 콘텐츠가 있는 다이얼로그</DialogTitle>
              <DialogDescription>
                이 다이얼로그는 스크롤 가능한 긴 콘텐츠를 포함합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="body min-h-0 flex-1 space-y-4 overflow-y-auto">
              <p>
                이것은 매우 긴 콘텐츠가 있는 다이얼로그입니다. 여러 줄에 걸쳐 표시될 수 있으며,
                사용자에게 중요한 정보를 전달합니다.
              </p>
              <p>
                다이얼로그는 레이아웃을 깨뜨리지 않고 모든 텍스트를 적절히 포함하고 표시해야 합니다.
                스크롤이 필요한 경우 자동으로 스크롤바가 표시됩니다.
              </p>
              <p>
                여러 문단, 목록 또는 기타 콘텐츠 요소를 추가할 수 있습니다. 다이얼로그는 구조를
                유지하면서 콘텐츠를 수용하도록 적응합니다.
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>첫 번째 항목</li>
                <li>두 번째 항목</li>
                <li>세 번째 항목</li>
                <li>네 번째 항목</li>
              </ul>
              <p>
                이것은 마지막 문단입니다. 다이얼로그가 충분히 길어서 스크롤이 필요한지 확인할 수
                있습니다.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const Form: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>폼 다이얼로그</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>사용자 정보 입력</DialogTitle>
              <DialogDescription>사용자 정보를 입력해주세요.</DialogDescription>
            </DialogHeader>
            <div className="body space-y-4">
              <div className="space-y-2">
                <label className="label">이름</label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  className="border-border bg-background body w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="label">이메일</label>
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  className="border-border bg-background body w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>저장</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const Confirmation: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">삭제하기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
              <DialogDescription>
                이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <div className="body">삭제된 데이터는 복구할 수 없습니다.</div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const AllComponents: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <DialogWrapper>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>완전한 다이얼로그</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>완전한 다이얼로그 예제</DialogTitle>
              <DialogDescription>
                이 예제는 모든 Dialog 하위 컴포넌트가 함께 작동하는 것을 보여줍니다.
              </DialogDescription>
            </DialogHeader>
            <div className="body space-y-4">
              <p>이것은 다이얼로그의 주요 콘텐츠 영역입니다.</p>
              <p>여기에 폼, 목록, 이미지 등 어떤 콘텐츠든 추가할 수 있습니다.</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">닫기 (DialogClose)</Button>
              </DialogClose>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DialogWrapper>
  ),
};

export const Sizes: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <DialogWrapper>
        {(open, setOpen) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Small (max-w-sm)</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>작은 다이얼로그</DialogTitle>
                <DialogDescription>작은 크기의 다이얼로그입니다.</DialogDescription>
              </DialogHeader>
              <div className="body">콘텐츠가 여기에 표시됩니다.</div>
            </DialogContent>
          </Dialog>
        )}
      </DialogWrapper>
      <DialogWrapper>
        {(open, setOpen) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Medium (기본, max-w-lg)</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>중간 크기 다이얼로그</DialogTitle>
                <DialogDescription>기본 크기의 다이얼로그입니다.</DialogDescription>
              </DialogHeader>
              <div className="body">콘텐츠가 여기에 표시됩니다.</div>
            </DialogContent>
          </Dialog>
        )}
      </DialogWrapper>
      <DialogWrapper>
        {(open, setOpen) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Large (max-w-2xl)</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>큰 다이얼로그</DialogTitle>
                <DialogDescription>큰 크기의 다이얼로그입니다.</DialogDescription>
              </DialogHeader>
              <div className="body">콘텐츠가 여기에 표시됩니다.</div>
            </DialogContent>
          </Dialog>
        )}
      </DialogWrapper>
      <DialogWrapper>
        {(open, setOpen) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Extra Large (max-w-4xl)</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>매우 큰 다이얼로그</DialogTitle>
                <DialogDescription>매우 큰 크기의 다이얼로그입니다.</DialogDescription>
              </DialogHeader>
              <div className="body">콘텐츠가 여기에 표시됩니다.</div>
            </DialogContent>
          </Dialog>
        )}
      </DialogWrapper>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
