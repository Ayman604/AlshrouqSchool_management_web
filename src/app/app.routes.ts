import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PrideComponent } from './pages/pride/pride.component';
import { PrideDetailComponent } from './pages/pride/pride-detail.component';
import { NewsDetailComponent } from './pages/news/news-detail.component';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { TeacherLoginComponent } from './pages/teacher-login/teacher-login.component';
import { AdminLoginComponent } from './admin/login/admin-login.component';
import { AdminForgotPasswordComponent } from './admin/forgot-password/admin-forgot-password.component';
import { AdminResetPasswordComponent } from './admin/reset-password/admin-reset-password.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
//import { NotFoundComponent } from './pages/not-found/not-found.component';
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'مدارس الشروق' },
  { path: 'about', component: AboutComponent, title: 'عن المدارس' },
  { path: 'news', component: NewsComponent, title: 'الأخبار- مدارس الشروق' },
  { path: 'news/:id', component: NewsDetailComponent, title: 'تفاصيل الخبر - مدارس الشروق' },
  { path: 'pride', component: PrideComponent, title: 'الإنجازات - مدارس الشروق' },
  { path: 'pride/:id', component: PrideDetailComponent, title: 'تفاصيل الإنجاز' },
  { path: 'register', component: RegisterComponent, title: 'بوابة الطلاب - مدارس الشروق' },
  { path: 'teacher-login', component: TeacherLoginComponent, title: 'دخول المعلمين' },
  { path: 'contact', component: ContactComponent, title: 'تواصل معنا - مدارس الشروق' },
  { path: 'gallery', component: GalleryComponent, title: 'المعرض- مدارس الشروق' },
  { path: 'teachersGate/teacher-dashboard', component: TeacherDashboardComponent, title: 'بوابة المعلمين' },
  { path: 'studentsGate/students-home', component: StudentDashboardComponent, title: 'بوابة الطلاب' },
  { path: 'admin/login', component: AdminLoginComponent, title: 'دخول الإدارة - مدارس الشروق' },
  { path: 'admin/forgot-password', component: AdminForgotPasswordComponent, title: 'نسيت كلمة المرور - مدارس الشروق' },
  { path: 'admin/reset-password', component: AdminResetPasswordComponent, title: 'تغيير كلمة المرور - مدارس الشروق' },
  { path: 'admin', canActivate: [adminGuard], children: [{ path: 'dashboard', component: AdminDashboardComponent, title: 'لوحة الإدارة - مدارس الشروق' }, { path: '', pathMatch: 'full', redirectTo: 'dashboard' }] },
  { path: '**', redirectTo: 'NotFoundComponent' } // you can replace 'NotFoundComponent' with your actual NotFoundComponent if you have one
];
