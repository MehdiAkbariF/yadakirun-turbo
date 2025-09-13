// مسیر: packages/design-system/.storybook/preview.ts

import type { Preview } from "@storybook/react";
import { useEffect } from 'react';
// وارد کردن استایل‌های گلوبال
import "../src/styles/global.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Decorator برای تغییر تم در Storybook
  decorators: [
    (Story, context) => {
      const { globals } = context;
      const theme = globals.theme || 'light'; // تم پیش‌فرض light

      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

      return Story();
    },
  ],
  // تعریف یک کنترلر سراسری برای تم
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
};

export default preview;