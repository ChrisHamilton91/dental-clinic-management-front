import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getData = new Observable();
  inputData = new FormControl('');

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.getTestTable();
  }

  submit() {
    this.backend
      .addToTestTable(this.inputData.value)
      .subscribe((_) => this.getTestTable());
  }

  getTestTable() {
    this.getData = this.backend.getTestTable();
  }
}
