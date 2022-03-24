import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DentistComponent } from './dentist/dentist.component';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { PatientComponent } from './patient/patient.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'receptionist', component: ReceptionistComponent },
  { path: 'dentist', component: DentistComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'manager', component: ManagerComponent },
  { path: '', pathMatch: 'prefix', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
