// مسیر: apps/yadakirun-front/src/components/layout/Footer.tsx
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';

export const Footer = () => {
  return (
    <footer className="w-full py-8 bg-gray-800 text-white z-10">
      <Container>
        <div className="text-center">
          <Label as="p" color="secondary">
            تمامی حقوق برای یاداکیرون محفوظ است. © 2025
          </Label>
        </div>
      </Container>
    </footer>
  );
};