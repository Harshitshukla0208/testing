export const getDirectVideoUrl = async (driveUrl: string): Promise<string> => {
    // Since we can't directly get video URLs from Google Drive,
    // we'll need to get it from your API
    const fileId = driveUrl.match(/\/d\/(.+?)\//)?.[1] || '';
    // This is a placeholder URL - replace with your actual video URL
    return `https://your-video-cdn.com/${fileId}`;
};