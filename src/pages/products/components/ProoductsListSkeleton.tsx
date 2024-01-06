import { Skeleton } from "@/components/ui/skeleton";

const ProoductsListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <ul className="grid place-items-center gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <Skeleton className="w-72 h-96 rounded-md" />
        </li>
      ))}
    </ul>
  );
};

export default ProoductsListSkeleton;
