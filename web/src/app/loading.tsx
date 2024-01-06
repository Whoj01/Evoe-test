import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex flex-col items-start justify-start max-w-[1237px] w-full h-full gap-6 ">
      <div className="w-full flex items-center justify-between">
        <Skeleton className="w-[150px] h-[50px] bg-black-600" />
        <Skeleton className="w-[150px] h-[50px] bg-black-600" />
      </div>

      <Skeleton className="max-w-[1237] w-full max-h-[600px] h-full bg-black-600" />
    </div>
  )
}