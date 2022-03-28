export interface IAppointment extends IAppointmentInfo {
  patient_id: number;
  dentist_id: number;
  status: string;
}

export interface IAppointmentInfo {
  start_time: string;
  end_time: string;
  type: string;
  room: string;
}
