import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { CustomValidators } from "./services/custom-validator";
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./auth.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        secret: ['', Validators.required],
        mobile: ['', Validators.required],
        ischktelegram: [undefined, []],
        ischkemail: [undefined, []],
        ischkscanemail: [undefined, []],
      },
      { validators: CustomValidators.passwordsMatching }
    );
  }

  get newform() {
    return this.signupForm.controls;
  }

  //forprod -- JSON.stringify({...})
  signup() {
    this.authService.signup({
      email: this.newform['email'].value,
      first_name: this.newform['firstname'].value,
      last_name: this.newform['lastname'].value,
      password: this.newform['password'].value,

      secret: this.newform['secret'].value,
      mobile: this.newform['mobile'].value,
      notif_telegram: this.newform['ischktelegram'].value,
      notif_email: this.newform['ischkemail'].value,
      scan_email: this.newform['ischkscanemail'].value,
      loginType: 'LOCAL',
      id: ''
    })
    // id: '',
    // role: 'OWNER',
      .subscribe(() =>
         this.router.navigate([this.authService.LOGIN_PATH]))
  }
}

    // this.authService.register(this.registerForm.value).pipe(
    //   // If registration was successfull, then navigate to login route
    //   tap(() => this.router.navigate(['../login']))
    // ).subscribe();