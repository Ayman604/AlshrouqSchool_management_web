import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  imports: [DatePipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);

  newsItems: News[] = [];

  ngOnInit(): void {
    this.newsService.getNews().subscribe((news) => {
      this.newsItems = news;
    });
  }
}
