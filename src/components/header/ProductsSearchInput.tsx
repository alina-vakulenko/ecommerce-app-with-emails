import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

const ProductsSearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchParams((params) => {
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      return params;
    });
  };

  return (
    <Input
      type="search"
      placeholder="Search by name"
      className="sm:w-[300px]"
      value={searchParams.get("q") || ""}
      onChange={handleSearch}
    />
  );
};

export default ProductsSearchInput;
