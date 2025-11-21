import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Search } from 'lucide-react';
import { Input } from './Input';

describe('Input Component', () => {
  test('should render a basic input element correctly', () => {
    render(<Input id="username" placeholder="Enter username" />);
    
    // ค้นหา input ด้วย placeholder
    const inputElement = screen.getByPlaceholderText('Enter username');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('input-field');
  });

  test('should render a label and associate it with the input', () => {
    render(<Input id="email" label="Email Address" />);
    
    // ค้นหา label ด้วย text
    const labelElement = screen.getByText('Email Address');
    expect(labelElement).toBeInTheDocument();
    
    // ค้นหา input ด้วย label text (วิธีที่ดีที่สุดสำหรับ accessibility)
    const inputElement = screen.getByLabelText('Email Address');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.id).toBe('email');
  });

  test('should render with a left icon', () => {
    render(<Input id="search" leftIcon={<Search data-testid="search-icon" />} />);
    
    // ตรวจสอบว่า icon ถูกเรนเดอร์
    const iconElement = screen.getByTestId('search-icon');
    expect(iconElement).toBeInTheDocument();
    
    // ตรวจสอบว่า input มี class ที่ถูกต้องเมื่อมี icon
    const inputElement = screen.getByRole('textbox'); // เนื่องจากไม่มี label หรือ placeholder ที่แน่นอน
    expect(inputElement).toHaveClass('input-field--with-icon');
  });

  test('should display an error message and apply error styles', () => {
    const errorMessage = 'This field is required';
    render(<Input id="password" label="Password" error={errorMessage} />);
    
    // ตรวจสอบว่า error message ถูกแสดงผล
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('input-error-message');
    
    // ตรวจสอบว่า container หลักมี class error
    const inputElement = screen.getByLabelText('Password');
    const container = inputElement.closest('.input-container');
    expect(container).toHaveClass('input-container--error');
  });

  test('should be disabled when the disabled prop is true', () => {
    render(<Input id="disabled-input" label="Disabled" disabled />);
    
    const inputElement = screen.getByLabelText('Disabled');
    expect(inputElement).toBeDisabled();
    
    // ตรวจสอบว่า container หลักมี class disabled
    const container = inputElement.closest('.input-container');
    expect(container).toHaveClass('input-container--disabled');
  });

  test('should allow user to type into the input', async () => {
    const user = userEvent.setup();
    render(<Input id="typing-test" label="Typing Test" />);
    
    const inputElement = screen.getByLabelText('Typing Test') as HTMLInputElement;
    
    // จำลองการพิมพ์ของผู้ใช้
    await user.type(inputElement, 'Hello, World!');
    
    // ตรวจสอบว่าค่าของ input ถูกอัปเดต
    expect(inputElement.value).toBe('Hello, World!');
  });
});