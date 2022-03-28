import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { IAppointmentInfo } from 'src/schema/appointment';
import { IPatient } from 'src/schema/person';

@Injectable({
  providedIn: 'root',
})
export class AddPatientAptDialogService {
  visible = false;
  patient?: IPatient;

  private aptTimesValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const group = control as FormGroup;
    const start_time = group.controls['start_time'].value as Date;
    const end_time = group.controls['end_time'].value as Date;
    if (!start_time || !end_time) return null;
    if (start_time.getTime() > end_time.getTime())
      return { startGreaterThanEnd: true };
    return null;
  };

  form = new FormGroup(
    {
      dentist_id: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      start_time: new FormControl('', Validators.required),
      end_time: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required),
    },
    this.aptTimesValidator
  );

  get dentist_id(): string {
    return this.form.controls['dentist_id'].value;
  }
  get day(): Date {
    return this.form.controls['day'].value;
  }
  get start_time(): Date {
    return this.form.controls['start_time'].value;
  }
  get end_time(): Date {
    return this.form.controls['end_time'].value;
  }
  get type(): string {
    return this.form.controls['type'].value;
  }
  get room(): string {
    return this.form.controls['room'].value;
  }

  constructor() {}

  setPatient(p: IPatient) {
    this.patient = p;
  }

  getFormErrorMessage(): string {
    const errors = this.form.errors;
    if (!errors) return '';
    if (errors['startGreaterThanEnd'])
      return 'Start time cannot be greater than end time.';
    return '';
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.controls[controlName];
    if (!control.dirty) return '';
    const errors = control.errors;
    if (!errors) return '';
    if (errors['required']) return 'Required';
    return 'Invalid Input';
  }

  markAllAsDirty() {
    for (const control of Object.values(this.form.controls))
      control.markAsDirty();
  }

  getFormOutput(): IAppointmentInfo & { dentist_id: number } {
    const start_time = this.start_time.setFullYear(
      this.day.getFullYear(),
      this.day.getMonth(),
      this.day.getDate()
    );
    const end_time = this.end_time.setFullYear(
      this.day.getFullYear(),
      this.day.getMonth(),
      this.day.getDate()
    );
    return {
      dentist_id: this.form.controls['dentist_id'].value,
      type: this.form.controls['type'].value,
      room: this.form.controls['room'].value,
      start_time: moment(start_time).format('YYYY-MM-DDTHH:mm:00'),
      end_time: moment(end_time).format('YYYY-MM-DDTHH:mm:00'),
    };
  }
}
