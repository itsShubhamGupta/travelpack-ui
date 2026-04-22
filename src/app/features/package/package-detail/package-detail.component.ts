import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackingService } from '../../../core/service/packing.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/service/booking.service';
import { NotificationService } from '../../../core/service/notification.service';

@Component({
  selector: 'app-package-detail',
  imports: [CommonModule],
  templateUrl: './package-detail.component.html',
  styleUrl: './package-detail.component.css'
})
export class PackageDetailComponent {

  package: any;

  constructor(
    private route: ActivatedRoute,
    private packageService: PackingService,
    private bookingService: BookingService,
        private notificationService: NotificationService


  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadPackage(+id);
    }
  }

  loadPackage(id: number) {
    this.packageService.getPackageById(id).subscribe({
      next: (res) => this.package = res,
      error: (err) => console.error(err)
    });
  }

  // 🔥 BOOK BUTTON (next step)
  bookNow() {

    this.bookingService.createBooking(this.package.id)
      .subscribe({
        next: () => {
          this.notificationService.show("Booking created ", "success")
        },
        error: () => {
          this.notificationService.show("Booking failed ", "error")

        }
      });
  }

}
