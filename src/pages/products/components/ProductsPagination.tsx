import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductsPaginationProps {
  currPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageChange: (page: number) => void;
}

const ProductsPagination = ({
  currPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  handlePageChange,
}: ProductsPaginationProps) => {
  return (
    <Pagination className="mt-auto">
      <PaginationContent>
        <PaginationPrevious
          onClick={handlePrevPage}
          className={currPage === 1 ? "pointer-events-none" : "cursor-pointer"}
        />

        {[...Array(totalPages)].map((_, index) => (
          <PaginationLink
            key={index}
            className={
              currPage === index + 1
                ? "bg-zinc-200 rounded-md"
                : "cursor-pointer"
            }
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PaginationLink>
        ))}
        <PaginationNext
          onClick={handleNextPage}
          className={
            currPage === totalPages || totalPages === 0
              ? "pointer-events-none"
              : "cursor-pointer"
          }
        />
      </PaginationContent>
    </Pagination>
  );
};

export default ProductsPagination;
