import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import {
  AddEmployeeReturn,
  BackendService,
} from 'src/app/services/backend.service';
import { LoadingNotificationService } from 'src/app/services/loading-notification.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { genderNames } from 'src/schema/genders';
import { employeeTypes, Position, positions } from 'src/schema/person';
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
  positions = positions;
  employeeTypes = employeeTypes;
  branches = new Observable<any>();
  now = new Date();
  errorMessage = '';

  constructor(
    public ds: AddEmployeeDialogService,
    private bes: BackendService,
    private ms: MessageService,
    private ws: WaitingService,
    private rts: ManagerTableService,
    private lns: LoadingNotificationService
  ) {}

  ngOnInit(): void {
    this.refreshBranches();
  }

  refreshBranches() {
    this.lns.show();
    this.branches = this.bes
      .getAllBranches()
      .pipe(finalize(() => this.lns.hide()));
  }

  submit() {
    this.ds.markAllAsDirty();
    if (!this.ds.form.valid) {
      this.errorMessage = 'One or more fields are invalid.';
      return;
    }
    this.errorMessage = '';

    let obs: Observable<AddEmployeeReturn> | undefined;
    const formOutput = this.ds.getFormOutput();
    if (this.ds.position === Position.DENTIST)
      obs = this.bes.addPersonAsDentist(formOutput);
    if (this.ds.position === Position.HYGIENIST)
      obs = this.bes.addPersonAsHygienist(formOutput);
    if (this.ds.position === Position.RECEPTIONIST)
      obs = this.bes.addPersonAsReceptionist(formOutput);
    if (!obs) {
      this.errorMessage = 'Could not get employee position';
      return;
    }

    this.ws.waiting = true;
    obs.pipe(finalize(() => (this.ws.waiting = false))).subscribe({
      next: (res) => {
        console.log(res);
        this.ms.add({
          severity: 'success',
          summary: 'Employee Added',
          detail: 'Employee id: ' + res.employee_id_ret,
        });
        this.ds.visible = false;
        this.rts.refresh();
      },
      error: (err) => {
        console.log(err.error);
        if (typeof err.error === 'string') this.errorMessage = err.error;
        else
          this.errorMessage =
            err.error?.message +
            (err.error?.detail ? `, ${err.error?.detail}` : '');
      },
    });
  }

  onHide() {
    this.ds.form.reset();
    this.errorMessage = '';
  }
}
