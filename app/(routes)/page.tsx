'use client';

import Image from 'next/image'
import MainFeed, { Feed } from './mainfeed';
// import { MainFeedProps, EpisodeFeed } from './mainfeed';
import { SetStateAction, useEffect, useState } from 'react';
// interface ResponseData {
//   feed: MainFeedProps;
// }
import DummyFeed from '../_assets/DummyFeed';
import { EpisodeFeed, Link } from '../_types/EpisodeFeed';
import { FormattedFeed } from './mainfeed';
import AudioPlayer from '../_components/AudioPlayer';
import PremadeAudioPlayer from '../_components/PremadeAudioPlayer';
import SearchBox from '../_components/SearchBox';

export default function Home() {
  /* Section for fetching
                single feed     */
  // const dummyDummyData: Feed = {
  //   title: "Dummy Title",
  //   image: {
  //     href: "dummy hred"
  //   },
  //   author: "Dummy Author",
  //   subtitle_detail: {
  //     value: "Dummy Subtitle"
  //   }
  // }
 
  // const jsonDummyDummyData = JSON.stringify(dummyDummyData);
  // const [data, setData] = useState(jsonDummyDummyData);


  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/get-single-feed', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       url: 'https://anchor.fm/s/443b6c28/podcast/rss'
  //     })
  //   })
  //   .then(response => response.json())
  //   .then((response) => response["feed"])
  //   .then((feed: Feed) =>  Object.assign({}, {image: feed.image.href, author: feed.author, title: feed.title, subtitle: feed.subtitle_detail.value}))
  //   .then(feed => setData(feed));
  // }, []);

  /**
   * 
   */

  const [userFeed, setUserFeed] = useState<FormattedFeed[]>([]);
  const [showFeed, setShowFeed] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<string>("");

  const handleFeedDisplay = () => {
    setShowFeed(!showFeed);
  }

  const handleEpisodeFullScreen = (e: Event) => {
    const episodeButton = e.target as HTMLButtonElement;
    const episodeCard = episodeButton.parentElement as HTMLDivElement;
    if (episodeCard) {
      episodeCard && episodeCard.classList.remove('fullscreen-card');
    }
    if (document.fullscreenElement) {
    document.exitFullscreen();
    }
  }

  const handleCurrentlyPlaying = (e: Event, url: string) => {
    const currentlyPlaying = userFeed.filter(feed => feed.audio === url);
    if (nowPlaying !== "") {
      const oldCard = document.querySelector(`.${nowPlaying.split(' ').join('-')}`);
      oldCard && oldCard.classList.remove('fullscreen-card');
    }

    setNowPlaying(currentlyPlaying[0].title);
    const card = document.querySelector(`.${currentlyPlaying[0].title.split(' ').join('-')}`);
    card?.classList.add('fullscreen-card');
    if (card && card.requestFullscreen) {
      card.requestFullscreen(); // Standard syntax
    } 
  //   else if (card && card.webkitRequestFullscreen) {
  //   card.webkitRequestFullscreen(); // Safari
  //   } else if (card &&  card.msRequestFullscreen) {
  //     card.msRequestFullscreen(); // IE11
  //  }
  }

  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/get-multiple-feeds-formatted', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        urls: ['https://anchor.fm/s/443b6c28/podcast/rss','https://www.omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/382df680-3f0f-4e4f-84da-af8e013d7c48/93e4abc3-caa1-4170-aaf9-af8e014e8a1e/podcast.rss', 'http://s3-us-west-2.amazonaws.com/chasing-hermes/chasing-hermes-archive.rss', 'https://www.kcrw.com/culture/shows/scheer-intelligence/rss.xml']
      })
    })
    .then(response => response.json())
    // .then((response) => response.map((item: EpisodeFeed) => item["feed"]))
    .then(response => {
      console.log(response);
      return response; 
  })
    .then((feed: string[][]) =>  feed.map(item => Object.assign({}, {title: item[0], author: item[1], image: item[2], audio: item[3]})))
    .then(feed => setUserFeed(feed));
    console.log(userFeed);
  }, []);

  return (
    <main>
        {/* <MainFeed title={data.title} image={data.image} author={data.author} subtitle_detail={data.subtitle}/> */}

      <div className="relative flex flex-col place-items-center">
  
        <div>
         {/* <div className="feed-wrapper bg-gradient-to-r from-blue-300 to-purple-800" style={{ height: '90vh', overflowY: 'scroll', width: '75vw' }}> */}
         <div className={`feed-wrapper ${showFeed ? 'show' : 'hide'} bg-gradient-to-r from-blue-300 to-purple-800 mt-10`} style={{ height: '90vh', overflowY: 'scroll', width: '85vw' }}>
         { 
          userFeed?.map((feed) => 
            <div className={feed.title.split(' ').join('-')}>
                  <button type="button" className={`episode-arrow ${feed.title === nowPlaying ? 'show' : 'hide'} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={handleEpisodeFullScreen}>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </button>
              <MainFeed title={feed.title} image={feed.image} author={feed.author} audio={feed.audio}/>
              {/* <AudioPlayer url={feed.audio}/> */}
              <PremadeAudioPlayer url={feed.audio} onPlay={handleCurrentlyPlaying}/>
            </div>
          )}
          </div>
          <button type="button" className={`feed-arrow ${showFeed ? 'show' : 'hide'} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={handleFeedDisplay}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
          <button type="button" className={`feed-button ${showFeed ? 'show' : 'hide'} bg-yellow-500 text-black`} onClick={handleFeedDisplay}>My podcasts</button>

         </div>
      </div>
      
      {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div> */}
      <div className="flex flex-col text-white absolute bottom-0 left-20 text-center">
        <div>Now Playing:</div>
      <div>{nowPlaying}</div>
      </div>
      <SearchBox />
  
   
    </main>
  )
}
