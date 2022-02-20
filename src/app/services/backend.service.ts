import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl = 'https://dental-clinic-server.herokuapp.com';

  constructor(private http: HttpClient) {}

  getTestTable() {
    return this.http.get(this.baseUrl + '/get-test-table');
  }

  addToTestTable(data: string) {
    this.http
      .post(
        this.baseUrl + '/add-to-test-table',
        { data: data },
        { responseType: 'text' as const }
      )
      .subscribe((res) => console.log(res));
  }
}
