
import { on } from 'events';
import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export interface AudioPlayerProps {
    url: string;
    startTime: number;
}
const PremadeAudioPlayer = ({ url, startTime }: AudioPlayerProps) => {
  
    const [curTime, setCurTime] = useState<number>(startTime);
    const [timeUpdate, setTimeUpdate] = useState<number>(0);
    console.log('Start time right after passed into player component');
    console.log(startTime);
    console.log('Start time IN STATE right after passed into player component');
    console.log(curTime);
    // useEffect(() => {
    //     setCurTime(startTime);
    //     setPlayerProgress(curTime);
    // });
    
    const setPlayerProgress = (e:any, time: number) => {
        const element: HTMLAudioElement | null = document.querySelector("audio");
        if(element) {
          element.currentTime = time;
        }
        
    };


    const onPlayHandler = (e: any) => {
        e.target.currentTime = startTime;
    }

    console.log('UPDATED TIME!');
    // console.log(timeUpdate);
        //this is just telling me how long the audio is lel
    console.log('Player TIME!');
    console.log(document.querySelector("audio")?.currentTime);
    return (
    <AudioPlayer
      autoPlay
      src={url}
      onPlay={onPlayHandler}
      onListen={onPlayHandler}
      showFilledVolume={true}
      showFilledProgress={true}
      progressJumpStep={5000}
    />
  );
};
  

export default PremadeAudioPlayer;

// OnPlay sends the episode info to the parent so it can render a "Now playing" component