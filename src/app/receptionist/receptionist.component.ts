import { Component, OnInit } from '@angular/core';
import { AddPatientDialogService } from './add-patient-dialog/add-patient-dialog.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss'],
})
export class ReceptionistComponent implements OnInit {
  data = [
    {
      patient_id: '0001',
      person_id: '0023',
      gender: 'Non-binary',
      first_name: 'Donald',
      last_name: 'Trump',
      date_of_birth: '01-01-1960',
      ssn: '123456789',
      email: 'trump@DonnyBoy.com',
    },
    {
      patient_id: '0002',
      person_id: '0024',
      gender: 'Male',
      first_name: 'Joe',
      last_name: 'Biden',
      date_of_birth: '01-01-1800',
      ssn: '223456789',
      email: 'joe@bidenMyTime.com',
    },
    {
      patient_id: '0003',
      person_id: '0025',
      gender: 'Female',
      first_name: 'Hillary',
      last_name: 'Clinton',
      date_of_birth: '01-01-1920',
      ssn: '323456789',
      email: 'hillary@pantSuit.com',
    },
  ];

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

  constructor(private addPatientDialog: AddPatientDialogService) {}

  ngOnInit(): void {}

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
