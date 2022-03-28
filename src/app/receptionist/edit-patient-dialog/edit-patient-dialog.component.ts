import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { genderNames } from 'src/schema/genders';
import { IPatient } from 'src/schema/person';
import { provinces } from 'src/schema/provinces';
import { ReceptionistTableService } from '../receptionist-table.service';
import { EditPatientDialogService } from './edit-patient-dialog.service';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.scss'],
})
export class EditPatientDialogComponent implements OnInit {
  provinces = provinces;
  genders = genderNames;
  now = new Date();
  errorMessage = '';

  constructor(
    public ds: EditPatientDialogService,
    private bes: BackendService,
    private ms: MessageService,
    private ws: WaitingService,
    private rts: ReceptionistTableService
  ) {}

  ngOnInit(): void {}

  submit() {
    if (!this.ds.patient?.patient_id) {
      this.errorMessage = 'Cannot get patient ID!';
      return;
    }
    this.ds.markAllAsDirty();
    if (!this.ds.form.valid) {
      this.errorMessage = 'One or more fields are invalid.';
      return;
    }
    this.errorMessage = '';
    this.ws.waiting = true;
    this.bes
      .updatePatient(this.ds.patient.patient_id, this.ds.getFormOutput())
      .pipe(finalize(() => (this.ws.waiting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ms.add({
            severity: 'success',
            summary: 'Patient Updated',
            detail: res,
          });
          this.ds.visible = false;
          this.rts.refresh();
        },
        error: (err) => {
          console.log(err.error);
          this.errorMessage =
            err.error?.message +
            (err.error?.detail ? `, ${err.error.detail}` : '');
        },
      });
  }

  onHide() {
    this.ds.form.reset();
    this.errorMessage = '';
  }
}
