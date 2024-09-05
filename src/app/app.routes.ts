import { Routes, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { cadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { TableList } from './components/table/table.component';
import { NewNurseComponent } from './pages/new-nurse/new-nurse.component';

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
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: TableList },
      { path: 'list', component: TableList },
      { path: 'new-user', component: cadastroComponent },
      { path: 'new-nurse', component: NewNurseComponent }
    ]
    //canActivate: [AuthGuard]
  },
];
