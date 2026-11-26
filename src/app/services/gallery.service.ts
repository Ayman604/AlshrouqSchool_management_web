import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GalleryAlbum, GalleryMedia } from '../models/gallery.model';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../models/paginated-response.model';
export interface GalleryQuery {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
  type?: number;
  sort?: number;
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
  private readonly baseUrl = `${environment.apiUrl}/Gallery`;

  getPage(query: GalleryQuery): Observable<PaginatedResponse<GalleryMedia>> {
    // return this.http.get<PaginatedResponse<GalleryMedia>>(this.baseUrl, {
    //   params: toHttpParams({
    //     pageIndex: query.pageIndex ?? 1,
    //     pageSize: query.pageSize ?? 10,
    //     //category: query.category
    //   })
    //});
    let params = new HttpParams();

    if (query.pageIndex !== undefined) {
      params = params.set('PageIndex', query.pageIndex.toString());
    }
    if (query.pageSize !== undefined) {
      params = params.set('PageSize', query.pageSize.toString());
    }
    if (query.search) {
      params = params.set('Search', query.search);
    }
    if (query.type !== undefined) {
      params = params.set('Type', query.type.toString());
    }
    if (query.sort !== undefined) {
      params = params.set('Sort', query.sort.toString());
    }

    return this.http.get<PaginatedResponse<GalleryMedia>>(this.baseUrl, { params });
  }

  getAlbums(): Observable<GalleryAlbum[]> {
    return this.http.get<GalleryAlbum[]>(`${this.baseUrl}/albums`);
  }
}
