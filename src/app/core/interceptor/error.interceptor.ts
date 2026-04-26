import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const notificationService = inject(NotificationService);
const router = inject(Router);
const auth = inject(AuthService);





  return next(req).pipe(
    catchError((err) => {

      if (err.status === 401) {
        // alert('Session expired. Please login again');
        notificationService.show("Session expired. Please login again","error")
          auth.logout();
        router.navigate(["/login"])

      }

      if (err.status === 403) {
        // ('Access denied');
        notificationService.show("Access denied","error")
        auth.logout()
        router.navigate(["/login"])

      }

      return throwError(() => err);
    })
  );
};