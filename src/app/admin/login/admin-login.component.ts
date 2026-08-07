import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({ selector: 'app-admin-login', imports: [ReactiveFormsModule, RouterLink], templateUrl: './admin-login.component.html', styleUrl: './admin-auth.css' })
export class AdminLoginComponent {
  private readonly fb = inject(FormBuilder); private readonly auth = inject(AuthService); private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required], remember: [false] });
  submitted=false; loading=false; showPassword=false; error='';
  login(): void { this.submitted=true; this.error=''; if(this.form.invalid || this.loading) return; this.loading=true; const {email,password}=this.form.getRawValue(); this.auth.login({email,password,requestedRole:'ADMIN'}).subscribe({ next:()=>this.router.navigateByUrl('/admin/dashboard'), error:()=>{this.error='بيانات الدخول لا تسمح بالدخول من بوابة الإدارة.';this.loading=false;} }); }
}
