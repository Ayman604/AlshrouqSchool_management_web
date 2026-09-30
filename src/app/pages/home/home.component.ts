import { Component, DestroyRef, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { catchError, of } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { AchievementService } from '../../services/achievement.service';
import { NewsListItem } from '../../models/news.model';
import { StudentAchievementListItem } from '../../models/achievement.model';
import { environment } from '../../../environments/environment';
import { placeholderImageUrl, resolveMediaUrl } from '../../core/utils/media-url.util';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface FeatureStrip {
  icon: string;
  title: string;
}

interface QuickLink {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly newsService = inject(NewsService);
  private readonly achievementService = inject(AchievementService);
  private readonly destroyRef = inject(DestroyRef);
  private slideInterval?: ReturnType<typeof setInterval>;

  currentSlide = signal(0);

  readonly slides: HeroSlide[] = [
    {
      image: '/images/hero/hero1.webp',
      title: ' مرحباً بكم في مدارس الشروق',
      subtitle: 'نحو مستقبل مشرق بالعلم والإيمان والإبداع'
    },
    {
      image: '/images/hero/hero3.webp',
      title: 'تعليم متميز لكل طفل',
      subtitle: 'نكتشف المواهب وننمّيها في بيئة آمنة ومحفّزة'
    },
    {
      image: '/images/hero/hero2.webp',
      title: 'نربي جيلاً يصنع المستقبل',
      subtitle: 'بيئة تعليمية محفّزة تجمع بين التميز الأكاديمي والقيم الأصيلة'
    }
  ];

  readonly featureStrip: FeatureStrip[] = [
    { icon: 'fa-solid fa-school', title: 'مرافق حديثة' },
    { icon: 'fa-solid fa-trophy', title: 'تحصيل وتميز' },
    { icon: 'fa-solid fa-heart', title: 'رعاية شاملة' },
    { icon: 'fa-solid fa-graduation-cap', title: 'تعليم متميز' }
  ];

  readonly quickLinks: QuickLink[] = [
    { icon: 'fa-solid fa-calendar-days', label: 'التقويم الدراسي', path: '/news' },
    { icon: 'fa-solid fa-user-plus', label: 'القبول والتسجيل', path: '/register' },
    { icon: 'fa-solid fa-money-check-dollar', label: 'الرسوم الدراسية', path: '/contact' },
    { icon: 'fa-solid fa-file-lines', label: 'اللوائح والسياسات', path: '/about' },
    { icon: 'fa-solid fa-graduation-cap', label: 'منصة التعلم', path: '/gallery' }
  ];

  newsItems = signal<NewsListItem[]>([]);
  newsLoading = signal(true);
  prideItems = signal<StudentAchievementListItem[]>([]);
  prideLoading = signal(true);

  readonly apiBaseUrl = environment.apiUrl;

  ngOnInit(): void {
    this.newsService
      .getPage({ pageNumber: 1, pageSize: 3 })
      .pipe(
        catchError(() => of({ items: [] })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.newsItems.set(response.items);
        this.newsLoading.set(false);
      });

    this.achievementService
      .getPage({ pageNumber: 1, pageSize: 4 })
      .pipe(
        catchError(() => of({ items: [] })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.prideItems.set(response.items);
        this.prideLoading.set(false);
      });

    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  mediaUrl(path: string | null | undefined): string {
    return resolveMediaUrl(path, this.apiBaseUrl);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = placeholderImageUrl();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 10000);
  }

  private stopAutoPlay(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.startAutoPlay();
  }

  nextSlide(): void {
    this.currentSlide.update(v => (v + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlide.update(v => (v - 1 + this.slides.length) % this.slides.length);
    this.startAutoPlay();
  }
}
