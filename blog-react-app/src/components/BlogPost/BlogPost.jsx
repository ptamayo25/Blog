import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection.jsx';
import { calculateReadTime } from '../../utils/readTime';
import './BlogPost.css';

function BlogPost({ id, title, content, author, date, searchTerm }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    setReadTime(calculateReadTime(content));
  }, [content]);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayContent = isExpanded
    ? content
    : content.slice(0, 100) + (content.length > 100 ? "..." : "");

  const highlightText = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <article className="blog-post">
      <div className="blog-post__header">
        <h2 className="blog-post__title">{highlightText(title, searchTerm)}</h2>
        <div className="blog-post__meta">
          <span className="blog-post__author">By {author}</span>
          <time className="blog-post__date">{date}</time>
          <span className="blog-post__read-time">{readTime} min read</span>
        </div>
      </div>

      <div className="blog-post__content">
        <p>{highlightText(displayContent, searchTerm)}</p>
        {content.length > 100 && (
          <button onClick={toggleContent} className="blog-post__expand">
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      <div className="blog-post__actions">
        <LikeButton initialLikes={0} />
        <CommentSection postId={id} />
      </div>
    </article>
  );
}

BlogPost.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
};

export default BlogPost;