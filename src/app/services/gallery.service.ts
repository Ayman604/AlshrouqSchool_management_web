import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GalleryAlbum, GalleryMedia } from '../models/gallery.model';
import { PaginatedResponse, PaginationParams } from '../models/paginated-response.model';
import { environment } from '../../environments/environment';
import { toHttpParams } from '../core/utils/http-params.util';

export interface GalleryQuery extends PaginationParams {
  albumId?: number;
  category?: string;
}

/**
 * Proposed backend contract (not yet referenced elsewhere in this repo):
 * - GET {apiUrl}/gallery?pageNumber=&pageSize=&albumId=&category=
 *   → PaginatedResponse<GalleryMedia>
 * - GET {apiUrl}/gallery/albums → GalleryAlbum[]
 */
@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/gallery`;

  getPage(query: GalleryQuery): Observable<PaginatedResponse<GalleryMedia>> {
    return this.http.get<PaginatedResponse<GalleryMedia>>(this.baseUrl, {
      params: toHttpParams({
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        albumId: query.albumId,
        category: query.category
      })
    });
  }

  getAlbums(): Observable<GalleryAlbum[]> {
    return this.http.get<GalleryAlbum[]>(`${this.baseUrl}/albums`);
  }
}
