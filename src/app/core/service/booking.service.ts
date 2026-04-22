import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../config/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {

private baseUrl = `${environment.apiUrl}/booking`;

  constructor(private http: HttpClient) {}

  // 📘 CREATE BOOKING
  createBooking(packageId: number) {
    return this.http.post(this.baseUrl, { packageId });
  }

  // 📄 GET MY BOOKINGS
  getMyBookings() {
    return this.http.get<any[]>(this.baseUrl);
  }
}