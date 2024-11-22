import { memo } from "react";
import PropTypes from "prop-types";
import "./Pagination.css";
import { usePagination } from "../../hooks/usePagination";

const Pagination = memo(function Pagination(paginator) {
  console.log("in Pagination.jsx");

  // const pageNumbers = Array.from(
  //   { length: paginator.totalPages },
  //   (_, i) => i + 1
  // );

  return (
    <p>{paginator.totalPages}</p>
    // <div className="pagination">
    //   <button
    //     className="pagination-button"
    //     onClick={prevPage}
    //     disabled={!hasPrev}
    //   >
    //     Previous
    //   </button>

    //   <div className="page-numbers">
    //     {pageNumbers.map((number) => (
    //       <button
    //         key={number}
    //         className={`page-number ${number === currentPage ? "active" : ""}`}
    //         onClick={goToPage(number)}
    //       >
    //         {number}
    //       </button>
    //     ))}
    //   </div>

    //   <button
    //     className="pagination-button"
    //     onClick={nextPage}
    //     disabled={!hasNext}
    //   >
    //     Next
    //   </button>
    // </div>
  );
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
