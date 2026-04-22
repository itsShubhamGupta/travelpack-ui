import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/service/auth.service';
import { NotificationService } from '../../core/service/notification.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  error = '';
  success = '';

  registerForm:FormGroup
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth:AuthService,
    private notification:NotificationService
  ) {

     this.registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]]
  });
  }

 

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      this.error = 'Please fill all fields correctly';
      return;
    }

    this.auth.signUp(this.registerForm.value)
      .subscribe({
        next: () => {
          this.success = 'Registration successful! Redirecting to login...';
          this.notification.show("Registration successful","success")
          this.router.navigate(['/login'])
        },
        error: (err) => {
           this.error = err.error?.message || 'Registration failed';
                    this.notification.show(this.error,"error")

         
        }
      });
  }
}