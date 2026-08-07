import { Component } from '@angular/core';
@Component({
  selector: 'app-students-home',
  imports: [],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  payer: 'student' | 'parent' = 'student';
  readonly lessons = [
    { time: '08:00 ص', subject: 'الرياضيات' },
    { time: '09:00 ص', subject: 'العلوم' },
    { time: '10:00 ص', subject: 'اللغة العربية' },
  ];
}
