import React, { useEffect } from 'react';

const MediaPlayer = ({ url }: { url: string }, is_video: boolean) => {
  

  useEffect(() => {
    
  }, [url]);

  return (
    <div>
      {is_video ? (
        <video src={url} controls autoPlay />
      ) : (
        <audio src={url} controls autoPlay />
      )}
    </div>
  );
};

export default MediaPlayer;
