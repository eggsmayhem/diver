
import React, { useState, useEffect } from 'react';

export interface AudioPlayerProps {
    url: string;
}
const AudioPlayer = ({ url }: AudioPlayerProps) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio(url));
    return () => {
      audio && audio.pause(); // Pause if component unmounts
    };
  }, [url]);

  const playAudio = () => {
    audio && audio.play();
    setPlaying(true);
  };

  const pauseAudio = () => {
    audio && audio.pause();
    setPlaying(false);
  };

  return (
    <div>
      <button onClick={playing ? pauseAudio : playAudio}>I'm a button</button>
      <div>Hello audio player!</div>
    </div>
  );
};

export default AudioPlayer;