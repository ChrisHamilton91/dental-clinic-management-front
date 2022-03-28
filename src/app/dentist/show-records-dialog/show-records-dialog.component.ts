import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { Treatment } from 'src/schema/treatment';
import { ShowRecordsDialogService } from './show-records-dialog.service';

@Component({
  selector: 'app-show-records-dialog',
  templateUrl: './show-records-dialog.component.html',
  styleUrls: ['./show-records-dialog.component.scss'],
})
export class ShowRecordsDialogComponent implements OnInit {
  constructor(public ds: ShowRecordsDialogService) {}

  ngOnInit(): void {}
}
