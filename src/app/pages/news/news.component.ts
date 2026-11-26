import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, catchError, finalize, of, switchMap, tap } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { NewsListItem } from '../../models/news.model';
import { PaginatedResponse } from '../../models/paginated-response.model';
import { PaginationComponent } from '../../core/components/pagination/pagination.component';
import { ContentSkeletonComponent } from '../../core/components/content-skeleton/content-skeleton.component';
import { environment } from '../../../environments/environment';
import { placeholderImageUrl, resolveMediaUrl } from '../../core/utils/media-url.util';

@Component({
  selector: 'app-news',
  imports: [DatePipe, RouterLink, PaginationComponent, ContentSkeletonComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  private readonly newsService = inject(NewsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly refreshPage = new Subject<void>();

  readonly items = signal<NewsListItem[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(9);
  readonly totalPages = signal(0);
  readonly totalCount = signal(0);
  readonly categoryFilter = signal('');
  readonly contentTypeFilter = signal<'News' | 'Event' | ''>('');

  readonly apiBaseUrl = environment.apiUrl;

  constructor() {
    this.refreshPage
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap(() =>
          this.newsService
            .getPage({
              pageIndex: this.pageNumber(),
              pageSize: this.pageSize(),
              category: this.categoryFilter() || undefined,
              contentType: this.contentTypeFilter() || undefined
            })
            .pipe(
              catchError(() => {
                this.error.set('تعذّر تحميل الأخبار. يرجى المحاولة لاحقاً.');
                return of({
                  items: [],
                  pageIndex: this.pageNumber(),
                  pageSize: this.pageSize(),
                  totalCount: 0,
                  totalPages: 0,
                  
                } satisfies PaginatedResponse<NewsListItem>);
              }),
              finalize(() => this.loading.set(false))
            )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.items.set(response.items);
        this.pageNumber.set(response.pageIndex);
        this.totalPages.set(response.totalPages);
        this.totalCount.set(response.totalCount);
      });

    this.loadPage();
  }

  mediaUrl(path: string | null | undefined): string {
    return resolveMediaUrl(path, this.apiBaseUrl);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = placeholderImageUrl();
  }

  onCategoryChange(event: Event): void {
    this.categoryFilter.set((event.target as HTMLSelectElement).value);
    this.pageNumber.set(1);
    this.loadPage();
  }

  onContentTypeChange(event: Event): void {
    this.contentTypeFilter.set(
      (event.target as HTMLSelectElement).value as 'News' | 'Event' | ''
    );
    this.pageNumber.set(1);
    this.loadPage();
  }

  onPageChange(page: number): void {
    this.pageNumber.set(page);
    this.loadPage();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.pageNumber.set(1);
    this.loadPage();
  }

  contentTypeLabel(type: NewsListItem['contentType']): string {
    return type === 'Event' ? 'فعالية' : 'خبر';
  }

  private loadPage(): void {
    this.refreshPage.next();
  }
}
