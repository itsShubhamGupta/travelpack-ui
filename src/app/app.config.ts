import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { jwtInterceptor } from './core/interceptor/jwt.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './core/interceptor/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor,spinnerInterceptor])
    )]
};
