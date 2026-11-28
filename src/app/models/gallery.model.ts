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
  fileName: string;
  filePath: string;
  altText: string;
  type: number;
}
