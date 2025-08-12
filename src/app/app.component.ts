// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  template: `
    <mat-toolbar color="primary" class="app-toolbar">
      <span class="app-title">User Menu Demo</span>
      <span class="spacer"></span>

      <ng-container *ngIf="auth.user$ | async as user; else signIn">
        <button
          mat-button
          [matMenuTriggerFor]="userMenu"
          aria-label="Account menu"
          aria-haspopup="menu"
        >
          <mat-icon>account_circle</mat-icon>
          <span class="user-name">{{ user.displayName }}</span>
          <mat-icon>expand_more</mat-icon>
        </button>

        <mat-menu #userMenu="matMenu" xPosition="before" yPosition="below">
          <button mat-menu-item (click)="openProfile()">
            <mat-icon>person</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item (click)="openSettings()">
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="onSignOut()">
            <mat-icon>logout</mat-icon>
            <span>Sign out</span>
          </button>
        </mat-menu>
      </ng-container>

      <ng-template #signIn>
        <button mat-stroked-button (click)="fakeSignIn()">Sign in</button>
      </ng-template>
    </mat-toolbar>

    <main class="content">
      <p *ngIf="!(auth.user$ | async)">You are signed out.</p>
      <p *ngIf="auth.user$ | async as user">Welcome, {{ user.displayName }}!</p>
    </main>
  `,
  styles: [`
    .app-toolbar { position: sticky; top: 0; z-index: 100; }
    .app-title { font-weight: 600; }
    .spacer { flex: 1 1 auto; }
    .user-name { margin: 0 6px; }
    .content { padding: 24px; }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService, private snack: MatSnackBar) {}

  openProfile()  { this.snack.open('Profile clicked',  'Close', { duration: 1200 }); }
  openSettings() { this.snack.open('Settings clicked', 'Close', { duration: 1200 }); }

  async onSignOut() {
    await this.auth.signOut();
    this.snack.open('Signed out', undefined, { duration: 1200 });
  }

  fakeSignIn() {
    this.auth.signInFake({ displayName: 'Jorge Gonsalez', email: 'jorgegonzales@example.com' });
    this.snack.open('Signed in', undefined, { duration: 1200 });
  }
}
