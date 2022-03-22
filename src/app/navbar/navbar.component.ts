import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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

  constructor(public aks: ApiKeyService, private bes: BackendService) {}

  ngOnInit(): void {}

  testApiKey() {
    this.testingKey = true;
    this.bes.testApiKey(this.aks.apiKey).subscribe((res) => {
      console.log(res);
      this.testingKey = false;
    });
  }
}
