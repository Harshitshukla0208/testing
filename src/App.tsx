import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDashboard from './components/MovieDashboard';
import MoviePlayer from './components/MoviePlayer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieDashboard />} />
        <Route path="/movie/:movieName" element={<MoviePlayer />} />
      </Routes>
    </Router>
  );
};

export default App;