import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-v0-newuser',
  templateUrl: './v0-newuser.component.html',
  styleUrl: './v0-newuser.component.css',
})
export class V0NewuserComponent {
  user = {
    username: '',
    email: '',
    password: '',
  };

  onSubmit() {
    // Handle form submission (e.g., send data to a server)
    console.log('User submitted:', this.user);
    // Add your registration logic here
  }
}
