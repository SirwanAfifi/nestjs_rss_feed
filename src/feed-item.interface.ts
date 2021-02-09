export interface FeedItem {
  title: string;
  authorName: string;
  content: string;
  categories: string[];
  url: string;
  lastUpdatedTime: Date;
  publishDate: Date;
}
