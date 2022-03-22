import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { genderNames } from 'src/schema/genders';
import { provinceNames } from 'src/schema/provinces';
import { AddPatientDialogService } from './add-patient-dialog.service';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss'],
})
export class AddPatientDialogComponent implements OnInit {
  provinces = provinceNames;
  genders = genderNames;
  now = new Date();

  constructor(public ds: AddPatientDialogService) {}

  ngOnInit(): void {}

  submit() {
    this.ds.markAllAsDirty();
    if (!this.ds.form.valid) return;
    this.ds.visible = false;
  }

  onHide() {
    this.ds.form.reset();
  }
}
