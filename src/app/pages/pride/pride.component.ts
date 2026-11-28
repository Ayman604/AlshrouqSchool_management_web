import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subject, catchError, finalize, of, switchMap, tap } from 'rxjs';
import { PrideService } from '../../services/pride.service';
import { NewsListItem } from '../../models/news.model';
import { PaginatedResponse } from '../../models/paginated-response.model';
import { PaginationComponent } from '../../core/components/pagination/pagination.component';
import { ContentSkeletonComponent } from '../../core/components/content-skeleton/content-skeleton.component';
import { environment } from '../../../environments/environment';
import { placeholderImageUrl, resolveMediaUrl } from '../../core/utils/media-url.util';

@Component({
  selector: 'app-pride',
  imports: [RouterLink, PaginationComponent, ContentSkeletonComponent],
  templateUrl: './pride.component.html',
  styleUrl: './pride.component.css',
})
export class PrideComponent {
  private readonly prideService = inject(PrideService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly refreshPage = new Subject<void>();

  readonly items = signal<NewsListItem[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(8);
  readonly totalPages = signal(0);
  readonly totalCount = signal(0);
  readonly categoryFilter = signal('');
  readonly yearFilter = signal('');
  readonly sortBy = signal<'title' | 'updatedAtUtc'>('updatedAtUtc');
  readonly sortDirection = signal<'asc' | 'desc'>('desc');

  readonly apiBaseUrl = environment.apiUrl;

  constructor() {
    this.refreshPage
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap(() =>
          this.prideService
            .getPage({
              pageIndex: this.pageNumber(),
              pageSize: this.pageSize(),
              sortBy: this.sortBy(),
              sortDirection: this.sortDirection(),
            })
            .pipe(
              catchError(() => {
                this.error.set('تعذّر تحميل الإنجازات. يرجى المحاولة لاحقاً.');

                return of({
                  items: [],
                  pageIndex: this.pageNumber(),
                  pageSize: this.pageSize(),
                  totalCount: 0,
                  totalPages: 0,
                } satisfies PaginatedResponse<NewsListItem>);
              }),
              finalize(() => this.loading.set(false)),
            ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
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

  onSortChange(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as 'title' | 'updatedAtUtc');

    this.pageNumber.set(1);
    this.loadPage();
  }

  onSortDirectionChange(event: Event): void {
    this.sortDirection.set((event.target as HTMLSelectElement).value as 'asc' | 'desc');

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

  private loadPage(): void {
    this.refreshPage.next();
  }
}
