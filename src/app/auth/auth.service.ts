import { Injectable } from '@angular/core';
import { User } from './user.data';
import { getSHA256Hash as hash } from 'boring-webcrypto-sha256';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDb = new Map();

  constructor() {
    hash('admin').then((hashedPass) => {
      this.userDb.set('admin@admin.hu', hashedPass);
    });
  }

  users(): string[] {
    return Array.from(this.userDb.keys());
  }

  login(data: User): Observable<boolean> {
    const { email, pass } = data;

    if (!this.userDb.has(email)) {
      return of(false);
    }

    if (this.userDb.get(email) !== pass) {
      return of(false);
    }

    localStorage.setItem('authUser', email);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('authUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authUser') !== null;
  }
}
