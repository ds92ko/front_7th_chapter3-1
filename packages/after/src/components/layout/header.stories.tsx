import { Header } from '@/components/layout';
import { ThemeProvider } from '@/contexts/theme.provider';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Header />,
};

export const WithContent: Story = {
  render: () => (
    <div>
      <Header />
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <h2 className="heading-1 mb-4">페이지 콘텐츠</h2>
        <p className="body mb-4">
          헤더가 고정되어 있어서 스크롤해도 상단에 유지됩니다. 테마 토글 버튼을 클릭하면 라이트/다크 모드를 전환할 수
          있습니다.
        </p>
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="bg-card border-border rounded-lg border p-4">
              <h3 className="heading-3 mb-2">섹션 {i + 1}</h3>
              <p className="body-small text-muted-foreground">
                이 섹션은 헤더의 sticky 동작을 확인하기 위한 더미 콘텐츠입니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Sticky: Story = {
  render: () => (
    <div>
      <Header />
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="bg-card border-border mb-4 rounded-lg border p-4">
          <h2 className="heading-2 mb-2">Sticky 헤더 테스트</h2>
          <p className="body-small text-muted-foreground">
            아래로 스크롤하면 헤더가 상단에 고정되어 있는 것을 확인할 수 있습니다.
          </p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="bg-card border-border rounded-lg border p-4">
              <p className="body">콘텐츠 블록 {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

