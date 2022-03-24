import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerTableService {
  refreshSubject = new Subject<void>();
  refresh() {
    this.refreshSubject.next();
  }
  constructor() {}
}
