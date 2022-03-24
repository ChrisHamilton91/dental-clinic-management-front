export interface IPerson extends IPersonInfo {
  user_id: number;
}

export interface IPersonInfo {
  house_number: number;
  street: string;
  city: string;
  province: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: Gender;
  ssn: number;
  email: string;
  date_of_birth: string;
}

export interface IPatient extends IPersonInfo {
  patient_id: number;
}

export interface IEmployee extends IPersonInfo {
  employee_id: number;
  branch_id: number;
  position: string;
  dentist_id?: number;
  receptionist_id?: number;
  manager_id?: number;
  hygienist_id?: number;
  dentist_name?: string;
}

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
}
