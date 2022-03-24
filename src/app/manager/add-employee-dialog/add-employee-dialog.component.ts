import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { genderNames } from 'src/schema/genders';
import { provinces } from 'src/schema/provinces';
import { ManagerTableService } from '../manager-table.service';
import { AddEmployeeDialogService } from './add-employee-dialog.service';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss'],
})
export class AddEmployeeDialogComponent implements OnInit {
  provinces = provinces;
  genders = genderNames;
  now = new Date();
  errorMessage = '';

  constructor(
    public ds: AddEmployeeDialogService,
    private bes: BackendService,
    private ms: MessageService,
    private ws: WaitingService,
    private rts: ManagerTableService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.ds.markAllAsDirty();
    if (!this.ds.form.valid) {
      this.errorMessage = 'One or more fields are invalid.';
      return;
    }
    this.errorMessage = '';
    this.ws.waiting = true;

    new Observable((observer) => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 3000);
    })
      .pipe(finalize(() => (this.ws.waiting = false)))
      .subscribe({
        next: () => {
          console.log(
            'Added employee! (but not really)',
            this.ds.getFormOutput()
          );
          this.ms.add({
            severity: 'success',
            summary: 'Employee Added',
          });
          this.ds.visible = false;
        },
      });
    // this.bes
    //   .addPersonAsEmployee(this.ds.getFormOutput())
    //   .pipe(finalize(() => (this.ws.waiting = false)))
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.ms.add({
    //         severity: 'success',
    //         summary: 'Employee Added',
    //         detail: `Employee ID: ${res.patient_id}, Person ID: ${res.person_id}`,
    //       });
    //       this.ds.visible = false;
    //       this.rts.refresh();
    //     },
    //     error: (err) => {
    //       console.log(err.error);
    //       this.errorMessage =
    //         err.error?.message +
    //         (err.error?.detail ? `, ${err.error?.detail}` : '');
    //     },
    //   });
  }

  onHide() {
    this.ds.form.reset();
    this.errorMessage = '';
  }
}
