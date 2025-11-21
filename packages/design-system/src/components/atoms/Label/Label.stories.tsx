import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { LabelProps } from './Label.types';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2x', '3x', '4x', '5xl'],
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semi-bold', 'bold', 'extra-bold', 'black'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'placeholder', 'on-brand', 'link', 'heading', 'disabled'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Default: Story = {
  args: {
    children: 'این یک لیبل پیش‌فرض است.',
    size: 'base',
    weight: 'normal',
    color: 'primary',
  },
};

export const Heading1: Story = {
  args: {
    as: 'h1',
    size: '4x',
    weight: 'bold',
    color: 'heading',
    children: 'این یک عنوان H1 است',
  },
};

export const Subtitle: Story = {
  args: {
    as: 'p',
    size: 'lg',
    weight: 'light',
    color: 'secondary',
    children: 'این یک زیرعنوان یا متن ثانویه است.',
  },
};

export const LinkText: Story = {
  args: {
    as: 'span',
    size: 'sm',
    weight: 'medium',
    color: 'link',
    children: 'این متن شبیه لینک است.',
  },
};