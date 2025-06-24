import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VideoPreview from './VideoPreview';

interface MovieCardProps {
    movie: Movie;
    onClick: () => void;
}

interface Movie {
    movieName: string;
    movieLink: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [, setIsLoading] = useState(true);

    const getEmbedUrl = (driveUrl: string): string => {
        const fileId = driveUrl.match(/\/d\/(.+?)\//)?.[1];
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
    };

    const embedUrl = getEmbedUrl(movie.movieLink);

    return (
        <Card
            className="cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={onClick}
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
        >
            <CardHeader>
                <CardTitle>{movie["Movie Name"]}</CardTitle>
            </CardHeader>
            <CardContent>
                {showPreview ? (
                    <VideoPreview
                        embedUrl={embedUrl}
                        onLoad={() => setIsLoading(false)}
                    />
                ) : (
                    <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                        <span className="text-slate-600">Hover to preview</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MovieCard;