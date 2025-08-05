import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPreviewProps {
    embedUrl: string;
    onLoad?: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ embedUrl, onLoad }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(prev => !prev);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="relative">
            <iframe
                src={`${embedUrl}?autoplay=1&mute=1`}
                className="w-full h-48 rounded-lg"
                allow="autoplay"
                onLoad={onLoad}
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                    onClick={togglePlay}
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                    onClick={toggleMute}
                >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </Button>
            </div>
        </div>
    );
};

export default VideoPreview;