import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Movie {
    "Movie Name": string;
    "Movie Link": string;
}

interface ApiResponse {
    status: boolean;
    message: string;
    data: Movie[] | Movie;
}

const MoviePlayer: React.FC = () => {
    const { movieName } = useParams<{ movieName: string }>();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `http://ec2-43-204-220-171.ap-south-1.compute.amazonaws.com:8080/api/movies/get-movie?movie_name=${encodeURIComponent(movieName || '')}`
                );
                const data: ApiResponse = await response.json();
                if (data.status && !Array.isArray(data.data)) {
                    setMovieData(data.data);
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieName) {
            fetchMovie();
        }
    }, [movieName]);

    const getEmbedUrl = (driveUrl: string): string => {
        const fileId = driveUrl.match(/\/d\/(.+?)\//)?.[1];
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Loading movie...</div>
            </div>
        );
    }

    if (!movieData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Movie not found</div>
            </div>
        );
    }

    const embedUrl = movieData ? getEmbedUrl(movieData["Movie Link"]) : '';

    return (
        <div className="container mx-auto p-6">
            <Button
                variant="outline"
                className="mb-6"
                onClick={() => navigate('/')}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>{movieData["Movie Name"]}</CardTitle>
                </CardHeader>
                <CardContent>
                    <iframe
                        src={embedUrl}
                        className="w-full h-[600px] rounded-lg"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default MoviePlayer;