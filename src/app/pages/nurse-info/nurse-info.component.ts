import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { NursesService } from '../../services/nurses.service';
import { nurseResponse } from '../../types/nurse-response.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import {MatInputModule} from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';


interface CadastroForm {
  name: FormControl,
  birthday: FormControl,
  cpf: FormControl,
  coren: FormControl,
  adress: FormControl,
  phone: FormControl,
  email: FormControl,
  pix: FormControl,
  newHours: FormControl,
  worked: FormControl,
  wValue : FormControl,
  receive: FormControl
}

@Component({
  selector: 'app-nurse-info',
  standalone: true,
  imports: [
    FormLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './nurse-info.component.html',
  styleUrl: './nurse-info.component.scss'
})
export class NurseInfoComponent implements OnInit {
  cadastroForm!: FormGroup<CadastroForm>;
  nurseInfo: nurseResponse[] = [
    {
      id : '',
      name: '',
      birthday: '',
      cpf: '',
      coren: '',
      adress: '',
      phone: '',
      email: '',
      pix: '',
      worked: '',
      receive : 0
    }
  ];
  disable: boolean= true;

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private toastService : ToastrService,
    private nurseService: NursesService
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
      newHours: new FormControl('', [Validators.required]),
      wValue: new FormControl('', [Validators.required]),
      worked: new FormControl('', [Validators.required]),
      receive: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    const nurseId = this.route.snapshot.paramMap.get('id');
    if (nurseId) {
      this.nurseService.getNurseById(nurseId).subscribe(nurse => {
        this.nurseInfo = nurse;
        console.log(this.nurseInfo);
      });
    }
  }

  submit() {
    this.nurseService.update(this.nurseInfo[0].id, this.cadastroForm.value.name, this.cadastroForm.value.birthday, this.cadastroForm.value.cpf, this.cadastroForm.value.coren, this.cadastroForm.value.adress, this.cadastroForm.value.phone, this.cadastroForm.value.email, this.cadastroForm.value.pix, this.cadastroForm.value.worked, this.cadastroForm.value.receive).subscribe({
      next: (response) => {this.toastService.success('Cadastro atualizado com sucesso')
        this.router.navigate(["home"]);
      },
      error: () => this.toastService.error('Algo de errado aconteceu, tente novamente mais tarde')
    })
  }

  addHours(){
    const newHours = this.cadastroForm.value.newHours
    const workedHours = this.cadastroForm.value.worked || 0
    const totalHours = parseInt(newHours) + parseInt(workedHours);
    this.cadastroForm.patchValue({worked: totalHours});
    this.receive (totalHours);
  }

  receive (totalHours : number) {
    const wValue = parseFloat(this.cadastroForm.value.wValue)
    console.log(' valor da Hora ' + wValue);
    const receive = totalHours * wValue
    this.cadastroForm.patchValue({receive: receive});
    console.log(' valor a receber' + receive);
  }
}
