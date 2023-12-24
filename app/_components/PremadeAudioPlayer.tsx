
import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export interface AudioPlayerProps {
    url: string;
    onPlay: (e: Event, url: string) => void;
}
const PremadeAudioPlayer = ({ onPlay, url }: AudioPlayerProps) => {
    return (
    <AudioPlayer
      autoPlay={false}
      src={url}
      onPlay={e => onPlay(e, url)}
      showFilledVolume={true}
      showFilledProgress={true}
      progressJumpStep={5000}
    />
  );
};
  

export default PremadeAudioPlayer;