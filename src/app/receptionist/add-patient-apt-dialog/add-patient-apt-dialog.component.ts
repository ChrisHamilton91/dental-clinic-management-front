import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { AddPatientAptDialogService } from './add-patient-apt-dialog.service';

@Component({
  selector: 'app-add-patient-apt-dialog',
  templateUrl: './add-patient-apt-dialog.component.html',
  styleUrls: ['./add-patient-apt-dialog.component.scss'],
})
export class AddPatientAptDialogComponent implements OnInit {
  dentists = [
    { id: 1, name: 'Joe' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jacob' },
  ];
  types = ['type one', 'type two', 'type three'];
  rooms = ['room one', 'room two', 'room three'];
  now = new Date();
  errorMessage = '';

  constructor(
    public ds: AddPatientAptDialogService,
    private bes: BackendService,
    private ms: MessageService,
    private ws: WaitingService
  ) {}

  ngOnInit(): void {}

  submit() {
    if (!this.ds.patient?.patient_id) {
      this.errorMessage = 'Cannot get patient ID!';
      return;
    }
    this.ds.markAllAsDirty();
    if (!this.ds.form.valid) {
      this.errorMessage =
        this.ds.getFormErrorMessage() || 'One or more fields are invalid.';
      return;
    }
    this.errorMessage = '';
    this.ws.waiting = true;
    const output = this.ds.getFormOutput();
    this.bes
      .addAppointment(this.ds.patient.patient_id, output.dentist_id, output)
      .pipe(finalize(() => (this.ws.waiting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ms.add({
            severity: 'success',
            summary: 'Appointment Added',
          });
          this.ds.visible = false;
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
