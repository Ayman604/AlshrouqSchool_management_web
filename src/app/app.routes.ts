import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { TeacherLoginComponent } from './pages/teacher-login/teacher-login.component';
import { AdminLoginComponent } from './admin/login/admin-login.component';
import { AdminForgotPasswordComponent } from './admin/forgot-password/admin-forgot-password.component';
import { AdminResetPasswordComponent } from './admin/reset-password/admin-reset-password.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'الرئيسية' },
  { path: 'about', component: AboutComponent, title: 'عن المدرسة' },
  { path: 'news', component: NewsComponent, title: 'الأخبار' },
  { path: 'register', component: RegisterComponent, title: 'بوابة الطلاب' },
  { path: 'teacher-login', component: TeacherLoginComponent, title: 'دخول المعلمين' },
  { path: 'contact', component: ContactComponent, title: 'تواصل معنا' },
  { path: 'gallery', component: GalleryComponent, title: 'المعرض' },
  { path: 'teachersGate/teacher-dashboard', component: TeacherDashboardComponent, title: 'بوابة المعلمين' },
  { path: 'studentsGate/students-home', component: StudentDashboardComponent, title: 'بوابة الطلاب' },
  { path: 'admin/login', component: AdminLoginComponent, title: 'دخول الإدارة' },
  { path: 'admin/forgot-password', component: AdminForgotPasswordComponent, title: 'نسيت كلمة المرور' },
  { path: 'admin/reset-password', component: AdminResetPasswordComponent, title: 'تغيير كلمة المرور' },
  { path: 'admin', canActivate: [adminGuard], children: [{ path: 'dashboard', component: AdminDashboardComponent, title: 'لوحة الإدارة' }, { path: '', pathMatch: 'full', redirectTo: 'dashboard' }] },
  { path: '**', redirectTo: '' }
];
