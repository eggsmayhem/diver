
import { EpisodeFeed, Feed, Link } from "../_types/EpisodeFeed";
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

export interface FormattedFeed {
    title: string;
    image: string;  
    author: string;
    audio: string;
    keyName?: string;
    episodeName: string;
}

export default function MainFeed({title, author, image, audio, episodeName}: FormattedFeed) {
    return (
      <div className="flex flex-col gap-2 place-items-center episode-card bg-neutral-950 bg-opacity-50 my-2 text-center mx-2 py-2">
        {/* <div>{episodeFeed.feed.title}</div>
        <div>{episodeFeed.feed}</div> */}
        <div>{title}</div>
        <div>{episodeName}</div>
        <img style={{height: '150px', width: '150px'}} src={image} />
        <div>{author}</div>
        {/* <div style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: subtitle_detail}}/> */}
        {/* <audio src={audio}>Audio {audio}</audio> */}
      </div>
    );
}