import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import useDebounce from '../hooks/useDebounce'; 
import { fetchMoviesData } from '../api/tmdb';

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500); 

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const results = await fetchMoviesData(debouncedQuery);
        setMovies(results);
      } catch (err) {
        console.error("Error loading movies in component:", err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="home">
      <h1>MovieClub</h1>
      <div className="search-container">
        <div className="search-wrapper">
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search movies"
            value={query}
            onChange={handleInputChange}
            className="search-bar"
          />
        </div>
      </div>
      
      <div className="movies-container">
        {loading ? (
          <div className="spinner"></div>
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p style={{ color: 'gray', fontStyle: 'italic' }}>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;