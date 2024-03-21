import { useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

interface MediaPlayerProps {
  url: string;
  is_video: boolean;
}

const MediaPlayer : React.FC<MediaPlayerProps> = ({url, is_video}) => {

  useEffect(() => {
    
  }, [url]);

  return (
    <div>
      {is_video ? (
        <VideoPlayer streamUrl={url} />
      ): (
        <AudioPlayer streamUrl={url} />
    )
    }
    </div>
    
  
  );
};

export default MediaPlayer;
