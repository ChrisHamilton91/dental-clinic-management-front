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
  data$ = new Observable();
  inputData = new FormControl('');
  apiKey = new FormControl('');
  response = '';

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.getTestTable();
  }

  submit() {
    this.backend
      .addToTestTable(this.inputData.value, this.apiKey.value)
      .subscribe({
        next: (res) => {
          this.response = res;
          this.getTestTable();
        },
        error: (err) => (this.response = err.error + ' ' + err.message),
      });
  }

  getTestTable() {
    this.data$ = this.backend.getTestTable();
  }
}
