import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { ReceptionistComponent } from './receptionist/receptionist.component';
import { DentistComponent } from './dentist/dentist.component';
import { PatientComponent } from './patient/patient.component';
import { AddPatientDialogComponent } from './receptionist/add-patient-dialog/add-patient-dialog.component';
import { EditPatientDialogComponent } from './receptionist/edit-patient-dialog/edit-patient-dialog.component';
import { AddPatientAptDialogComponent } from './receptionist/add-patient-apt-dialog/add-patient-apt-dialog.component';
import { ManagerComponent } from './manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ReceptionistComponent,
    DentistComponent,
    PatientComponent,
    AddPatientDialogComponent,
    EditPatientDialogComponent,
    AddPatientAptDialogComponent,
    ManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    SharedModule,
    FormsModule,
    TooltipModule,
    ToastModule,
    TableModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
