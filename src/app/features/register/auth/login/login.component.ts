import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/service/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error = '';
loginForm:FormGroup
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  onSubmit() {

    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        // ✅ Save token
        this.authService.saveToken(res.token);
        this.authService.setUserDetails(res.user)
        // ✅ Decode + store user
        // this.authService.setUserFromToken(res.token);
        // ✅ Redirect
        this.router.navigate(['/package-list']);
      },
      error: (err) => {
        console.log(err)
        this.notification.show(err.error.message,"error")
        this.error = 'Invalid email or password';
      }
    });
  }
  
  get f() {
  return this.loginForm.controls;
  }
}