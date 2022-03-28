import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { genderNames } from 'src/schema/genders';
import { provinces } from 'src/schema/provinces';
import { ReceptionistTableService } from '../receptionist-table.service';
import { AddPatientDialogService } from './add-patient-dialog.service';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss'],
})
export class AddPatientDialogComponent implements OnInit {
  provinces = provinces;
  genders = genderNames;
  now = new Date();
  errorMessage = '';

  constructor(
    public ds: AddPatientDialogService,
    private bes: BackendService,
    private ms: MessageService,
    private ws: WaitingService,
    private rts: ReceptionistTableService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.ds.markAllAsDirty();
    if (!this.ds.form.valid) {
      this.errorMessage = 'One or more fields are invalid.';
      return;
    }
    this.errorMessage = '';
    this.ws.waiting = true;
    this.bes
      .addPersonAsPatient(this.ds.getFormOutput())
      .pipe(finalize(() => (this.ws.waiting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ms.add({
            severity: 'success',
            summary: 'Patient Added',
            detail: `Patient ID: ${res.patient_id}, Person ID: ${res.person_id}`,
          });
          this.ds.visible = false;
          this.rts.refresh();
        },
        error: (err) => {
          console.log(err.error);
          if (typeof err.error === 'string') this.errorMessage = err.error;
          else
            this.errorMessage =
              err.error?.message +
              (err.error?.detail ? `, ${err.error?.detail}` : '');
        },
      });
  }

  onHide() {
    this.ds.form.reset();
    this.errorMessage = '';
  }
}
