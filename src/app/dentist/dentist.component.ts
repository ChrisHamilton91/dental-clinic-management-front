import { Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { IAppointment } from 'src/schema/appointment';
import { IEmployee } from 'src/schema/person';
import { BackendService } from '../services/backend.service';
import { LoadingNotificationService } from '../services/loading-notification.service';

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
    { field: 'patient_id', header: 'Patient ID' },
    { field: 'start_time', header: 'Start Time' },
    { field: 'end_time', header: 'End Time' },
    { field: 'type', header: 'Type' },
    { field: 'room', header: 'Room' },
  ];
  constructor(
    private lns: LoadingNotificationService,
    private bes: BackendService
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
}
