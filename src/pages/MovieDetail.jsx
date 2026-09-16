import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdb';
import Skeleton from '../components/Skeleton';
import '../components/Skeleton.css';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to load movie details", error);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-detail">
        <Link to="/" className="back-button">← Back to Home</Link>
        <div className="movie-detail-content">
          <Skeleton style={{ width: '300px', height: '450px', borderRadius: '8px' }} />
          <div className="movie-info" style={{ flex: 1 }}>
            <Skeleton style={{ width: '60%', height: '40px', marginBottom: '20px' }} />
            <Skeleton style={{ width: '40%', height: '20px', marginBottom: '10px' }} />
            <Skeleton style={{ width: '100%', height: '100px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return <div className="movie-detail"><p>Movie not found.</p></div>;

  return (
    <div className="movie-detail">
      <Link to="/" className="back-button">← Back to Home</Link>

      <div className="movie-detail-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />

        <div className="movie-info">
          <h1>{movie.title}</h1>
          
          {/* Genres Badges */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="movie-genres" style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
              {movie.genres.map((genre) => (
                <span 
                  key={genre.id} 
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="movie-meta" style={{ display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '0.95rem', opacity: '0.9' }}>
            <p><strong>Release:</strong> {movie.release_date}</p>
            {movie.runtime && <p><strong>Runtime:</strong> {movie.runtime} min</p>}
            <p><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
          </div>

          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;