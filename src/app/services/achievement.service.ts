import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  StudentAchievementDetail,
  StudentAchievementListItem
} from '../models/achievement.model';
import { PaginatedResponse, PaginationParams } from '../models/paginated-response.model';
import { environment } from '../../environments/environment';
import { toHttpParams } from '../core/utils/http-params.util';

export interface AchievementQuery extends PaginationParams {
  category?: string;
  academicYear?: string;
}

/**
 * Proposed backend contract (not yet referenced elsewhere in this repo):
 * - GET {apiUrl}/achievements?pageNumber=&pageSize=&category=&academicYear=
 *   → PaginatedResponse<StudentAchievementListItem>
 * - GET {apiUrl}/achievements/{id} → StudentAchievementDetail
 */
@Injectable({ providedIn: 'root' })
export class AchievementService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/achievements`;

  getPage(
    query: AchievementQuery
  ): Observable<PaginatedResponse<StudentAchievementListItem>> {
    return this.http.get<PaginatedResponse<StudentAchievementListItem>>(this.baseUrl, {
      params: toHttpParams({
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        category: query.category,
        academicYear: query.academicYear
      })
    });
  }

  getById(id: number): Observable<StudentAchievementDetail> {
    return this.http.get<StudentAchievementDetail>(`${this.baseUrl}/${id}`);
  }
}
