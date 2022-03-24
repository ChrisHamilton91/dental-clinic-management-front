import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LoadingNotificationService {
  private visible = false;
  private key = 'loading';

  show() {
    if (this.visible) return;
    this.visible = true;
    this.ms.add({
      key: this.key,
      sticky: true,
      closable: false,
      severity: 'info',
    });
  }

  hide() {
    this.visible = false;
    this.ms.clear(this.key);
  }

  constructor(private ms: MessageService) {}
}
