import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import WatchList from './pages/WatchList'; 
import Navbar from './components/Navbar';
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<WatchList />} /> 
      </Routes>
    </Router>
  );
}

export default App;