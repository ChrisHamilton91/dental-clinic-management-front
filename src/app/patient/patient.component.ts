import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import { IAppointment } from 'src/schema/appointment';
import { IPatient } from 'src/schema/person';
import { AddPatientAptDialogService } from '../receptionist/add-patient-apt-dialog/add-patient-apt-dialog.service';
import { BackendService } from '../services/backend.service';
import { LoadingNotificationService } from '../services/loading-notification.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  patients = new Observable<IPatient[]>();
  patient?: IPatient;
  appointments = new Observable<IAppointment[]>();
  cols = [
    { field: 'dentist_id', header: 'Dentist ID' },
    { field: 'start_time', header: 'Start Time' },
    { field: 'end_time', header: 'End Time' },
    { field: 'type', header: 'Type' },
    { field: 'room', header: 'Room' },
  ];
  constructor(
    private lns: LoadingNotificationService,
    private bes: BackendService,
    private aptDialogService: AddPatientAptDialogService,
    private ms: MessageService
  ) {}

  ngOnInit(): void {
    this.refreshPatients();
  }

  refreshPatients() {
    this.lns.show();
    this.patients = this.bes
      .getAllPatients()
      .pipe(finalize(() => this.lns.hide()));
  }

  addAppointment() {
    if (!this.patient) {
      this.ms.add({
        severity: 'error',
        summary: 'No Patient Selected',
        detail: `Select a patient using the dropdown.`,
      });
      return;
    }
    this.aptDialogService.setPatient(this.patient);
    this.aptDialogService.visible = true;
  }
}
