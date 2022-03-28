import { Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { IAppointment } from 'src/schema/appointment';
import { IEmployee, IPatient } from 'src/schema/person';
import { BackendService } from '../services/backend.service';
import { LoadingNotificationService } from '../services/loading-notification.service';
import { ShowRecordsDialogService } from './show-records-dialog/show-records-dialog.service';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.scss'],
})
export class DentistComponent implements OnInit {
  dentists = new Observable<IEmployee[]>();
  dentist_id?: number;
  appointments = new Observable<IAppointment[]>();
  cols = [
    { field: 'appointment_id', header: 'Apt ID' },
    { field: 'patient_id', header: 'Patient ID' },
    { field: 'start_time', header: 'Start Time' },
    { field: 'end_time', header: 'End Time' },
    { field: 'type', header: 'Type' },
    { field: 'room', header: 'Room' },
    { field: 'status', header: 'Status' },
  ];
  constructor(
    private lns: LoadingNotificationService,
    private bes: BackendService,
    private ds: ShowRecordsDialogService
  ) {}

  ngOnInit(): void {
    this.refreshDentists();
  }

  refreshDentists() {
    this.lns.show();
    this.dentists = this.bes
      .getAllDentists()
      .pipe(finalize(() => this.lns.hide()));
  }

  getAppointments(dentist_id: number) {
    this.lns.show();
    this.appointments = this.bes
      .getDentistAppointments(dentist_id)
      .pipe(finalize(() => this.lns.hide()));
  }

  seePatientRecords(patient: IPatient) {
    this.ds.patient = patient;
    this.ds.visible = true;
  }
}
