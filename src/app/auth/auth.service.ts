import { Injectable } from '@angular/core';
import { User } from './user.data';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
type AuthorizationResponse = { isAuthorized: boolean };
type GetUsersResponse = { users: string[] };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  users() {
    return this.http.get<GetUsersResponse>('http://localhost:8080/v1/users');
  }

  //Hide the response structure
  login(data: User): Observable<Object> {
    const { email } = data;

    const loginRequest = this.http.post<AuthorizationResponse>(
      'http://localhost:8080/v1/authorize',
      data
    );

    loginRequest.subscribe((res) => {
      if (res.isAuthorized) {
        localStorage.setItem('authUser', email);
      }
    });

    return loginRequest;
  }

  logout(): void {
    localStorage.removeItem('authUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authUser') !== null;
  }
}
