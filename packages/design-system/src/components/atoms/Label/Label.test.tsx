import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Label } from './Label';

describe('Label Component', () => {
  test('should render with default props (p tag, base size, normal weight, primary color)', () => {
    render(<Label>Default Label</Label>);
    
    const labelElement = screen.getByText('Default Label');
    expect(labelElement.tagName).toBe('P');
    expect(labelElement).toHaveClass('label');
    expect(labelElement).toHaveClass('label--size-base');
    expect(labelElement).toHaveClass('label--weight-normal');
    expect(labelElement).toHaveClass('label--color-primary');
  });

  test('should render as a different HTML element when "as" prop is provided', () => {
    render(<Label as="h1">Heading 1</Label>);
    
    const headingElement = screen.getByRole('heading', { level: 1, name: 'Heading 1' });
    expect(headingElement.tagName).toBe('H1');
  });

  test('should apply correct size, weight, and color classes', () => {
    render(
      <Label size="3x" weight="bold" color="secondary">
        Custom Label
      </Label>
    );
    
    const labelElement = screen.getByText('Custom Label');
    expect(labelElement).toHaveClass('label--size-3x');
    expect(labelElement).toHaveClass('label--weight-bold');
    expect(labelElement).toHaveClass('label--color-secondary');
  });

  test('should apply additional className', () => {
    render(<Label className="my-custom-class">With custom class</Label>);
    
    const labelElement = screen.getByText('With custom class');
    expect(labelElement).toHaveClass('my-custom-class');
  });
});