import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  registerMenuOpen = false;
  portal: 'public' | 'teacher' | 'student' = 'public';
  readonly teacherLinks: NavLink[] = [
    { path: '/teachersGate/teacher-dashboard#today', label: 'اليوم' },
    { path: '/teachersGate/teacher-dashboard#calendar', label: 'التقويم الدراسي' },
    { path: '/teachersGate/teacher-dashboard#students', label: 'الطلاب' },
    { path: '/teachersGate/teacher-dashboard#finance', label: 'الماليات' }
  ];
  readonly studentLinks: NavLink[] = [
    { path: '/studentsGate/students-home#today', label: 'اليوم' },
    { path: '/studentsGate/students-home#calendar', label: 'التقويم' },
    { path: '/studentsGate/students-home#activities', label: 'الأنشطة' },
    { path: '/studentsGate/students-home#fees', label: 'الرسوم' },
    { path: '/studentsGate/students-home#exams', label: 'الاختبارات' },
    { path: '/studentsGate/students-home#results', label: 'نتائج الامتحانات' }
  ];
  readonly navLinks: NavLink[] = [
    { path: '/', label: 'الرئيسية' },
    { path: '/about', label: 'عن المدرسة' },
    { path: '/news', label: 'الأخبار والفعاليات' },
    { path: '/gallery', label: 'المعرض' },
    { path: '/contact', label: 'تواصل معنا' },
    // { path: '/teachersGate/teacher-dashboard', label: 'بوابة المعلمين' },
    // { path: '/studentsGate/student-dashboard', label: 'بوابة الطلاب' }
  ];

  constructor() {
    this.updatePortal(this.router.url);
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(event => {
      this.updatePortal(event.urlAfterRedirects);
      this.registerMenuOpen = false;
    });
  }

  get activeLinks(): NavLink[] {
    return this.portal === 'teacher' ? this.teacherLinks : this.portal === 'student' ? this.studentLinks : this.navLinks;
  }

  logout(): void {
    this.portal = 'public';
    this.router.navigateByUrl('/');
  }

  private updatePortal(url: string): void {
    this.portal = url.startsWith('/teachersGate') ? 'teacher' : url.startsWith('/studentsGate') ? 'student' : 'public';
  }
}
