import { Component } from '@angular/core';

interface GalleryImage {
  seed: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  readonly images: GalleryImage[] = [
    { seed: 'school1', alt: 'فصل دراسي' },
    { seed: 'school2', alt: 'ملعب رياضي' },
    { seed: 'school3', alt: 'مكتبة المدرسة' },
    { seed: 'school4', alt: 'ورشة فنية' },
    { seed: 'school5', alt: 'حفل تكريم' },
    { seed: 'school6', alt: 'رحلة مدرسية' },
    { seed: 'school7', alt: 'معمل علوم' },
    { seed: 'school8', alt: 'نشاط رياضي' },
    { seed: 'school9', alt: 'يوم مفتوح' }
  ];
}
