import { Injectable } from '@angular/core';
import { finalize, Observable, Subject } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { LoadingNotificationService } from 'src/app/services/loading-notification.service';
import { IPatient } from 'src/schema/person';
import { Treatment } from 'src/schema/treatment';

@Injectable({
  providedIn: 'root',
})
export class ShowRecordsDialogService {
  visible = false;
  private _patient?: IPatient;
  records = new Observable<Treatment[]>();

  set patient(value: IPatient | undefined) {
    this._patient = value;
    if (this._patient) {
      this.lns.show();
      this.records = this.bes
        .getPatientTreatments(this._patient.patient_id)
        .pipe(finalize(() => this.lns.hide()));
    } else this.records = new Observable<Treatment[]>();
  }

  get patient() {
    return this._patient;
  }

  constructor(
    private bes: BackendService,
    private lns: LoadingNotificationService
  ) {}
}
