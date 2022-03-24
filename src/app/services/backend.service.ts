import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IPersonInfo, IPatient, IEmployee } from 'src/schema/person';
import { ApiKeyService } from './api-key.service';
import * as moment from 'moment';
import { IAppointmentInfo } from 'src/schema/appointment';

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

  updatePatient(patient_id: number, person_info: IPersonInfo) {
    console.log('Updating patient_id: ', patient_id, ' with: ', person_info);
    return new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next('Patient Updated! (But not really)');
        observer.complete();
      }, 3000);
    });
    // return this.http.put<string>(
    //   this.baseUrl + '/update-patient',
    //   { patient_id, person_info },
    //   {
    //     headers: { 'api-key': this.aks.apiKey },
    //   }
    // );
  }

  getAllPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(this.baseUrl + '/get-all-patients').pipe(
      map((res) => {
        return res.map((el) => {
          return {
            ...el,
            date_of_birth: moment(el.date_of_birth, true)
              .utc()
              .format('YYYY-MM-DD'),
            patient_full_name: `${el.first_name} ${el.last_name}`,
          };
        });
      })
    );
  }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseUrl + '/get-all-employees').pipe(
      map((res) => {
        return res.map((el) => {
          return {
            ...el,
            date_of_birth: moment(el.date_of_birth, true)
              .utc()
              .format('YYYY-MM-DD'),
            position: this.getEmployeePosition(el),
          };
        });
      })
    );
  }

  getEmployeePosition(e: IEmployee): string {
    let res = '';
    if (e.dentist_id) res += 'dentist';
    if (e.hygienist_id) {
      if (res) res += ', ';
      res += 'hygienist';
    }
    if (e.receptionist_id) {
      if (res) res += ', ';
      res += 'receptionist';
    }
    if (e.manager_id) {
      if (res) res += ', ';
      res += 'manager';
    }
    return res;
  }

  addAppointment(
    patient_id: number,
    dentist_id: number,
    apt_info: IAppointmentInfo
  ) {
    console.log(
      'Adding appointment for patient: ',
      patient_id,
      'and dentist: ',
      dentist_id,
      ' with: ',
      apt_info
    );
    return new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next('Appointment added! (But not really)');
        observer.complete();
      }, 3000);
    });
    // return this.http.post(
    //   this.baseUrl + '/add-appointment',
    //   { ...apt_info, patient_id, dentist_id },
    //   {
    //     headers: { 'api-key': this.aks.apiKey },
    //   }
    // );
  }

  getAllDentists(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseUrl + '/get-all-dentists').pipe(
      map((res) => {
        return res.map((dentist) => {
          return {
            ...dentist,
            dentist_name: `Dr. ${dentist.first_name} ${dentist.last_name}`,
          };
        });
      })
    );
  }
}
