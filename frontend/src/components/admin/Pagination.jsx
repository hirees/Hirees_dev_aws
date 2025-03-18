import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  onPageSizeChange
}) => {
  // Calculate page range to display (always show 5 pages if possible)
  const getPageRange = () => {
    const pageRange = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }

    return pageRange;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handlePageSizeChange = (e) => {
    onPageSizeChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between items-center bg-white p-4 border rounded shadow-sm mt-4">
      {/* Page size selector */}
      <div className="flex items-center mt-3 sm:mt-0 text-xs text-gray-500">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="mx-2 p-1 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <span>per page</span>
        <span className="ml-4">
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} - {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex h-8 w-8 p-0 items-center justify-center"
        >
          <span className="sr-only">First page</span>
          <ChevronLeft className="h-4 w-4" />
          <ChevronLeft className="h-4 w-4 -ml-2" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageRange().map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className="h-8 w-8 p-0"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex h-8 w-8 p-0 items-center justify-center"
        >
          <span className="sr-only">Last page</span>
          <ChevronRight className="h-4 w-4" />
          <ChevronRight className="h-4 w-4 -ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;