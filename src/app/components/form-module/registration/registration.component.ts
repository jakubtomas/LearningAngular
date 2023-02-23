import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),

        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        password2: new FormControl('', Validators.required),
        message: new FormControl('', []),
      }

      // this.passwordMatchValidator

      // {
      //   validator: this.passwordMatchValidator
      // }
    );
  }

  ngOnInit(): void {}

  get getControl() {
    return this.userForm.controls;
  }

  // private passwordMatchValidator(model: FormGroup): ValidationErrors {

  //   // const password = model.get('password');
  //   // const password2 = model.get('password2');

  //   const password = this.getControl.password.value;
  //   const password2 = this.getControl.password2.value;

  //   if (password.dirty || password2.dirty) {

  //     if (password.value !== password2.value) {
  //       const errorMismatch = { mismatch: true };
  //       password2.setErrors(errorMismatch);
  //       return errorMismatch;

  //     } else {
  //       password2.setErrors(null);
  //       // return null
  //       return { mismatch: false };
  //     }
  //   }
  // }

  onSubmit() {
    console.log('click');
    console.log(this.getControl.email.value);

    console.log(this.userForm);
  }
}
