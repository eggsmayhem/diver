
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



export default function MainFeed({title, image, author, subtitle_detail} : Feed, {href} : Link) {
    return (
      <div className="flex flex-col gap-2 place-items-center episode-card bg-neutral-950 bg-opacity-50 my-2 text-center mx-2 py-2">
        {/* <div>{episodeFeed.feed.title}</div>
        <div>{episodeFeed.feed}</div> */}
        <div>{title}</div>
        <div>{author}</div>
        <img src={image} />
        {/* <div style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: subtitle_detail}}/> */}
        <a href={href}>Audio {href}</a>
      </div>
    );
}