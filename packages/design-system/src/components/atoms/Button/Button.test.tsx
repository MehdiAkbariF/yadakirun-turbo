// packages/design-system/src/components/atoms/Button/Button.test.tsx

import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { expect, test, describe } from 'vitest';

// یک "مجموعه تست" برای کامپوننت Button تعریف می‌کنیم
describe('Button Component', () => {

  // اولین "مورد تست" ما
  test('should render the button with the correct children text', () => {
    // Arrange (آماده‌سازی): کامپوننت را با پراپ‌های مورد نظر در محیط تست رندر می‌کنیم
    const buttonText = 'Click Me!';
    render(<Button>{buttonText}</Button>);

    // Act (عمل): در این تست ساده، عمل خاصی مانند کلیک نداریم.

    // Assert (بررسی نتیجه): بررسی می‌کنیم که آیا نتیجه با انتظار ما مطابقت دارد یا نه
    
    // ابتدا، المنت دکمه را با استفاده از متنی که باید داخلش باشد، پیدا می‌کنیم
    const buttonElement = screen.getByText(buttonText);
    
    // سپس، بررسی می‌کنیم که آیا این المنت واقعاً در "صفحه" (محیط شبیه‌سازی شده) وجود دارد یا نه
    expect(buttonElement).toBeInTheDocument();
  });

  test('should apply the correct class for the primary variant', () => {
    // Arrange
    render(<Button variant="primary">Primary</Button>);

    // Act
    const buttonElement = screen.getByText('Primary');

    // Assert
    // بررسی می‌کنیم که آیا کلاس CSS صحیح به المنت اضافه شده است یا نه
    expect(buttonElement).toHaveClass('button--primary');
  });

});