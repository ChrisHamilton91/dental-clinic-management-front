import { Component } from '@angular/core';
import { WaitingService } from './services/waiting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dental-clinic-management-front';

  constructor(public ws: WaitingService) {}
}
