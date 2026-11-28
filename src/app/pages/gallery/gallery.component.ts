import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, finalize, of, switchMap, tap } from 'rxjs';
import { GalleryService } from '../../services/gallery.service';
import { GalleryAlbum, GalleryMedia } from '../../models/gallery.model';
import { PaginatedResponse } from '../../models/paginated-response.model';
import { PaginationComponent } from '../../core/components/pagination/pagination.component';
import { ContentSkeletonComponent } from '../../core/components/content-skeleton/content-skeleton.component';
import { environment } from '../../../environments/environment';
import { placeholderImageUrl, resolveMediaUrl } from '../../core/utils/media-url.util';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [PaginationComponent, ContentSkeletonComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  private readonly galleryService = inject(GalleryService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly refreshPage = new Subject<void>();

  readonly items = signal<GalleryMedia[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly pageIndex = signal(1);
  readonly pageSize = signal(12);
  readonly totalPages = signal(0);
  readonly totalCount = signal(0);
  readonly preview = signal<GalleryMedia | null>(null);

  readonly apiBaseUrl = environment.apiUrl;

  constructor() {
    this.refreshPage
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap(() =>
          this.galleryService
            .getPage({
              pageIndex: this.pageIndex(),
              pageSize: this.pageSize()
            })
            .pipe(
              catchError(() => {
                this.error.set('تعذّر تحميل المعرض. يرجى المحاولة لاحقاً.');
                return of({
                  items: [],
                  pageIndex: this.pageIndex(),
                  pageSize: this.pageSize(),
                  totalCount: 0,
                  totalPages: 0,
                } satisfies PaginatedResponse<GalleryMedia>);
              }),
              finalize(() => this.loading.set(false))
            )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.items.set(response.items);
        this.pageIndex.set(response.pageIndex);
        this.totalPages.set(response.totalPages);
        this.totalCount.set(response.totalCount);
      });

        this.loadPage();
  }

  // mediaUrl(path: string | null | undefined): string {
  //   return resolveMediaUrl(path, this.apiBaseUrl);
  // }

  // thumbnailUrl(item: GalleryMedia): string {
  //   return resolveMediaUrl(item.thumbnailUrl ?? item.url, this.apiBaseUrl);
  // }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = placeholderImageUrl();
  }

  onAlbumChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.pageIndex.set(1);
    this.loadPage();
  }

  onPageChange(page: number): void {
    this.pageIndex.set(page);
    this.loadPage();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.pageIndex.set(1);
    this.loadPage();
  }

  openPreview(item: GalleryMedia): void {
    this.preview.set(item);
  }

  closePreview(): void {
    this.preview.set(null);
  }


  private loadPage(): void {
    this.refreshPage.next();
  }
}
