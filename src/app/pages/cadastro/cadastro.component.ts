import { RegisterService } from './../../services/register.service';
import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface CadastroForm{
  name: FormControl,
  login: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class cadastroComponent {
  cadastroForm!: FormGroup<CadastroForm>;

  constructor(
    private router : Router,
    private registerService : RegisterService,
    private toastService : ToastrService
  ) {
    this.cadastroForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),

    })
  }
  submit(){
    this.registerService.register(this.cadastroForm.value.name, this.cadastroForm.value.login, this.cadastroForm.value.password).subscribe({
      next: (response) => {this.toastService.success('Cadastro realizado com sucesso')
        this.router.navigate(["home"]);
      },
      error: () => this.toastService.error('Algo de errado aconteceu, tente novamente mais tarde')
    })
  }
  navigate(){
    this.router.navigate(["login"]);
  }
}
