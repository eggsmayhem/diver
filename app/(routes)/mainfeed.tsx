
import { EpisodeFeed, Feed } from "../_types/EpisodeFeed";
// export type MainFeedProps = {
    
//     // link: string;
// }

// export type EpisodeFeed = {
//     feed: EpisodeFeed;

// }

// export interface Feed {
//     title: string;
//     image: Href;
// }

// export interface Href {
//     href: string;
// }

// type Episode = {
//     feed: Feed;
// }

// type Feed = {
//     title: string;
//     link: string;
// }



export default function MainFeed({title, image} : Feed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <div>{episodeFeed.feed.title}</div>
        <div>{episodeFeed.feed}</div> */}
        <div>{title}</div>
        <img src={image} />
      </main>
    );
}