import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);

  private readonly mockNews: News[] = [
    {
      id: 1,
      title: 'بدء التسجيل للعام الدراسي الجديد',
      description:
        'يسرّنا الإعلان عن فتح باب التسجيل للعام الدراسي 2026/2027. سارعوا بالتقديم قبل اكتمال العدد.',
      publishedAt: '2026-08-01'
    },
    {
      id: 2,
      title: 'حفل تكريم الطلاب المتفوقين',
      description:
        'نُقيم حفلاً لتكريم الطلاب المتفوقين وذوي التقدير الممتاز في نهاية الشهر الحالي.',
      publishedAt: '2026-07-20'
    },
    {
      id: 3,
      title: 'ورشة فنية للطلاب',
      description:
        'انطلاق ورشة الرسم والموسيقى يوم السبت القادم. التسجيل متاح لجميع المراحل الابتدائية.',
      publishedAt: '2026-07-10'
    }
  ];

  getNews(): Observable<News[]> {
    // return this.http.get<News[]>(`${environment.apiUrl}/news`);
    return of(this.mockNews);
  }
}
