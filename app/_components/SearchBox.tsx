
import React, { useState, useEffect } from 'react';

export interface SearchBoxProps {
    value: string;
    onSearch: (e: Event, searchInput: string) => void;
}

export interface TimeStampSearchResult {
    documents: string[];
    time_begins: number[];
    pod: string;
}

export interface SearchResultRoot {
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
  }
  
const SearchBox = () => {
    const [topTen, setTopTen] = useState<TimeStampSearchResult[]>([]);

    const onSearch = () => {
        const searchBar = document.getElementById("own-pod-search") as HTMLInputElement;
        // searchBar && setSearchInput(searchBar.value);
        fetch('http://127.0.0.1:5000/query-multipe-collections-for-timestamps', {
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
          .then((results: SearchResultRoot[]) =>  results.map((item, index) => Object.assign({}, {documents: item.documents[0], time_begins: Array.from(item.metadatas[0]).map(metas => metas.time_begin), pod: index === 0 ? "Give-the-People-What-They-Want" : "Subliminal-Jihad"})))
          .then(results => setTopTen(results));
        
    };


    return (
        <>
        <label htmlFor="own-pod-search">Search your own podcasts</label>
        <input type="search" id="own-pod-search" className='text-black' />
        <button onClick={onSearch}>Search</button>
        <div className="results-wrapper">
            {
                topTen?.map((result) =>
                <div className="result-wrapper">
                    <div>{result.pod}</div>
                    <div>{result.documents}</div>
                    <div>{result.time_begins}</div>
                </div> 
            )}
        </div>
        </>
  );
};

  

export default SearchBox;