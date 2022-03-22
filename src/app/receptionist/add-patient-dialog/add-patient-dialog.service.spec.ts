import { TestBed } from '@angular/core/testing';

import { AddPatientDialogService } from './add-patient-dialog.service';

describe('AddPatientDialogService', () => {
  let service: AddPatientDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPatientDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
