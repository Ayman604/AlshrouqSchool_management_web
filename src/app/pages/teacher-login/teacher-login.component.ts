import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({ selector: 'app-teacher-login', imports: [ReactiveFormsModule, RouterLink], templateUrl: './teacher-login.component.html', styleUrl: './teacher-login.component.css' })
export class TeacherLoginComponent {
  private readonly fb = inject(FormBuilder); private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  submitted = false; showForgot = false;
  login(): void { this.submitted = true; if (this.form.valid) this.router.navigateByUrl('/teachersGate/teacher-dashboard'); }
}
