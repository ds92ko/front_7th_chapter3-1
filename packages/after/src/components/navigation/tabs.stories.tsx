import { Tab, Tabs } from '@/components/navigation/tabs';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultTabs() {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onChange={setValue}>
      <Tab value="tab1">탭 1</Tab>
      <Tab value="tab2">탭 2</Tab>
      <Tab value="tab3">탭 3</Tab>
    </Tabs>
  );
}

export const Default: Story = {
  args: {
    value: 'tab1',
    onChange: () => {},
    children: null,
  },
  render: () => <DefaultTabs />,
};

function TwoTabsComponent() {
  const [value, setValue] = useState('post');
  return (
    <Tabs value={value} onChange={setValue}>
      <Tab value="post">게시글</Tab>
      <Tab value="user">사용자</Tab>
    </Tabs>
  );
}

export const TwoTabs: Story = {
  args: {
    value: 'post',
    onChange: () => {},
    children: null,
  },
  render: () => <TwoTabsComponent />,
};

function ThreeTabsComponent() {
  const [value, setValue] = useState('all');
  return (
    <Tabs value={value} onChange={setValue}>
      <Tab value="all">전체</Tab>
      <Tab value="active">활성</Tab>
      <Tab value="inactive">비활성</Tab>
    </Tabs>
  );
}

export const ThreeTabs: Story = {
  args: {
    value: 'all',
    onChange: () => {},
    children: null,
  },
  render: () => <ThreeTabsComponent />,
};

function ManyTabsComponent() {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onChange={setValue}>
      <Tab value="tab1">탭 1</Tab>
      <Tab value="tab2">탭 2</Tab>
      <Tab value="tab3">탭 3</Tab>
      <Tab value="tab4">탭 4</Tab>
      <Tab value="tab5">탭 5</Tab>
      <Tab value="tab6">탭 6</Tab>
    </Tabs>
  );
}

export const ManyTabs: Story = {
  args: {
    value: 'tab1',
    onChange: () => {},
    children: null,
  },
  render: () => <ManyTabsComponent />,
};

function LongTabNamesComponent() {
  const [value, setValue] = useState('settings');
  return (
    <Tabs value={value} onChange={setValue}>
      <Tab value="settings">설정</Tab>
      <Tab value="notifications">알림 설정</Tab>
      <Tab value="privacy">개인정보 보호</Tab>
    </Tabs>
  );
}

export const LongTabNames: Story = {
  args: {
    value: 'settings',
    onChange: () => {},
    children: null,
  },
  render: () => <LongTabNamesComponent />,
};
