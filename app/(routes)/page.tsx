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

  const [userFeed, setUserFeed] = useState<Array<Feed | Link>>([DummyFeed]);
  const [showFeed, setShowFeed] = useState<boolean>(true);

  const handleFeedDisplay = () => {
    setShowFeed(!showFeed);
  }

  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/get-multiple-feeds', {
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
    .then((feed: Array<EpisodeFeed>) =>  feed.map(item => Object.assign({}, {image: item['feed']['image']['href'], author: item['feed']['author'], title: item['feed']['title'], subtitle: item['feed']['subtitle_detail']['value'], href: item.entries[1].links[0].href})))
    .then(feed => setUserFeed(feed));
    console.log(userFeed);
  }, []);

  return (
    <main>
        {/* <MainFeed title={data.title} image={data.image} author={data.author} subtitle_detail={data.subtitle}/> */}

      <div className="relative flex flex-col place-items-center">
  
        <div>
         {/* <div className="feed-wrapper bg-gradient-to-r from-blue-300 to-purple-800" style={{ height: '90vh', overflowY: 'scroll', width: '75vw' }}> */}
         <div className={`feed-wrapper ${showFeed ? 'show' : 'hide'} bg-gradient-to-r from-blue-300 to-purple-800`} style={{ height: '90vh', overflowY: 'scroll', width: '85vw' }}>
         { 
          userFeed?.map((feed) => 
          <MainFeed title={feed.title} image={feed.image} author={feed.author} subtitle_detail={feed.subtitle} href={feed.href}/>
          ) }
          </div>
          <button type="button" className={`feed-arrow ${showFeed ? 'show' : 'hide'} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={handleFeedDisplay}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
          <button type="button" className={`feed-button ${showFeed ? 'show' : 'hide'} bg-yellow-500 text-black`} onClick={handleFeedDisplay}>My podcasts</button>

         </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </main>
  )
}