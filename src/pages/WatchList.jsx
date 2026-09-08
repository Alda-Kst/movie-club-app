import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

function Watchlist() {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieclub_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  
  const handleToggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem('movieclub_favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="home">
      <h1>My Watchlist</h1>
      
      <div className="movies-container">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onToggleFavorite={handleToggleFavorite}
              isFavorite={true} 
            />
          ))
        ) : (
          <p style={{ color: 'gray', fontStyle: 'italic', marginTop: '20px' }}>
            Your watchlist is empty. Add some movies from the home page!
          </p>
        )}
      </div>
    </div>
  );
}

export default Watchlist;