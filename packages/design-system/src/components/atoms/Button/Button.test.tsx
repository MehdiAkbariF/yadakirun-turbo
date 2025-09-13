// مسیر: packages/design-system/src/components/atoms/Button/Button.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { expect, test, describe, vi } from 'vitest';

describe('Button Component', () => {
  test('should render correctly with children', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('should apply correct variant and size classes', () => {
    render(<Button variant="secondary" size="lg">Large Secondary</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('button--secondary');
    expect(buttonElement).toHaveClass('button--lg');
  });

  test('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  test('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /clickable/i });
    await user.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});