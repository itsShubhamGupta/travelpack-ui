import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/service/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html'
})
export class ToastComponent {

  messages: any= [];

  constructor(private notify: NotificationService) {

    this.notify.toast$.subscribe(msg => {
      this.messages.push(msg);

      // auto remove after 3 sec
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    });
  }
}