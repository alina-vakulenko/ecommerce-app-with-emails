import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
  activeCategory: Category | null;
  onCategoryClick: (category: Category) => void;
}

const Sidebar = ({
  className,
  categories,
  activeCategory,
  onCategoryClick,
}: SidebarProps) => {
  return (
    <div className={cn("py-12", className)}>
      <div className="space-y-4">
        <div className="py-4">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {categories?.map((category, i) => (
                <Button
                  key={`${category}-${i}`}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-normal text-md capitalize",
                    category === activeCategory ? "bg-zinc-300" : ""
                  )}
                  onClick={() => onCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start font-normal text-md capitalize"
                onClick={() => onCategoryClick("")}
              >
                All
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
