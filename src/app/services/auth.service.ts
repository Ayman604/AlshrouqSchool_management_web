import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
export interface AuthUser { id: string; name: string; email: string; role: UserRole; }
export interface LoginRequest { email: string; password: string; requestedRole: UserRole; }
interface LoginResponse { user: AuthUser; token?: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readStoredUser());
  readonly currentUser$ = this.userSubject.asObservable();
  get currentUser(): AuthUser | null { return this.userSubject.value; }

  login(request: LoginRequest): Observable<AuthUser> {
    // Replace the mock block with the HTTP call when the backend is connected.
    // The server must validate the password and compare actualRole to requestedRole.
    const response$ = environment.production
      ? this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, request)
      : of({ user: { id: 'admin-demo', name: 'مدير المدرسة', email: request.email, role: request.requestedRole } }).pipe(delay(700));
    return response$.pipe(map(response => {
      if (response.user.role !== request.requestedRole) throw new Error('ROLE_MISMATCH');
      return response.user;
    }), tap(user => this.setUser(user)));
  }

  forgotPassword(email: string, requestedRole: UserRole): Observable<void> {
    return environment.production ? this.http.post<void>(`${environment.apiUrl}/auth/forgot-password`, { email, requestedRole }) : of(void 0).pipe(delay(700));
  }
  resetPassword(token: string, password: string): Observable<void> {
    return environment.production ? this.http.post<void>(`${environment.apiUrl}/auth/reset-password`, { token, password }) : of(void 0).pipe(delay(700));
  }
  isAdmin(): boolean { return this.currentUser?.role === 'ADMIN'; }
  logout(): void { localStorage.removeItem('alshoruq_current_user'); this.userSubject.next(null); }
  private setUser(user: AuthUser): void { localStorage.setItem('alshoruq_current_user', JSON.stringify(user)); this.userSubject.next(user); }
  private readStoredUser(): AuthUser | null { try { return JSON.parse(localStorage.getItem('alshoruq_current_user') ?? 'null'); } catch { return null; } }
}
