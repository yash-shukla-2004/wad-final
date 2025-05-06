import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userList: { rollno: string; name: string; phone: number; pass: string }[] =
    [];
  user: { rollno: string; name: string; phone: number; pass: string } = {
    rollno: '',
    name: '',
    phone: 0,
    pass: '',
  };
  success = false;
  isLogin = false;

  register() {
    this.userList.push(this.user);
    this.isLogin = true;
    this.user = {
      rollno: '',
      name: '',
      phone: 0,
      pass: '',
    };
  }

  toggleLogin() {
    this.isLogin = true;
  }

  login() {
    this.isLogin = false;
    this.userList.map((item) => {
      if (item.rollno === this.user.rollno) {
        if (item.pass === this.user.pass) {
          this.success = true;
          this.user = item;
        }
      }
    });
  }

  logout() {
    this.success = false;
    this.user = {
      rollno: '',
      name: '',
      phone: 0,
      pass: '',
    };
  }
}
