import { Component } from '@angular/core';
@Component({
  selector: 'app-teacher-dashboard',
  imports: [],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent {
  readonly todayLessons = [
    { time: '08:00 ص', subject: 'الرياضيات', grade: 'الصف الخامس' },
    { time: '09:00 ص', subject: 'الرياضيات', grade: 'الصف السادس' },
    { time: '11:00 ص', subject: 'العلوم', grade: 'الصف الرابع' },
  ];
  readonly students = [
    { name: 'محمد أحمد', subject: 'الرياضيات', grade: 'الصف الخامس' },
    { name: 'سارة علي', subject: 'الرياضيات', grade: 'الصف الخامس' },
    { name: 'عبدالله خالد', subject: 'الرياضيات', grade: 'الصف السادس' },
  ];
}
