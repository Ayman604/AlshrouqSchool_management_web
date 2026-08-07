import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ selector: 'app-register', imports: [ReactiveFormsModule], templateUrl: './register.component.html', styleUrl: './register.component.css' })
export class RegisterComponent {
  private readonly fb = inject(FormBuilder); private readonly router = inject(Router);
  readonly grades = ['الصف الأول الابتدائي','الصف الثاني الابتدائي','الصف الثالث الابتدائي','الصف الرابع الابتدائي','الصف الخامس الابتدائي','الصف السادس الابتدائي','المرحلة المتوسطة','المرحلة الثانوية'];
  mode: 'register' | 'login' = 'register'; submitted = false;
  readonly form = this.fb.nonNullable.group({ studentName: ['', [Validators.required, Validators.minLength(3)]], nationalId: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], parentPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], grade: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });
  readonly loginForm = this.fb.nonNullable.group({ identifier: ['', Validators.required], password: ['', Validators.required] });
  submitRegister(): void { this.submitted = true; if (this.form.valid) this.router.navigateByUrl('/studentsGate/students-home'); }
  login(): void { this.submitted = true; if (this.loginForm.valid) this.router.navigateByUrl('/studentsGate/students-home'); }
}
