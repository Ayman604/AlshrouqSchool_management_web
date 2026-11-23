// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-footer',
//   imports: [FormsModule],
//   templateUrl: './footer.component.html',
//   styleUrl: './footer.component.css'
// })
// export class FooterComponent {
//   email = '';

//   onSubscribe(event: Event): void {
//     event.preventDefault();
//     if (this.email) {
//       alert('<i class="fa-solid fa-check-circle"></i> تم الاشتراك بنجاح! شكراً لانضمامك.');
//       this.email = '';
//     }
//   }
// }



/*
القديم 
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com', label: 'فيسبوك' },
    { icon: 'youtube', url: 'https://youtube.com', label: 'يوتيوب' },
    { icon: 'instagram', url: 'https://instagram.com', label: 'انستغرام' },
    { icon: 'twitter-x', url: 'https://x.com', label: 'إكس' },
    { icon: 'snapchat', url: 'https://snapchat.com', label: 'سناب شات' },
  ];

  contactInfo = [
    { icon: 'location', text: 'العنوان: المملكة العربية السعودية' },
    { icon: 'phone', text: '+966 548 437 888' },
    { icon: 'email', text: 'alshoruqedu@gmail.com' },
  ];

  services = [
    { label: 'القبول والتسجيل', url: '/services/enrollment' },
    { label: 'الدعم الفني', url: '/services/support' },
    { label: 'الأسئلة الشائعة', url: '/faq' },
    { label: 'سياسة الخصوصية', url: '/privacy' },
    { label: 'شروط الاستخدام', url: '/terms' },
  ];

  quickLinks = [
    { label: 'عن المدرسة', url: '/about' },
    { label: 'الأخبار والفعاليات', url: '/news' },
    { label: 'المنصة التعليمية', url: '/platform' },
    { label: 'معرض المبور', url: '/gallery' },
    { label: 'اتصل بنا', url: '/contact' },
  ];
}