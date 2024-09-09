import { afterNextRender, Component, inject, Injector, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormLayoutComponent } from '../form-layout/form-layout.component';
import { PrimaryInputComponent } from '../primary-input/primary-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NursesService } from '../../services/nurses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

interface ShiftForm {
  shiftValue: FormControl;
  receive: FormControl;
  obs : FormControl;
}

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormLayoutComponent,
    PrimaryInputComponent,
    MatIconModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatInputModule
  ],
  templateUrl: './dialog-data.html',
  styleUrl: './modal-update.component.scss',
})
export class ModalUpdateComponent {
  readonly dialog = inject(MatDialogRef<ModalUpdateComponent>);

  shiftForm!: FormGroup<ShiftForm>;
  data = inject(MAT_DIALOG_DATA);

  private _injector = inject(Injector);
  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private nurseService: NursesService
  ) {
    this.shiftForm = new FormGroup({
      shiftValue: new FormControl(''),
      receive: new FormControl(this.data.receive, [Validators.required]),
      obs : new FormControl(this.data.obs)
    });
  }

  addShift() {
    const shiftValue = parseInt(this.shiftForm.value.shiftValue);
    const receive = parseInt(this.data.receive);
    const totalReceives = receive + shiftValue;
    this.shiftForm.patchValue({ receive: totalReceives });
    this.addObs(shiftValue)
  }

  addObs(shiftValue : number) {
    const currentObs = this.shiftForm.value.obs;
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('pt-BR');
    const updateObs = currentObs ? `${currentObs} \nPlantão lançado no dia ${dateString} com o valor de:  R$${shiftValue}` : `Plantão lançado no dia ${dateString} com o valor de: R$${shiftValue}`

    this.shiftForm.patchValue({ obs: updateObs });

  }

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }
  submit() {
    this.nurseService
      .update(
        this.data.id,
        this.data.name,
        this.data.birthday,
        this.data.cpf,
        this.data.coren,
        this.data.adress,
        this.data.phone,
        this.data.email,
        this.data.pix,
        this.shiftForm.value.receive,
        this.shiftForm.value.obs
      )
      .subscribe({
        next: (response) => {
          this.toastService.success('Plantão lançado com sucesso');
          this.router.navigate(['home']);
        },
        error: () =>
          this.toastService.error(
            'Algo de errado aconteceu, tente novamente mais tarde'
          ),
      });
    this.dialog.close();
  }
}
