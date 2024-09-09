import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { NursesService } from '../../services/nurses.service';
import { nurseResponse } from '../../types/nurse-response.type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

interface CadastroForm {
  id: FormControl;
  name: FormControl;
  birthday: FormControl;
  cpf: FormControl;
  coren: FormControl;
  adress: FormControl;
  phone: FormControl;
  email: FormControl;
  pix: FormControl;
  shift: FormControl;
  worked: FormControl;
  shiftValue: FormControl;
  receive: FormControl;
}

@Component({
  selector: 'app-nurse-info',
  standalone: true,
  imports: [
    FormLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './nurse-info.component.html',
  styleUrl: './nurse-info.component.scss',
})
export class NurseInfoComponent implements OnInit {
  cadastroForm!: FormGroup<CadastroForm>
  nurseInfo: nurseResponse[] = [
    {
      id: '',
      name: '',
      birthday: '',
      cpf: '',
      coren: '',
      adress: '',
      phone: '',
      email: '',
      pix: '',
      worked: '',
      receive: 0,
    },
  ];
  disable: boolean = true;
  count: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private nurseService: NursesService
  ) {

    const nurseId = this.route.snapshot.paramMap.get('id');

    if (nurseId) {
      this.nurseService.getNurseById(nurseId).subscribe((nurse) => {
        this.nurseInfo = nurse;
        this.cadastroForm = new FormGroup({

          id: new FormControl(this.nurseInfo[0].id),
          name: new FormControl(this.nurseInfo[0].name, [
            Validators.required,
            Validators.minLength(3),
          ]),
          birthday: new FormControl(this.nurseInfo[0].birthday, [Validators.required]),
          cpf: new FormControl(this.nurseInfo[0].cpf, [Validators.required, Validators.minLength(11)]),
          coren: new FormControl(this.nurseInfo[0].coren, [
            Validators.required,
            Validators.minLength(10),
          ]),
          adress: new FormControl(this.nurseInfo[0].adress, [Validators.required]),
          phone: new FormControl(this.nurseInfo[0].phone, [
            Validators.required,
            Validators.minLength(11),
          ]),
          email: new FormControl(this.nurseInfo[0].email, [Validators.required, Validators.email]),
          pix: new FormControl(this.nurseInfo[0].pix, [Validators.required]),
          shift: new FormControl(''),
          shiftValue: new FormControl(''),
          worked: new FormControl(this.nurseInfo[0].worked, [Validators.required]),
          receive: new FormControl(this.nurseInfo[0].receive, [Validators.required]),
        });
      });
    }
  }

  ngOnInit() {

  }

  submit() {
    this.nurseService
      .update(
        this.nurseInfo[0].id,
        this.cadastroForm.value.name,
        this.cadastroForm.value.birthday,
        this.cadastroForm.value.cpf,
        this.cadastroForm.value.coren,
        this.cadastroForm.value.adress,
        this.cadastroForm.value.phone,
        this.cadastroForm.value.email,
        this.cadastroForm.value.pix,
        this.cadastroForm.value.worked.toString(),
        this.cadastroForm.value.receive
      )
      .subscribe({
        next: (response) => {
          this.toastService.success('Cadastro atualizado com sucesso');
          this.router.navigate(['home']);
        },
        error: () =>
          this.toastService.error(
            'Algo de errado aconteceu, tente novamente mais tarde'
          ),
      });
  }

  counter() {
    this.count++;
    this.addShift(this.count);
  }

  addShift(count: number) {
    const newShift = this.cadastroForm.value.shift;
    const shiftValue = parseInt(this.cadastroForm.value.shiftValue);
    const receive =
      count === 1
        ? parseInt(this.nurseInfo[0].receive.toString())
        : parseInt(this.cadastroForm.value.receive);
    const workedShifts =
      count === 1
        ? parseInt(this.nurseInfo[0].worked)
        : parseInt(this.cadastroForm.value.worked);
    const totalShifts = parseInt(newShift) + workedShifts;
    const totalReceives = receive + newShift * shiftValue;

    this.cadastroForm.patchValue({ receive: totalReceives });
    this.cadastroForm.patchValue({ worked: totalShifts });
  }
}
