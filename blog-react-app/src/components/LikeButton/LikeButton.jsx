import { useState } from 'react';
import PropTypes from 'prop-types';
import './LikeButton.css';

function LikeButton({ initialLikes, onLikeChange }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  //if like button was already clicked subtract 1 from the total number
  //of likes and if not add 1 to the total number of likes (updates state of isLiked for each post)
  const handleLikeClick = () => {
    setIsLiked(prevIsLiked => {
      const newIsLiked = !prevIsLiked;
      setLikes(prevLikes => {
        const newLikes = prevIsLiked ? prevLikes - 1 : prevLikes + 1;
        onLikeChange?.(newLikes);
        return newLikes;
      });
      return newIsLiked;
    });
  };
// changes liked button icon and classname (for styling purposes) depending on if liking or unlikeing
  return (
    <button 
      className={`like-button ${isLiked ? 'like-button--liked' : ''}`}
      onClick={handleLikeClick}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <span className="like-button__icon">
        {isLiked ? '❤️' : '🤍'}
      </span>
      <span className="like-button__count">{likes}</span>
    </button>
  );
}

LikeButton.propTypes = {
  initialLikes: PropTypes.number.isRequired,
  onLikeChange: PropTypes.func
};

export default LikeButton;