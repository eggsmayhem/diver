
import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export interface AudioPlayerProps {
    url: string;
}
const PremadeAudioPlayer = ({ url }: AudioPlayerProps) => {
    return (
    <AudioPlayer
      autoPlay={false}
      src={url}
      showFilledVolume={true}
      showFilledProgress={true}
      progressJumpStep={5000}
    />
  );
};
  

export default PremadeAudioPlayer;