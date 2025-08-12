// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  displayName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<User | null>({
    displayName: 'Jorge Perez',
    email: 'jorge@example.com',
  });

  user$ = this._user.asObservable();
  get user() { return this._user.value; }

  // Simulate a sign out
  async signOut(): Promise<void> {
    await new Promise(r => setTimeout(r, 400));
    this._user.next(null);
  }

  // Simulate a sign in (for demo)
  signInFake(user: User) {
    this._user.next(user);
  }
}
