import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-v0-login',
  templateUrl: './v0-login.component.html',
  styleUrl: './v0-login.component.css',
})
export class V0LoginComponent {
  user = {
    username: '',
    password: '',
  };

  onSubmit() {
    // Handle login logic (e.g., authenticate user)
    console.log('User logged in:', this.user);
    // Add your authentication logic here
  }
}
