import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPatientDialogService } from './add-patient-dialog.service';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss'],
})
export class AddPatientDialogComponent implements OnInit {
  constructor(public ds: AddPatientDialogService) {}

  ngOnInit(): void {}

  submit() {
    console.log('submitting');
    console.log(this.ds.form.controls['street'].errors);
    // this.ds.addPatientVisible = false;
  }
}
