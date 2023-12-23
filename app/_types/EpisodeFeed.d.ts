export interface EpisodeFeed {
    bozo:       boolean;
    encoding:   string;
    entries:    Entry[];
    etag:       string;
    feed:       Feed;
    headers:    Headers;
    href:       string;
    namespaces: Namespaces;
    status:     number;
    version:    string;
}

export interface Entry {
    author:             string;
    author_detail:      AuthorDetail;
    authors:            AuthorDetail[];
    content:            RightsDetail[];
    guidislink:         boolean;
    id:                 string;
    image:              Image;
    itunes_duration:    string;
    itunes_episodetype: ItunesEpisodetype;
    itunes_explicit:    null;
    link:               string;
    links:              Link[];
    published:          string;
    published_parsed:   number[];
    summary:            string;
    summary_detail:     RightsDetail;
    title:              string;
    title_detail:       RightsDetail;
}

// export enum Author {
//     AnchorPodcasts = "Anchor Podcasts",
//     PeoplesDispatch = "Peoples Dispatch",
// }

// export interface AuthorDetail {
//     name: Author;
// }

export interface RightsDetail {
    base:     string;
    language: null;
    type:     RightsDetailType;
    value:    string;
}

export enum RightsDetailType {
    TextHTML = "text/html",
    TextPlain = "text/plain",
}

export interface Image {
    href: string;
}

export enum ItunesEpisodetype {
    Full = "full",
}

export interface Link {
    href:    string;
    rel:     Rel;
    type:    LinkType;
    length?: string;
}

export enum Rel {
    Alternate = "alternate",
    Enclosure = "enclosure",
    Hub = "hub",
    Self = "self",
}

export enum LinkType {
    ApplicationRSSXML = "application/rss+xml",
    AudioMPEG = "audio/mpeg",
    TextHTML = "text/html",
}

export interface Feed {
    author:           Author;
    author_detail:    AuthorDetail;
    authors:          PublisherDetail[];
    generator:        Author;
    generator_detail: AuthorDetail;
    image:            Image;
    itunes_explicit:  null;
    itunes_type:      string;
    language:         string;
    link:             string;
    links:            Link[];
    publisher_detail: PublisherDetail;
    rights:           Author;
    rights_detail:    RightsDetail;
    subtitle:         string;
    subtitle_detail:  RightsDetail;
    summary:          string;
    summary_detail:   RightsDetail;
    tags:             Tag[];
    title:            string;
    title_detail:     RightsDetail;
    updated:          string;
    updated_parsed:   number[];
}

export interface PublisherDetail {
    name:   Author;
    email?: string;
}

export interface Tag {
    label:  null;
    scheme: string;
    term:   string;
}

export interface Headers {
    "accept-ranges":               string;
    "access-control-allow-origin": string;
    age:                           string;
    "cache-control":               string;
    connection:                    string;
    "content-encoding":            string;
    "content-length":              string;
    "content-type":                string;
    date:                          string;
    etag:                          string;
    "strict-transport-security":   string;
    vary:                          string;
    via:                           string;
    "x-cache":                     string;
    "x-cache-hits":                string;
    "x-powered-by":                string;
    "x-served-by":                 string;
}

export interface Namespaces {
    "":      string;
    anchor:  string;
    content: string;
    dc:      string;
    itunes:  string;
}
