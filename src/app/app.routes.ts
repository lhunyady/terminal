import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GameComponent } from './pages/game/game.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [authGuard],
  },
];
