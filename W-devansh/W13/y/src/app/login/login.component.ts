import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginError = false;

  constructor(private router: Router) {}

  onLogin(form: any) {
    const users = JSON.parse(localStorage.getItem('hp') || '[]');
    const user = users.find(
      (u: any) => u.email === form.value.email && u.password === form.value.password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/profile']);
    } else {
      this.loginError = true;
    }
  }
} 
