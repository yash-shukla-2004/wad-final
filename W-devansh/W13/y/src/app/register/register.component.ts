import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onRegister(form: any) {
    const users = JSON.parse(localStorage.getItem('hp') || '[]');
    users.push(form.value);
    console.log(form.value)
    localStorage.setItem('hp', JSON.stringify(users));
    this.router.navigate(['/login']);
  }
}
