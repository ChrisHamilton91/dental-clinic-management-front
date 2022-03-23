import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WaitingService {
  waiting = false;

  constructor() {}
}
