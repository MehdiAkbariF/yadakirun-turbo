import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// اطلاعات کلی در مورد کامپوننت
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button', // دسته‌بندی در سایدبار Storybook
  component: Button,
  tags: ['autodocs'], // برای ساخت خودکار مستندات
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// اولین استوری: حالت اصلی
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// دومین استوری: حالت ثانویه
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// استوری برای اندازه بزرگ
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};