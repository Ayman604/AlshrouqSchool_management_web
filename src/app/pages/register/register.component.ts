import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { RegisterData } from '../../models/register-data.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);

  readonly grades = [
    'اول ابتدائي',
    'ثاني ابتدائي',
    'ثالث ابتدائي',
    'رابع ابتدائي',
    'خامس ابتدائي',
    'سادس ابتدائي'
  ];

  readonly form = this.fb.nonNullable.group({
    studentName: ['', [Validators.required, Validators.minLength(3)]],
    parentPhone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    grade: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  submitted = false;

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: RegisterData = this.form.getRawValue();
    console.log(data);

    this.registerService.submitRegistration(data).subscribe(() => {
      alert('✅ تم استلام طلب التسجيل بنجاح!');
      this.form.reset();
      this.submitted = false;
    });
  }

  isInvalid(controlName: keyof RegisterData): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || this.submitted));
  }
}
