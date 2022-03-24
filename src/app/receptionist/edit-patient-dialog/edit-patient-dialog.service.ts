import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { IPatient, IPersonInfo } from 'src/schema/person';

@Injectable({
  providedIn: 'root',
})
export class EditPatientDialogService {
  visible = false;
  patient?: IPatient;

  form = new FormGroup({
    house_number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(0),
      Validators.max(9999),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-z -]+$/),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-z -]+$/),
    ]),
    province: new FormControl('', Validators.required),
    first_name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-z -]+$/),
    ]),
    middle_name: new FormControl('', Validators.pattern(/^[a-zA-z -]+$/)),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-z -]+$/),
    ]),
    gender: new FormControl('', Validators.required),
    ssn: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(0),
      Validators.max(999999999),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    date_of_birth: new FormControl('', Validators.required),
  });

  constructor() {}

  setPatient(p: IPatient) {
    this.patient = p;
    this.populateForm(p);
  }

  private populateForm(p: IPersonInfo) {
    this.form.controls['house_number'].setValue(p.house_number);
    this.form.controls['street'].setValue(p.street);
    this.form.controls['city'].setValue(p.city);
    this.form.controls['province'].setValue(p.province);
    this.form.controls['first_name'].setValue(p.first_name);
    this.form.controls['middle_name'].setValue(p.middle_name);
    this.form.controls['last_name'].setValue(p.last_name);
    this.form.controls['gender'].setValue(p.gender);
    this.form.controls['ssn'].setValue(p.ssn);
    this.form.controls['email'].setValue(p.email);
    this.form.controls['date_of_birth'].setValue(
      moment(p.date_of_birth).utc().toDate()
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.controls[controlName];
    if (!control.dirty) return '';
    const errors = control.errors;
    if (!errors) return '';
    if (errors['required']) return 'Required';
    if (errors['email']) return 'Invalid Email';
    switch (controlName) {
      case 'house_number':
        return this.getHouseNumberErrorMessage(errors);
      case 'street':
        return this.getStreetErrorMessage(errors);
      case 'city':
        return this.getCityErrorMessage(errors);
      case 'first_name':
      case 'middle_name':
      case 'last_name':
        return this.getNameErrorMessage(errors);
      case 'ssn':
        return this.getSSNErrorMessage(errors);
    }
    return 'Invalid Input';
  }

  markAllAsDirty() {
    for (const control of Object.values(this.form.controls))
      control.markAsDirty();
  }

  private getHouseNumberErrorMessage(errors: ValidationErrors): string {
    if (errors['pattern']) return 'Must be numeric.';
    if (errors['min']) return 'Must be greater than 0.';
    if (errors['max']) return 'Must be less than 9999.';
    return 'Invalid Input';
  }

  private getStreetErrorMessage(errors: ValidationErrors): string {
    if (errors['pattern']) return 'Only accepts letters, spaces, and hyphens.';
    return 'Invalid Input';
  }

  private getCityErrorMessage(errors: ValidationErrors): string {
    if (errors['pattern']) return 'Only accepts letters, spaces, and hyphens.';
    return 'Invalid Input';
  }

  private getNameErrorMessage(errors: ValidationErrors): string {
    if (errors['pattern']) return 'Only accepts letters, spaces, and hyphens.';
    return 'Invalid Input';
  }

  private getSSNErrorMessage(errors: ValidationErrors): string {
    if (errors['pattern']) return 'Must be numeric.';
    if (errors['min']) return 'Must be greater than 0.';
    if (errors['max']) return 'Must be less than 999999999.';
    return 'Invalid Input';
  }

  getFormOutput(): IPersonInfo {
    return {
      ...this.form.getRawValue(),
      date_of_birth: moment(this.form.controls['date_of_birth'].value)
        .utc()
        .format('YYYY-MM-DD'),
    };
  }
}
