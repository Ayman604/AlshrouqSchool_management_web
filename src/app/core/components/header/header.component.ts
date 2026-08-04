import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  isRegister?: boolean;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly navLinks: NavLink[] = [
    { path: '/', label: 'الرئيسية' },
    { path: '/about', label: 'من نحن' },
    { path: '/news', label: 'الأخبار' },
    { path: '/gallery', label: 'المعرض' },
    { path: '/contact', label: 'التواصل' },
    { path: '/register', label: 'التسجيل', isRegister: true }
  ];
}
