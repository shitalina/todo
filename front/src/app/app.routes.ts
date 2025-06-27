import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Login } from './auth/login/login';
import { List } from './tasks/list/list';
import { Create } from './tasks/create/create';
import { Detail } from './tasks/detail/detail';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [AuthGuard] },
  { path: 'tasks', component: List, canActivate: [AuthGuard] },
  { path: 'tasks/create', component: Create, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: Detail, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }
];
