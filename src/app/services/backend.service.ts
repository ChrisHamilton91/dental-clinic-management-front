import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl = 'https://dental-clinic-server.herokuapp.com';

  constructor(private http: HttpClient) {}

  getTestTable() {
    return this.http.get(this.baseUrl + '/get-test-table');
  }

  addToTestTable(data: string, apiKey: string) {
    return this.http
      .post(
        this.baseUrl + '/add-to-test-table',
        { data: data },
        { responseType: 'text' as const, headers: { 'api-key': apiKey } }
      )
      .pipe(tap((res) => console.log(res)));
  }

  testApiKey(apiKey: string) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(apiKey === 'foo');
        observer.complete();
      }, 5000);
    });
  }
}
