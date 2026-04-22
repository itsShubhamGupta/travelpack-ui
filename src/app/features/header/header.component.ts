import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public auth: AuthService,private router :Router ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}