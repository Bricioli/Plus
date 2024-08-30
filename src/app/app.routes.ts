import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { cadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'new-user',
    component: cadastroComponent
  }
];
