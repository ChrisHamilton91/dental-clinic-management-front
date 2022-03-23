import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { AddPatientDialogService } from './add-patient-dialog/add-patient-dialog.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss'],
})
export class ReceptionistComponent implements OnInit {
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

  constructor(
    private addPatientDialog: AddPatientDialogService,
    private bes: BackendService
  ) {}

  ngOnInit(): void {
    this.refreshPatients();
  }

  refreshPatients() {
    this.patients = this.bes.getAllPatients();
  }

  editPatient(p: any) {
    console.log(p);
  }

  addAppointment(p: any) {
    console.log(p);
  }

  addNewPatient() {
    this.addPatientDialog.visible = true;
  }
}
