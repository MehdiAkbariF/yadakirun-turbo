// این یک کامپوننت سمت سرور است و نیازی به "use client" ندارد

import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { ContentSection } from '@monorepo/design-system/src/components/molecules/ContentSection/ContentSection';

// تعریف تایپ برای داده‌ها
interface TextContent {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface SeoContentSectionProps {
  textContentData: TextContent[];
}

export const SeoContentSection = ({ textContentData }: SeoContentSectionProps) => {
  return (
    <Container asSection className="my-1">
      {textContentData.map((section, index) => (
        <div key={section.id + index} className={index > 0 ? 'mt-12' : ''}>
          <ContentSection title={section.title}>
            {section.content}
          </ContentSection>
        </div>
      ))}
    </Container>
  );
};