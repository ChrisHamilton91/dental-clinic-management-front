import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  IPersonInfo,
  IPatient,
  IEmployee,
  IEmployeeInfo,
} from 'src/schema/person';
import { ApiKeyService } from './api-key.service';
import * as moment from 'moment';
import { IAppointment, IAppointmentInfo } from 'src/schema/appointment';
import { Branch } from 'src/schema/branch';
import { Treatment } from 'src/schema/treatment';

export type AddEmployeeReturn = {
  person_id_ret: number;
  employee_id_ret: number;
  user_id_ret: number;
  dentist_id_ret?: number;
  hygienist_id_ret?: number;
  receptionist_id_ret?: number;
};

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
    return this.http.patch(
      this.baseUrl + '/update-patient-with-patient-id',
      {
        patient_id,
        ...person_info,
        house_number: person_info.house_number.toString(),
      },
      {
        headers: { 'api-key': this.aks.apiKey },
        responseType: 'text' as const,
      }
    );
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
  ): Observable<{ apt_id: number }> {
    return this.http.put<{ apt_id: number }>(
      this.baseUrl + '/add-dentist-appointment',
      { ...apt_info, patient_id, dentist_id },
      {
        headers: { 'api-key': this.aks.apiKey },
      }
    );
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

  getProcedureTypes(): Observable<{ type: string }[]> {
    return this.http.get<{ type: string }[]>(
      this.baseUrl + '/get-procedure-types'
    );
  }

  getAllBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.baseUrl + '/get-all-branches');
  }

  addPersonAsDentist(
    employeeInfo: IEmployeeInfo & { branch_city: string }
  ): Observable<AddEmployeeReturn> {
    return this.http.post<AddEmployeeReturn>(
      this.baseUrl + '/add-person-as-dentist',
      employeeInfo,
      {
        headers: { 'api-key': this.aks.apiKey },
      }
    );
  }

  addPersonAsHygienist(
    employeeInfo: IEmployeeInfo & { branch_city: string }
  ): Observable<AddEmployeeReturn> {
    return this.http.post<AddEmployeeReturn>(
      this.baseUrl + '/add-person-as-hygienist',
      employeeInfo,
      {
        headers: { 'api-key': this.aks.apiKey },
      }
    );
  }

  addPersonAsReceptionist(
    employeeInfo: IEmployeeInfo & { branch_city: string }
  ): Observable<AddEmployeeReturn> {
    return this.http.post<AddEmployeeReturn>(
      this.baseUrl + '/add-person-as-receptionist',
      employeeInfo,
      {
        headers: { 'api-key': this.aks.apiKey },
      }
    );
  }

  getDentistAppointments(dentist_id: number): Observable<IAppointment[]> {
    return this.http
      .get<IAppointment[]>(
        this.baseUrl + '/check-appointments-for-dentist/' + dentist_id,
        {
          headers: { 'api-key': this.aks.apiKey },
        }
      )
      .pipe(
        map((apts) =>
          apts.map((apt) => {
            return {
              ...apt,
              start_time: moment(apt.start_time)
                .utc()
                .format('YYYY-MM-DD @ HH:mm'),
              end_time: moment(apt.end_time).utc().format('YYYY-MM-DD @ HH:mm'),
            };
          })
        )
      );
  }

  getPatientAppointments(patient_id: number): Observable<IAppointment[]> {
    return this.http
      .get<IAppointment[]>(
        this.baseUrl + '/check-appointments-for-patient/' + patient_id,
        {
          headers: { 'api-key': this.aks.apiKey },
        }
      )
      .pipe(
        map((apts) =>
          apts.map((apt) => {
            return {
              ...apt,
              start_time: moment(apt.start_time)
                .utc()
                .format('YYYY-MM-DD @ HH:mm'),
              end_time: moment(apt.end_time).utc().format('YYYY-MM-DD @ HH:mm'),
            };
          })
        )
      );
  }

  getPatientTreatments(patient_id: number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(
      this.baseUrl + '/get-patient-treatments/' + patient_id,
      {
        headers: { 'api-key': this.aks.apiKey },
      }
    );
  }
}
