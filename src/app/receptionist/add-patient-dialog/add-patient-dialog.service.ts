import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddPatientDialogService {
  visible = false;

  form = new FormGroup({
    house_number: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(),
    last_name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    ssn: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required),
  });

  constructor() {}

  getErrorMessage(controlName: string): string {
    const control = this.form.controls[controlName];
    if (!control.dirty) return '';
    const errors = control.errors;
    if (!errors) return '';
    if (errors['required']) return 'Required';
    return '';
  }
}
