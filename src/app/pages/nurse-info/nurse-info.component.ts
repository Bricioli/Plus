import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { NursesService } from '../../services/nurses.service';
import { nurseResponse } from '../../types/nurse-response.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

interface CadastroForm {
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
  selector: 'app-nurse-info',
  standalone: true,
  imports: [
    FormLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatIconModule
  ],
  templateUrl: './nurse-info.component.html',
  styleUrl: './nurse-info.component.scss'
})
export class NurseInfoComponent implements OnInit {
  cadastroForm!: FormGroup<CadastroForm>;
  nurseInfo: nurseResponse[] = [
    {
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

  constructor(
    private route: ActivatedRoute,
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

  }
  navigate() {

  }
}
