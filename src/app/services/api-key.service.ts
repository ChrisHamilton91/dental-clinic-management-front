import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  private _apiKey = '';

  set apiKey(value: string) {
    this._apiKey = value;
    localStorage.setItem('api-key', value);
  }

  get apiKey() {
    return this._apiKey || localStorage.getItem('api-key') || '';
  }
}
