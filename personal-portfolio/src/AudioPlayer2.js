import React, { useState } from 'react';
import Sound from 'react-sound'; 
import wav2 from 'D:/Project Docs/web-dev-projects-main/web-dev-projects-main/personal-portfolio/src/2.wav';

const PlaySound = ({
  handleSongLoading,
  handleSongPlaying,
  handleSongFinishedPlaying
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <button onClick={() => setIsPlaying(!isPlaying)} className="new-email-bx-button">
        {!isPlaying ? 'Play' : 'Stop'}
      </button>
      <Sound
        url={wav2}
        playStatus={
          isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
        onLoading={handleSongLoading}
        onPlaying={handleSongPlaying}
        onFinishedPlaying={handleSongFinishedPlaying}
      />
    </div>
  );
};

export default PlaySound;