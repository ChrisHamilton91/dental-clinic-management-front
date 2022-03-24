import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { IPatient } from 'src/schema/person';
import { BackendService } from '../services/backend.service';
import { LoadingNotificationService } from '../services/loading-notification.service';
import { AddPatientAptDialogService } from './add-patient-apt-dialog/add-patient-apt-dialog.service';
import { AddPatientDialogService } from './add-patient-dialog/add-patient-dialog.service';
import { EditPatientDialogService } from './edit-patient-dialog/edit-patient-dialog.service';
import { ReceptionistTableService } from './receptionist-table.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss'],
})
export class ReceptionistComponent implements OnInit, OnDestroy {
  patients = new Observable<any[]>();
  cols = [
    { field: 'patient_id', header: 'Patient ID' },
    { field: 'person_id', header: 'Person ID' },
    { field: 'first_name', header: 'First Name' },
    { field: 'last_name', header: 'Last Name' },
    { field: 'gender', header: 'Gender' },
    { field: 'date_of_birth', header: 'Date of Birth' },
    { field: 'ssn', header: 'SSN' },
    { field: 'email', header: 'Email' },
  ];
  refreshSub = new Subscription();

  constructor(
    private addPatientDialog: AddPatientDialogService,
    private editPatientDialog: EditPatientDialogService,
    private addAptDialog: AddPatientAptDialogService,
    private bes: BackendService,
    private rts: ReceptionistTableService,
    private lns: LoadingNotificationService
  ) {}

  ngOnInit(): void {
    this.refreshPatients();
    this.refreshSub = this.rts.refreshSubject.subscribe(() =>
      this.refreshPatients()
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

  editPatient(p: IPatient) {
    this.editPatientDialog.setPatient(p);
    this.editPatientDialog.visible = true;
  }

  addAppointment(p: any) {
    this.addAptDialog.setPatient(p);
    this.addAptDialog.visible = true;
  }

  addNewPatient() {
    this.addPatientDialog.visible = true;
  }
}
