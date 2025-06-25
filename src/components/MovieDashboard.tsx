import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

interface Movie {
    "Movie Name": string;
    "movieLink": string;
}

interface ApiResponse {
    status: boolean;
    message: string;
    data: Movie[];
}

const MovieDashboard: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/get-all-movie`);
                const data: ApiResponse = await response.json();
                if (data && data.status && Array.isArray(data.data)) {
                    setMovies(data.data);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Loading movies...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Movie Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie["Movie Name"]}
                        movie={movie}
                        onClick={() => navigate(`/movie/${encodeURIComponent(movie["Movie Name"])}`)}
                    />
                ))}
            </div>
        </div>
    );
};


export default MovieDashboard;