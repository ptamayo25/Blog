import PropTypes from "prop-types";
import { useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import { useFilters } from "../../hooks/useFilters";
import BlogSearch from "../BlogSearch/BlogSearch";
import BlogFilters from "../BlogFilters/BlogFilters";
import BlogPost from "../BlogPost/BlogPost";
import Pagination from "../Pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";
import "./BlogList.css";

function BlogList({ posts }) {
  // const [currentPage, setCurrentPage] = useState(1);
  const {
    filters,
    handleFilterChange,
    filteredItems,
    categories,
    authors,
    allTags,
  } = useFilters(posts);

  const {
    searchTerm,
    handleSearch,
    results: searchResults,
    isSearching,
  } = useSearch(filteredItems);

  const paginator = usePagination(searchResults);
  // console.log("paginatedItems: ", paginatedItems);

  const currentPosts = paginator.items;

  return (
    <div className="blog-list-container">
      <div className="blog-controls">
        <BlogSearch
          searchTerm={searchTerm}
          onSearch={handleSearch}
          resultCount={searchResults.length}
        />
        <BlogFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categories}
          authors={authors}
          allTags={allTags}
        />
      </div>

      {currentPosts.length > 0 ? (
        <>
          <div className="blog-posts">
            {currentPosts.map((post) => (
              <BlogPost key={post.id} {...post} searchTerm={searchTerm} />
            ))}
          </div>
          <Pagination paginator={paginator} />
        </>
      ) : (
        <div className="no-results">No posts found matching your criteria.</div>
      )}
    </div>
  );
}

BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      readTime: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BlogList;
