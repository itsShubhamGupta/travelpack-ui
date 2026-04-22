import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environment';

import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface JwtPayload {
  sub?: string;
  email?: string;
  name?: string;
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {



  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,private router :Router) {}

  // 🔐 LOGIN API
  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/api/auth/signin`,
      data
    );
  }

  signUp(data:any){
    return this.http.post<any>(
      `${this.baseUrl}/api/auth/signup`,
      data
    );
  }

  // 💾 SAVE TOKEN
  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.setUser(token);
  }

 

  // 👤 STORE USER FROM TOKEN
  private setUser(token: string) {
    const decoded = jwtDecode(token);
    localStorage.setItem('user', JSON.stringify(decoded));
  }

  // 🔑 GET TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 👤 GET USER
  getUser(): JwtPayload {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // 🧠 GET USER NAME

setUserDetails(res:any){
    localStorage.setItem('userDetails', JSON.stringify(res));
}

   getUserDetails(): any {
    const data = localStorage.getItem('userDetails');

    if (!data || data === 'undefined') {
      return {};
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Invalid userDetails JSON');
      return {};
    }
  }

  // 🧠 NAME
  getName(): string {
    return this.getUserDetails()?.name || 'User';
  }

  // 🎭 ROLES
  getRoles(): string[] {
    return this.getUserDetails()?.roles || [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN') || false;
  }

  // 🔐 CHECK LOGIN
  isLoggedIn(): boolean {
    return !!this.getToken();

  }
     
  // 🚪 LOGOUT
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userDetails');


  }

isTokenExpired(): boolean {
    const user = this.getUser();
    if (!user || !user.exp) return true;
    
    // Check if current time (in seconds) is past exp time
    return Math.floor(Date.now() / 1000) >= user.exp;
  }
  
}


