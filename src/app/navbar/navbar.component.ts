import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ApiKeyService } from '../services/api-key.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Receptionist UI', routerLink: ['/receptionist'] },
    { label: 'Dentist UI', routerLink: ['/dentist'] },
    { label: 'Patient UI', routerLink: ['/patient'] },
  ];

  testingKey = false;
  testTooltip = 'Ping the backend server to verify the api key.';

  constructor(
    public aks: ApiKeyService,
    private bes: BackendService,
    private ms: MessageService
  ) {}

  ngOnInit(): void {}

  testApiKey() {
    this.testingKey = true;
    this.bes
      .testApiKey()
      .pipe(finalize(() => (this.testingKey = false)))
      .subscribe((res) => {
        this.notifyOfKeyValidity(res);
      });
  }

  notifyOfKeyValidity(valid: boolean) {
    if (valid === true)
      this.ms.add({
        severity: 'success',
        summary: 'Valid',
        detail: 'The api key is valid!',
      });
    else
      this.ms.add({
        severity: 'error',
        summary: 'Invalid',
        detail: 'The api key is invalid...',
      });
  }
}
