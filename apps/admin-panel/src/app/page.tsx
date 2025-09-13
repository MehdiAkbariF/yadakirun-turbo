// apps/admin-panel/src/app/page.tsx

"use client"; // این خط برای استفاده از useState در کلاینت لازم است
import React, { useState } from 'react';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';

export default function HomePage() {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1 style={{ color: 'var(--text-color)' }}>Welcome to Admin Panel!</h1>
      <p style={{ color: 'var(--text-color)' }}>Let's test our Design System components:</p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" size="lg" onClick={handleButtonClick}>
          Primary Button ({count})
        </Button>
        <Button variant="secondary" size="md">
          Secondary Button
        </Button>
        <Button variant="danger" size="sm" disabled>
          Disabled Danger
        </Button>
      </div>

      <p style={{ color: 'var(--text-color)' }}>Button click count: {count}</p>
    </div>
  );
}