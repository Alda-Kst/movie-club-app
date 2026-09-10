import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'; 
import './FavoriteButton.css'; 

function MovieCard({ movie, onToggleFavorite, isFavorite }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      data-tooltip={`Year: ${movie.release_date?.slice(0, 4) || 'N/A'}`}
    >
      <button 
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label="Toggle favorite"
      >
        <svg 
          className="favorite-icon" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </Link>
  );
}

export default MovieCard;