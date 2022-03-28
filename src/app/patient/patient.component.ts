import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, Observable, Subscription } from 'rxjs';
import { IAppointment } from 'src/schema/appointment';
import { IPatient } from 'src/schema/person';
import { ShowRecordsDialogService } from '../dentist/show-records-dialog/show-records-dialog.service';
import { AddPatientAptDialogService } from '../receptionist/add-patient-apt-dialog/add-patient-apt-dialog.service';
import { BackendService } from '../services/backend.service';
import { LoadingNotificationService } from '../services/loading-notification.service';
import { PatientTableService } from './patient-table.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  patients = new Observable<IPatient[]>();
  patient?: IPatient;
  appointments = new Observable<IAppointment[]>();
  refreshSub = new Subscription();
  cols = [
    { field: 'appointment_id', header: 'Apt ID' },
    { field: 'dentist_id', header: 'Dentist ID' },
    { field: 'start_time', header: 'Start Time' },
    { field: 'end_time', header: 'End Time' },
    { field: 'type', header: 'Type' },
    { field: 'room', header: 'Room' },
    { field: 'status', header: 'Status' },
  ];
  constructor(
    private lns: LoadingNotificationService,
    private bes: BackendService,
    private aptDialogService: AddPatientAptDialogService,
    private ms: MessageService,
    private recordsDialogService: ShowRecordsDialogService,
    private rts: PatientTableService
  ) {}

  ngOnInit(): void {
    this.refreshPatients();
    this.refreshSub = this.rts.refreshSubject.subscribe(() =>
      this.getAppointments(this.patient)
    );
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }

  refreshPatients() {
    this.lns.show();
    this.patients = this.bes
      .getAllPatients()
      .pipe(finalize(() => this.lns.hide()));
  }

  getAppointments(patient: IPatient | undefined) {
    if (!patient) return;
    this.lns.show();
    this.appointments = this.bes
      .getPatientAppointments(patient.patient_id)
      .pipe(finalize(() => this.lns.hide()));
  }

  addAppointment() {
    if (!this.patient) {
      this.noPatientNotification();
      return;
    }
    this.aptDialogService.setPatient(this.patient);
    this.aptDialogService.visible = true;
  }

  seePatientRecords() {
    if (!this.patient) {
      this.noPatientNotification();
      return;
    }
    this.recordsDialogService.patient = this.patient;
    this.recordsDialogService.visible = true;
  }

  noPatientNotification() {
    this.ms.add({
      severity: 'error',
      summary: 'No Patient Selected',
      detail: `Select a patient using the dropdown.`,
    });
  }
}
