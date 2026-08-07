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
  { path: '**', redirectTo: '' }
];
