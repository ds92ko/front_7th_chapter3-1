import { Badge } from '@/components/data-display/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'blue',
        'green',
        'orange',
        'red',
        'gray',
        'yellow',
        'purple',
        'pink',
        'outline',
      ],
      description: '뱃지의 색상 변형',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '뱃지의 크기',
    },
    rounded: {
      control: 'boolean',
      description: '둥근 모서리 여부',
    },
    children: {
      control: 'text',
      description: '뱃지 텍스트',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '뱃지',
    variant: 'primary',
    size: 'md',
    rounded: false,
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Blue: Story = {
  args: {
    children: 'Blue',
    variant: 'blue',
  },
};

export const Green: Story = {
  args: {
    children: 'Green',
    variant: 'green',
  },
};

export const Orange: Story = {
  args: {
    children: 'Orange',
    variant: 'orange',
  },
};

export const Red: Story = {
  args: {
    children: 'Red',
    variant: 'red',
  },
};

export const Gray: Story = {
  args: {
    children: 'Gray',
    variant: 'gray',
  },
};

export const Yellow: Story = {
  args: {
    children: 'Yellow',
    variant: 'yellow',
  },
};

export const Purple: Story = {
  args: {
    children: 'Purple',
    variant: 'purple',
  },
};

export const Pink: Story = {
  args: {
    children: 'Pink',
    variant: 'pink',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'primary',
    size: 'lg',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded',
    variant: 'primary',
    rounded: true,
  },
};

export const AllVariants: Story = {
  args: {
    children: '뱃지',
    variant: 'primary',
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    children: '뱃지',
    variant: 'primary',
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="primary" size="sm">
        Small
      </Badge>
      <Badge variant="primary" size="md">
        Medium
      </Badge>
      <Badge variant="primary" size="lg">
        Large
      </Badge>
    </div>
  ),
};

export const RoundedVariants: Story = {
  args: {
    children: '뱃지',
    variant: 'primary',
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary" rounded>
        Primary
      </Badge>
      <Badge variant="secondary" rounded>
        Secondary
      </Badge>
      <Badge variant="blue" rounded>
        Blue
      </Badge>
      <Badge variant="green" rounded>
        Green
      </Badge>
      <Badge variant="orange" rounded>
        Orange
      </Badge>
      <Badge variant="red" rounded>
        Red
      </Badge>
      <Badge variant="gray" rounded>
        Gray
      </Badge>
      <Badge variant="yellow" rounded>
        Yellow
      </Badge>
      <Badge variant="purple" rounded>
        Purple
      </Badge>
      <Badge variant="pink" rounded>
        Pink
      </Badge>
      <Badge variant="outline" rounded>
        Outline
      </Badge>
    </div>
  ),
};

