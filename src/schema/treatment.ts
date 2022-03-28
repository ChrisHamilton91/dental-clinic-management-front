export type Treatment = {
  id: number;
  patient_id: number;
  hygienist_id?: number;
  dentist_id?: number;
  type: string;
  medication: string;
  symptoms: string;
  comments: string;
  appointment_id: number;
  tooth: string;
};
