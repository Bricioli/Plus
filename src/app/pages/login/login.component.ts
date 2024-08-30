import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router : Router,
    private loginService : LoginService,
    private toastService : ToastrService
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })
  }
  submit(){
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
      next: () => this.toastService.success('Login realizado com sucesso'),
      error: () => this.toastService.error('Algo de errado aconteceu, tente novamente mais tarde')
    })
  }
  navigate(){
    this.router.navigate(["novo-cadastro"]);
  }
}
