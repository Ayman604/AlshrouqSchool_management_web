import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { RegisterData } from '../models/register-data.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private readonly http = inject(HttpClient);

  submitRegistration(data: RegisterData): Observable<{ success: boolean; message: string }> {
    console.log('Registration data:', data);

    // return this.http.post(`${environment.apiUrl}/register`, data);
    return of({ success: true, message: 'تم استلام طلب التسجيل بنجاح' }).pipe(
      tap(() => console.log('Mock registration submitted to:', `${environment.apiUrl}/register`))
    );
  }
}
