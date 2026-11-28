import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { PrideService } from '../../services/pride.service';
import { NewsDetail } from '../../models/news.model';
import { ContentSkeletonComponent } from '../../core/components/content-skeleton/content-skeleton.component';
import { environment } from '../../../environments/environment';
import { placeholderImageUrl, resolveMediaUrl } from '../../core/utils/media-url.util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pride-detail',
  imports: [ DatePipe,RouterLink, ContentSkeletonComponent],
  templateUrl: './pride-detail.component.html',
  styleUrl: './pride-detail.component.css'
})
export class PrideDetailComponent {
  private readonly route = inject(ActivatedRoute);
private readonly prideService = inject(PrideService);  private readonly destroyRef = inject(DestroyRef);

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
          return this.prideService.getById(id).pipe(
            finalize(() => this.loading.set(false))
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: detail => this.item.set(detail),
        error: () => this.error.set('تعذّر تحميل تفاصيل الإنجاز.')
      });
  }

  mediaUrl(path: string | null | undefined): string {
    return resolveMediaUrl(path, this.apiBaseUrl);
  }
cleanContent(
  content: string | null | undefined,
  title: string
): string {
  if (!content) {
    return '';
  }

  let cleaned = content.trim();

  cleaned = cleaned.replace(/^العنوان:\s*/i, '');

  if (cleaned.startsWith(title)) {
    cleaned = cleaned.slice(title.length).trim();
  }

  cleaned = cleaned.replace(/^محتوى الإنجاز:\s*/i, '');
  cleaned = cleaned.replace(/^محتوى الخبر:\s*/i, '');

  return cleaned.trim();
}
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = placeholderImageUrl();
  }
}
