import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subscriber, tap } from 'rxjs';
import { IPersonInfo, IPersonJoinPatient } from 'src/schema/person';
import { ApiKeyService } from './api-key.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl = 'https://dental-clinic-server.herokuapp.com';

  constructor(private http: HttpClient, private aks: ApiKeyService) {}

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

  testApiKey() {
    return this.http.get<boolean>(this.baseUrl + '/test-api-key', {
      headers: { 'api-key': this.aks.apiKey },
    });
  }

  addPersonAsPatient(personInfo: IPersonInfo) {
    return this.http.post<{ person_id: number; patient_id: number }>(
      this.baseUrl + '/add-person-as-patient',
      personInfo,
      {
        headers: { 'api-key': this.aks.apiKey },
      }
    );
  }

  getAllPatients() {
    return this.http
      .get<IPersonJoinPatient[]>(this.baseUrl + '/get-all-patients')
      .pipe(
        map(
          (res) =>
            (res = res.map((el) => {
              return {
                ...el,
                date_of_birth: moment(el.date_of_birth, true)
                  .utc()
                  .format('DD-MM-YYYY'),
              };
            }))
        )
      );
  }
}
