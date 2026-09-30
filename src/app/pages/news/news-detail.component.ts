import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { NewsDetail } from '../../models/news.model';
import { ContentSkeletonComponent } from '../../core/components/content-skeleton/content-skeleton.component';
import { environment } from '../../../environments/environment';
import { placeholderImageUrl, resolveMediaUrl } from '../../core/utils/media-url.util';

@Component({
  selector: 'app-news-detail',
  imports: [DatePipe, RouterLink, ContentSkeletonComponent],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly newsService = inject(NewsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly item = signal<NewsDetail | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly apiBaseUrl = environment.apiUrl;

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          this.loading.set(true);
          this.error.set(null);
          this.item.set(null);
          return this.newsService.getById(id).pipe(
            finalize(() => this.loading.set(false))
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: detail => this.item.set(detail),
        error: () => this.error.set('تعذّر تحميل تفاصيل الخبر.')
      });
  }

  mediaUrl(path: string | null | undefined): string {
    return resolveMediaUrl(path, this.apiBaseUrl);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = placeholderImageUrl();
  }
}
