import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleFirstPage}>
            First
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrevPage}>
            Prev
          </button>
        </li>
        <li className="page-item disabled">
          <span className="page-link">
            Page {currentPage} of {totalPages}
          </span>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleNextPage}>
            Next
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleLastPage}>
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;