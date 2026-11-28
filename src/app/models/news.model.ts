
/** List item returned by GET {apiUrl}/news (paginated). */
export interface NewsListItem {
  id: number;
  title: string;
  content?: string | null;
  type: number;
  isPublished: boolean;
  createdAtUtc: string;
  mediaAttachments: NewsMediaAttachment[];
}

/** Detail returned by GET {apiUrl}/news/{id}. */
export interface NewsDetail extends NewsListItem {
updatedAtUtc: any;
}

export interface NewsMediaAttachment {
  mediaId: number;
  fileName: string;
  filePath: string;
  altText?: string | null;
  type: number;
}
