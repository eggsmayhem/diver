
import { on } from 'events';
import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { start } from 'repl';

export interface AudioPlayerProps {
    url: string;
    startTime: number;
}
const PremadeAudioPlayer = ({ url, startTime }: AudioPlayerProps) => {
  
    const [curTime, setCurTime] = useState<number>(startTime);
    const [timeUpdate, setTimeUpdate] = useState<number>(0);

    const [timeOne, setTimeOne] = useState<number>(-1);
    const [timeTwo, setTimeTwo] = useState<number>(100000);
    // const [seeking, setSeeking] = useState<boolean>(false);

    const audio_element: HTMLAudioElement | null = document.querySelector("audio");

    console.log('Start time right after passed into player component');
    console.log(startTime);
    console.log('Start time IN STATE right after passed into player component');
    console.log(curTime);

    if (startTime !== 0) {
        useEffect(() => {
            setCurTime(startTime);
            // onPlayHandler(curTime);
            // setPlayerProgress(curTime);
        }, [startTime, curTime]);
    }
    
    // const setPlayerProgress = (e:any, time: number) => {
    //     const element: HTMLAudioElement | null = document.querySelector("audio");
    //     if(element) {
    //       element.currentTime = time;
    //     }
        
    // };


    const onPlayHandler = (e: any) => {
        // e.target.currentTime = startTime;
     
        e.target.currentTime = curTime;
        // if (timeOne == -1) {
        //     setTimeOne(curTime)
        //     audio_element?.play()
        // }
        
        console.log(' The e dot target we need for play handler');
        console.log(e.target);
    }

    // componentDidUpdate() {

    // }
    // const handleTimeFromAudio = () => {
    //     const element: HTMLAudioElement | null = document.querySelector("audio");
    //     if(element && startTime !== 0) {
    //         element.onloadeddata = () => {
    //             console.log('LOADED DATA!');
    //             console.log(element.currentTime);
    //             console.log(element.duration);
    //             setTimeOne(element.currentTime);
    //             setTimeTwo(element.duration);
    //             console.log('TIME ONE');
    //             console.log(timeOne);
    //             console.log('TIME TWO');
    //             console.log(timeTwo);
    //         }
            
    //     }
    // }

    console.log('UPDATED TIME!');
    // console.log(timeUpdate);
        //this is just telling me how long the audio is lel
    console.log('Player TIME!');
    console.log(document.querySelector("audio")?.currentTime);
    return (
    <AudioPlayer
      autoPlay
      src={url}
    //   onPlay={onPlayHandler}
      onSeeked={onPlayHandler}
    //   onListen={handleTimeFromAudio}
      showFilledVolume={true}
      showFilledProgress={true}
      progressJumpStep={5000}
    />
  );
};
  

export default PremadeAudioPlayer;

// OnPlay sends the episode info to the parent so it can render a "Now playing" component