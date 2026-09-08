import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'; 

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      data-tooltip={`Year: ${movie.release_date?.slice(0, 4) || 'N/A'}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </Link>
  );
}

export default MovieCard;
