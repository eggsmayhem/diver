
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

  // export interface SearchResults {
  //   results: Array<SearchResult>
  // }
  export interface SearchResult {
    // audio_link: string
    ids: string[][]
    distances: number[][]
    metadatas: Metadaum[][]
    embeddings: any
    documents: string[][]
    uris: any
    data: any
  }
  // raw shape of data returned from seach box. That endpoint is hardcoded to search 2 podcasts/collections, returning 10 results from each, but the podcasts sent and the desired number of results will be dynamic in the future 
  export interface FormattedSearchResult {
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

  // new and more likely correct interfaces
  export interface ReturnedSearchboxData {
    podcast: string
    ids: string[][]
    distances: number[][]
    metadatas: Metadata[][]
    documents: string[][]

  }
  export interface Metadata {
    local_mp3: string
    streaming_mp3: string
    time_begin: string
    time_end: string
  }

  export interface SinglePodcastFormattedSearchResults {
    podcast: string;
    episode_name: string;
    streaming_url: string;
    time_begin: number;
    time_end: number;
    queryResultText: string;
    uniqueId: string;
  }
  
const SearchBox = () => {
    // const [topTen, setTopTen] = useState<TimeStampSearchResult[]>([]);
    const [playerFromSearch, setPlayerFromSearch] = useState<boolean>(true);
    const [topTen, setTopTen] = useState<SinglePodcastFormattedSearchResults[][]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [clickedPodUrl, setClickedPodUrl] = useState<string>("");
    const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);


    const onSearch = () => {
        const searchBar = document.getElementById("own-pod-search") as HTMLInputElement;
        setSearchInput(searchBar.value);
        // searchBar && setSearchInput(searchBar.value);
        //format this fetch currently returns:
        //One array with two objects (this flask-embeddings endpoint is hardcoded to search two collections. Each collection contains one podcast. and thus so do each of these two objects )
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
            console.log('UNFORMATTED RESULTS');
            console.log(response);
            return response; 
        })
        // rewrite this to be performant/not use repetitive maps
          // .then((results: ReturnedSearchboxData[]) =>  results.map((item, index) => 
        .then(results => {
          return flattenPodcastsFromSearch(10, results)
        })
            // shape results into less hideous format
            // Object.assign({}, {audio_url: item.metadatas[0].map(metas => metas.streaming_mp3), documents: item.documents[0], time_begins: item.metadatas[0].map(metas => metas.time_begin), pod: index === 0 ? "Give-the-People-What-They-Want" : "Subliminal-Jihad"})))
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

    function flattenPodcastsFromSearch (nResults: number, searchResults: ReturnedSearchboxData[]): SinglePodcastFormattedSearchResults[][] {
      const allResults = [];
      //loop through individual podcasts in the results array
      for (let i = 0; i < searchResults.length; i++) {
        let indPodcastResults: SinglePodcastFormattedSearchResults[] = [];
        for (let j = 0; j < nResults; j++) {
          let indPodcastResult: SinglePodcastFormattedSearchResults = {
            podcast: '',
            episode_name: '',
            streaming_url: '',
            time_begin: 0,
            time_end: 0,
            queryResultText: 'NoQuery',
            uniqueId: 'NoId'
          };
          indPodcastResult.podcast = searchResults[i].podcast;
          indPodcastResult.episode_name = searchResults[i].metadatas[0][j].streaming_mp3
          indPodcastResult.streaming_url = searchResults[i].metadatas[0][j].streaming_mp3
          indPodcastResult.time_begin = Number(searchResults[i].metadatas[0][j].time_begin)
          indPodcastResult.time_end = Number(searchResults[i].metadatas[0][j].time_end)
          indPodcastResult.uniqueId = searchResults[i].ids[0][j]
          indPodcastResult.queryResultText = searchResults[i].documents[0][j]
          indPodcastResults.push(indPodcastResult);
        }
        allResults.push(indPodcastResults);
      }
      return allResults;
    }


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
                <div>
                { 
                topTen?.map((podcast, i) => (
                <div className="result-wrapper flex flex-col" key={podcast+i.toString()}>
                  <div className="text-center underline">Podcast: {podcast[0].podcast}</div>
                  <div className="results-text-wrapper">
                    <div className="text-center italic">Results</div>
                    {topTen[i].map((episode, index) => (
                      <div key={episode.podcast+episode.uniqueId}>
                      
                        <div className="flex flex-col">
                          <button key={index} onClick={e =>loadPlayer(e, episode.time_begin, episode.streaming_url)}>{episode.queryResultText}</button>
                        </div>
                    </div>
                  ))}
                    {/* <div>{result.documents}</div> */}
                
                </div>
                    {/* <div>{result.time_begins}</div> */}
                </div> 
                )
            )}
            </div>
            }
            </div>
            </div>
            {/* {playerLoaded && <PremadeAudioPlayer url={clickedPodUrl} startTime={startTime} onPlay={(e, url) => console.log('Event ' + e + 'from onPlay on SearchBox Component' )} />} */}
            {playerLoaded && <PremadeAudioPlayer url={clickedPodUrl} startTime={startTime} />}
        </div>
  );
};

  

export default SearchBox;