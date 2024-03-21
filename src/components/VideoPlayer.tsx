import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  streamUrl: string;
}

const VideoPlayer = ({ streamUrl }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Valore tra 0 e 1

  // Funzione per gestire la riproduzione e la pausa
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Funzione per gestire il cambio di volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (

    <div className="video-player">
      <video ref={videoRef} src={streamUrl} controls={false} />
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button><br></br>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange}/>
      </div>
    </div>  
  );
};

export default VideoPlayer;