import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { List } from './tasks/list/list';
import { Create } from './tasks/create/create';
import { Detail } from './tasks/detail/detail';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'tasks', component: List },
  { path: 'tasks/create', component: Create },
  { path: 'tasks/:id', component: Detail },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }
];
