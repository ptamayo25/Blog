import PropTypes from "prop-types";
import "./Pagination.css";

function Pagination({ paginator }) {
  const {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  } = paginator;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={prevPage}
        disabled={!hasPrev}
      >
        Previous
      </button>

      <div className="page-numbers">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`page-number ${number === currentPage ? "active" : ""}`}
            onClick={() => goToPage(number)}

          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="pagination-button"
        onClick={nextPage}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  paginator: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    goToPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Pagination;