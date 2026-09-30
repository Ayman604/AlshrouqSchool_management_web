import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { AchievementService } from '../../services/achievement.service';
import { StudentAchievementDetail } from '../../models/achievement.model';
import { ContentSkeletonComponent } from '../../core/components/content-skeleton/content-skeleton.component';
import { environment } from '../../../environments/environment';
import { placeholderImageUrl, resolveMediaUrl } from '../../core/utils/media-url.util';

@Component({
  selector: 'app-pride-detail',
  imports: [RouterLink, ContentSkeletonComponent],
  templateUrl: './pride-detail.component.html',
  styleUrl: './pride-detail.component.css'
})
export class PrideDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly achievementService = inject(AchievementService);
  private readonly destroyRef = inject(DestroyRef);

  readonly item = signal<StudentAchievementDetail | null>(null);
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
          return this.achievementService.getById(id).pipe(
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

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = placeholderImageUrl();
  }
}
