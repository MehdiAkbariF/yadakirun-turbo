import { Spinner } from "@monorepo/design-system/src/components/atoms/Spinner/Spinner";

// این کامپوننت یک UI ساده برای حالت لودینگ است
export default function Loading() {
  // شما می‌توانید یک "اسکلت" (Skeleton) کامل از صفحه را اینجا بسازید
  // یا برای سادگی، فقط یک اسپینر در مرکز صفحه نمایش دهید.
  return (
    <div className="flex justify-center items-center w-full h-[60vh]">
      <Spinner size="lg" color="primary" />
    </div>
  );
}