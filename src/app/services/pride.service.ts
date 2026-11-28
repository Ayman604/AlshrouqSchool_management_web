import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsDetail, NewsListItem } from '../models/news.model';
import { PaginatedResponse } from '../models/paginated-response.model';
import { environment } from '../../environments/environment';
import { toHttpParams } from '../core/utils/http-params.util';

export type PrideSortBy = 'title' | 'updatedAtUtc';
export type SortDirection = 'asc' | 'desc';

export interface PrideQuery {
  pageIndex: number;
  pageSize: number;
  sortBy?: PrideSortBy;
  sortDirection?: SortDirection;
}

@Injectable({ providedIn: 'root' })
export class PrideService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/OurPride`;

  getPage(
    query: PrideQuery
  ): Observable<PaginatedResponse<NewsListItem>> {
    return this.http.get<PaginatedResponse<NewsListItem>>(
      this.baseUrl,
      {
        params: toHttpParams({
          pageNumber: query.pageIndex,
          pageSize: query.pageSize,
          sortBy: query.sortBy,
          sortDirection: query.sortDirection
        })
      }
    );
  }

  getById(id: number): Observable<NewsDetail> {
    return this.http.get<NewsDetail>(`${this.baseUrl}/${id}`);
  }
}