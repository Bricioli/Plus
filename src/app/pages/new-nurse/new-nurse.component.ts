import { NursesService } from './../../services/nurses.service';
import { Component } from '@angular/core';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';


interface CadastroForm{
  name: FormControl,
  birthday: FormControl,
  cpf: FormControl,
  coren: FormControl,
  adress: FormControl,
  phone: FormControl,
  email: FormControl,
  pix: FormControl,
}

@Component({
  selector: 'app-new-nurse',
  standalone: true,
  imports: [
    FormLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatIconModule
  ],
  providers: [LoginService],
  templateUrl: './new-nurse.component.html',
  styleUrl: './new-nurse.component.scss'
})
export class NewNurseComponent {
  cadastroForm!: FormGroup<CadastroForm>;

  constructor(
    private router : Router,
    private nurseService : NursesService,
    private toastService : ToastrService
  ) {
    this.cadastroForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      birthday: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      coren: new FormControl('', [Validators.required, Validators.minLength(10)]),
      adress: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pix: new FormControl('', [Validators.required]),
    })
  }
  submit(){
    this.nurseService.register(this.cadastroForm.value.name, this.cadastroForm.value.birthday, this.cadastroForm.value.cpf, this.cadastroForm.value.coren, this.cadastroForm.value.adress, this.cadastroForm.value.phone, this.cadastroForm.value.email, this.cadastroForm.value.pix).subscribe({
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
