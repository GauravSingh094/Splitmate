import type { Meta, StoryObj } from '@storybook/react';
import { DollarSign } from 'lucide-react';

import { Input } from '../forms/input';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'e.g. Grocery Shopping',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    placeholder: '0.00',
    prefixIcon: <DollarSign size={16} />,
  },
};

export const ErrorState: Story = {
  args: {
    value: 'invalid-email',
    error: true,
  },
};
