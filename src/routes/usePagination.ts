import { useState } from "react";

export const usePagination = <T>({
  items,
  perPage,
}: {
  items: T[];
  perPage: number;
}) => {
  const [currPage, setCurrPage] = useState(1);

  const startIndex = (currPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(items.length / perPage);

  const paginatedItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const handleNextPage = () => {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  return {
    setCurrPage,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    currPage,
    totalPages,
    paginatedItems,
  };
};
