import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly features: Feature[] = [
    {
      icon: '📚',
      title: 'تعليم متميز',
      description: 'نقدم أحدث المناهج التعليمية بأسلوب عصري وشيق.'
    },
    {
      icon: '🏅',
      title: 'أنشطة رياضية',
      description: 'ننمي المواهب الرياضية من خلال فرق كرة القدم والسلة.'
    },
    {
      icon: '🎨',
      title: 'فنون وإبداع',
      description: 'نشجع الإبداع الفني من خلال ورش الرسم والموسيقى.'
    }
  ];
}
