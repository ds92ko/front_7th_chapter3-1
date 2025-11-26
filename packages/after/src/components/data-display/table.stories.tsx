import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/data-display/table';
import { Button } from '@/components/forms/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table className="w-[500px]">
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>홍길동</TableCell>
          <TableCell>hong@example.com</TableCell>
          <TableCell>관리자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table className="w-[500px]">
      <TableCaption>사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>홍길동</TableCell>
          <TableCell>hong@example.com</TableCell>
          <TableCell>관리자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table className="w-[500px]">
      <TableHeader>
        <TableRow>
          <TableHead>항목</TableHead>
          <TableHead className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>상품 A</TableCell>
          <TableCell className="text-right">10,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>상품 B</TableCell>
          <TableCell className="text-right">20,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>상품 C</TableCell>
          <TableCell className="text-right">15,000원</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>합계</TableHead>
          <TableHead className="text-right">45,000원</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table className="w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>홍길동</TableCell>
          <TableCell>hong@example.com</TableCell>
          <TableCell>활성</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                수정
              </Button>
              <Button variant="destructive" size="sm">
                삭제
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>활성</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                수정
              </Button>
              <Button variant="destructive" size="sm">
                삭제
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>비활성</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                수정
              </Button>
              <Button variant="destructive" size="sm">
                삭제
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const ManyRows: Story = {
  render: () => (
    <Table className="w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>작성일</TableHead>
          <TableHead>조회수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>게시글 제목 {i + 1}</TableCell>
            <TableCell>작성자 {i + 1}</TableCell>
            <TableCell>2024-01-{String(i + 1).padStart(2, '0')}</TableCell>
            <TableCell>{(i + 1) * 10}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Complete: Story = {
  render: () => (
    <Table className="w-[700px]">
      <TableCaption>2024년 1월 매출 현황</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>날짜</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead>수량</TableHead>
          <TableHead className="text-right">단가</TableHead>
          <TableHead className="text-right">합계</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2024-01-01</TableCell>
          <TableCell>상품 A</TableCell>
          <TableCell>5</TableCell>
          <TableCell className="text-right">10,000원</TableCell>
          <TableCell className="text-right">50,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-02</TableCell>
          <TableCell>상품 B</TableCell>
          <TableCell>3</TableCell>
          <TableCell className="text-right">20,000원</TableCell>
          <TableCell className="text-right">60,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-03</TableCell>
          <TableCell>상품 C</TableCell>
          <TableCell>2</TableCell>
          <TableCell className="text-right">15,000원</TableCell>
          <TableCell className="text-right">30,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-04</TableCell>
          <TableCell>상품 A</TableCell>
          <TableCell>10</TableCell>
          <TableCell className="text-right">10,000원</TableCell>
          <TableCell className="text-right">100,000원</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead colSpan={3}>총합</TableHead>
          <TableHead className="text-right">240,000원</TableHead>
          <TableHead className="text-right">240,000원</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: {
    layout: 'padded',
  },
};
