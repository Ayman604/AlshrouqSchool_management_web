import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsDetail, NewsListItem } from '../models/news.model';
import { PaginatedResponse, PaginationParams } from '../models/paginated-response.model';
import { environment } from '../../environments/environment';
import { toHttpParams } from '../core/utils/http-params.util';

export interface NewsQuery extends PaginationParams {
  category?: string;
  contentType?: 'News' | 'Event';
}

/**
 * Backend contract (ASP.NET Core):
 * - GET {apiUrl}/news?pageNumber=&pageSize=&category=&contentType=
 *   → PaginatedResponse<NewsListItem>
 * - GET {apiUrl}/news/{id} → NewsDetail
 *
 * The list endpoint extends the existing `/news` route referenced in this project;
 * pagination query parameters must be supported by the API.
 */
@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/news`;

  getPage(query: NewsQuery): Observable<PaginatedResponse<NewsListItem>> {
    return this.http.get<PaginatedResponse<NewsListItem>>(this.baseUrl, {
      params: toHttpParams({
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        category: query.category,
        contentType: query.contentType
      })
    });
  }

  getById(id: number): Observable<NewsDetail> {
    return this.http.get<NewsDetail>(`${this.baseUrl}/${id}`);
  }
}
