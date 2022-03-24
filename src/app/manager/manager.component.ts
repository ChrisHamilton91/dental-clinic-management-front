import { Component, OnInit } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { IEmployee } from 'src/schema/person';
import { BackendService } from '../services/backend.service';
import { LoadingNotificationService } from '../services/loading-notification.service';
import { AddEmployeeDialogService } from './add-employee-dialog/add-employee-dialog.service';
import { ManagerTableService } from './manager-table.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  employees = new Observable<IEmployee[]>();
  cols = [
    { field: 'employee_id', header: 'Employee ID' },
    { field: 'branch_id', header: 'Branch ID' },
    { field: 'position', header: 'Position' },
    { field: 'first_name', header: 'First Name' },
    { field: 'last_name', header: 'Last Name' },
    { field: 'gender', header: 'Gender' },
    { field: 'date_of_birth', header: 'Date of Birth' },
    { field: 'ssn', header: 'SSN' },
    { field: 'email', header: 'Email' },
  ];
  refreshSub = new Subscription();

  constructor(
    private addEmployeeDialog: AddEmployeeDialogService,
    private bes: BackendService,
    private mts: ManagerTableService,
    private lns: LoadingNotificationService
  ) {}

  ngOnInit(): void {
    this.refreshEmployees();
    this.refreshSub = this.mts.refreshSubject.subscribe(() =>
      this.refreshEmployees()
    );
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }

  refreshEmployees() {
    this.lns.show();
    this.employees = this.bes
      .getAllEmployees()
      .pipe(finalize(() => this.lns.hide()));
  }

  addNewEmployee() {
    this.addEmployeeDialog.visible = true;
  }
}
