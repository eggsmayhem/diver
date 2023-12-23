'use client';

import Image from 'next/image'
import MainFeed, { Feed } from './mainfeed';
// import { MainFeedProps, EpisodeFeed } from './mainfeed';
import { SetStateAction, useEffect, useState } from 'react';
// interface ResponseData {
//   feed: MainFeedProps;
// }
import DummyFeed from '../_assets/DummyFeed';
import { EpisodeFeed } from '../_types/EpisodeFeed';

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

  const [userFeed, setUserFeed] = useState<Feed[]>([DummyFeed]);

  
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
    .then((response) => response.map((item: EpisodeFeed) => item["feed"]))
    .then((feed: Feed[]) =>  feed.map(item => Object.assign({}, {image: item.image.href, author: item.author, title: item.title, subtitle: item.subtitle_detail.value})))
    .then(feed => setUserFeed(feed));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
       
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div>
        { 
        userFeed?.map((feed) => 
        <MainFeed title={feed.title} image={feed.image} author={feed.author} subtitle_detail={feed.subtitle}/>
        ) }
        </div>
        {/* <MainFeed title={data.title} image={data.image} author={data.author} subtitle_detail={data.subtitle}/> */}

        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
