import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
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
    if (this._patient)
      this.records = this.bes.getPatientTreatments(this._patient.patient_id);
    else this.records = new Observable<Treatment[]>();
  }

  get patient() {
    return this._patient;
  }

  constructor(private bes: BackendService) {}
}
