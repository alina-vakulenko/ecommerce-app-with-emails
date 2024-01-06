import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category";

interface CategoriesSelectProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

const CategoriesSelect = ({
  categories,
  onCategoryClick,
}: CategoriesSelectProps) => {
  return (
    <Select onValueChange={onCategoryClick}>
      <SelectTrigger className="min-w-sm w-full lg:hidden">
        <SelectValue placeholder="Category" className="capitalize" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="text-muted-foreground">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category} className="capitalize">
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoriesSelect;
