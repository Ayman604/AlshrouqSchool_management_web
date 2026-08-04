import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'الرئيسية' },
  { path: 'about', component: AboutComponent, title: 'من نحن' },
  { path: 'news', component: NewsComponent, title: 'الأخبار' },
  { path: 'register', component: RegisterComponent, title: 'التسجيل' },
  { path: 'contact', component: ContactComponent, title: 'التواصل' },
  { path: 'gallery', component: GalleryComponent, title: 'المعرض' },
  { path: '**', redirectTo: '' }
];
