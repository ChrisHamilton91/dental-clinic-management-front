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

export interface IPersonJoinPatient extends IPersonInfo {
  patient_id: string;
}

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
}
