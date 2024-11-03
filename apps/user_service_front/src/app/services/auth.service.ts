import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user';
import { catchError, Observable, throwError } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  resetpassword(pass: any): Observable<any> {
    //debugger
    return this.http
      .post(`${this.apiUrl}/auth/reset-password`, pass)
      .pipe(catchError(this.handleError));
  }

  sendresetemail(email: string): Observable<any> {
    //debugger
    return this.http
      .post(`${this.apiUrl}/auth/forget-password`, { email: email })
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    //debugger
    return this.http
      .get(`${this.apiUrl}/auth/logout`)
      .pipe(catchError(this.handleError));
  }

  signup(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/auth/signup`, user)
      .pipe(catchError(this.handleError));
  }

  login(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/auth/login`, user)
      .pipe(catchError(this.handleError));
  }

  getalluser(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}/user/`)
      .pipe(catchError(this.handleError));
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/status`);
  }

  private handleError(error: HttpErrorResponse) {
    //debugger
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error.message
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
