import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ streamUrl }: { streamUrl: string }) => {
  // Stato e riferimenti per il player audio
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effetto per gestire la riproduzione automatica in base allo stato
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  // Funzioni per controllare il player
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };
  
  // JSX per i controlli personalizzati
  return (
    <div>
      <audio ref={audioRef} src={streamUrl} preload="none" />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button><br></br>
      <h3>Volume</h3><br></br>
      <input type="range" min="0" max="1" step="0.01" onChange={changeVolume} /><br></br>
    </div>
  );
};

export default AudioPlayer;
