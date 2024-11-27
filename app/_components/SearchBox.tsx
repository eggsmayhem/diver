
import React, { useState, useEffect } from 'react';
import PremadeAudioPlayer from './PremadeAudioPlayer';

export interface SearchBoxProps {
    value: string;
    onSearch: (e: Event, searchInput: string) => void;
}

export interface TimeStampSearchResult {
  //audio_url property is dummy now, will come as a metadata property when dynamic search is live
    audio_url: string[];
    documents: string[];
    time_begins: number[];
    pod: string;
}

export interface SearchResultRoot {
    audio_link: string
    ids: string[][]
    distances: number[][]
    metadatas: Metadaum[][]
    embeddings: any
    documents: string[][]
    uris: any
    data: any
  }
  
  export interface Metadaum {
    speaker: string
    time_begin: number
    time_end: string
    streaming_mp3: string
  }
  
const SearchBox = () => {
    const [topTen, setTopTen] = useState<TimeStampSearchResult[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [clickedPodUrl, setClickedPodUrl] = useState<string>("");
    const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);


    const onSearch = () => {
        const searchBar = document.getElementById("own-pod-search") as HTMLInputElement;
        setSearchInput(searchBar.value);
        // searchBar && setSearchInput(searchBar.value);
        fetch('http://127.0.0.1:5000/query-multiple-collections-for-timestamps', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sentence: searchBar.value
            })
          })
          .then(response => response.json())
          // .then((response) => response.map((item: EpisodeFeed) => item["feed"]))
          .then(response => {
            console.log(response);
            return response; 
        })
        // rewrite this to be performant/not use repetitive maps
          .then((results: SearchResultRoot[]) =>  results.map((item, index) => Object.assign({}, {audio_url: item.metadatas[0].map(metas => metas.streaming_mp3), documents: item.documents[0], time_begins: item.metadatas[0].map(metas => metas.time_begin), pod: index === 0 ? "Give-the-People-What-They-Want" : "Subliminal-Jihad"})))
          .then(results => setTopTen(results));
        
    };

    const loadPlayer = (e: any, time: number, audio_url: string) => {
        setPlayerLoaded(false);
       console.log(console.log('Event ' + e + 'from loadPlayer on SearchBox Component' ));
       setStartTime(time);
       setClickedPodUrl(audio_url);
       setPlayerLoaded(true);
       //this is the correct stamp for when the query text is located in the audio 
       console.log("TIMMMEEEEEE");
        console.log(time);
  
    };


    return (
        <div className="searchbox-wrapper">
            <div className="searchbox-top">
            <label htmlFor="own-pod-search">Search your own podcasts</label>
            <input type="search" id="own-pod-search" className='text-black' />
            <button onClick={onSearch}>Search</button>
            <div className="results-wrapper ml-8">
            {<div className="italic
            ">{searchInput}</div>}
            {
                topTen?.map((result, ind) =>
                <div className="result-wrapper flex flex-col">
                    <div className="text-center underline">Podcast: {result.pod}</div>
                    {/* <div>{result.documents}</div> */}
                    <div className="results-text-wrapper">
                    <div className="text-center italic">Results</div>
                    <div className="flex flex-col">
                        {result.documents.map((text, index) => <button onClick={e =>loadPlayer(e, result.time_begins[index], result.audio_url)}>{text}</button>)}
                    </div>
                    </div>
                    {/* <div>{result.time_begins}</div> */}
                </div> 
            )}
            </div>
            </div>
            {/* {playerLoaded && <PremadeAudioPlayer url={clickedPodUrl} startTime={startTime} onPlay={(e, url) => console.log('Event ' + e + 'from onPlay on SearchBox Component' )} />} */}
            {playerLoaded && <PremadeAudioPlayer url={clickedPodUrl} startTime={startTime} />}
        </div>
  );
};

  

export default SearchBox;