export type GalleryMediaType = 'Image' | 'Video';

/** Album filter option — proposed: GET {apiUrl}/gallery/albums */
export interface GalleryAlbum {
  id: number;
  name: string;
  itemCount?: number;
}

/** Media item — proposed: GET {apiUrl}/gallery (paginated). */
export interface GalleryMedia {
  id: number;
  title: string;
  url: string;
  thumbnailUrl?: string | null;
  mediaType: GalleryMediaType;
  albumId?: number | null;
  albumName?: string | null;
  category?: string | null;
}
