export type NewsContentType = 'News' | 'Event';

/** List item returned by GET {apiUrl}/news (paginated). */
export interface NewsListItem {
  id: number;
  title: string;
  summary: string;
  coverImageUrl?: string | null;
  publishedAt: string;
  category?: string | null;
  contentType?: NewsContentType | null;
}

/** Detail returned by GET {apiUrl}/news/{id}. */
export interface NewsDetail extends NewsListItem {
  body: string;
}

/** @deprecated Use NewsListItem — kept for gradual migration. */
export type News = NewsListItem;
