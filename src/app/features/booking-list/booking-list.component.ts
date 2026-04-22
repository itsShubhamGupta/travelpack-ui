import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../core/service/booking.service';

@Component({
  standalone: true,
  selector: 'app-booking-list',
  imports: [CommonModule],
  templateUrl: './booking-list.component.html'
})
export class BookingListComponent {

  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getMyBookings()
      .subscribe(res => this.bookings = res);
  }
}