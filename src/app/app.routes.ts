import { Routes } from '@angular/router';
import { PackageDetailComponent } from './features/package/package-detail/package-detail.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
{
    path: '',
    loadComponent: () =>
      import('./features/register/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  
  {
    path: 'login',
    loadComponent: () =>
      import('./features/register/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'package-list',
    loadComponent: () =>
      import('./features/package/package-list/package-list.component')
        .then(m => m.PackageListComponent),
    
  },

  {
  path: 'package-detail/:id',
  loadComponent: () =>
    import('./features/package/package-detail/package-detail.component')
      .then(m => m.PackageDetailComponent)
  },
  {
  path: 'my-bookings',
  loadComponent: () =>
    import('./features/booking-list/booking-list.component')
      .then(m => m.BookingListComponent)
} ,
{
  path: 'add-package',
  loadComponent: () =>
    import('./features/package/add-package/add-package.component')
      .then(m => m.AddPackageComponent),
      canActivate: [authGuard] // Protected
} ,
{
  path: 'register',
  loadComponent: () =>
      import('./features/register/register.component')
      .then(m => m.RegisterComponent)
}
  

];