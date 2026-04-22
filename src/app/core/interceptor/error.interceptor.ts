import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const notificationService = inject(NotificationService);
const router = inject(Router);


  return next(req).pipe(
    catchError((err) => {

      if (err.status === 401) {
        // alert('Session expired. Please login again');
        notificationService.show("Session expired. Please login again","error")
           localStorage.removeItem('token');
         localStorage.removeItem('user');
          localStorage.removeItem('userDetails');
        router.navigate(["/login"])

      }

      if (err.status === 403) {
        // ('Access denied');
        notificationService.show("Access denied","error")
        router.navigate(["/login"])

      }

      return throwError(() => err);
    })
  );
};