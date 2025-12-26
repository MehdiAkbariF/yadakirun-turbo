import { Spinner } from "@monorepo/design-system/src/components/atoms/Spinner/Spinner";


export default function Loading() {
  
  
  return (
    <div className="flex justify-center items-center w-full h-[60vh]">
      <Spinner size="sm" color="primary" />
    </div>
  );
}