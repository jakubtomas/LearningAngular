import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  userForm: UntypedFormGroup;

  constructor() {
    this.userForm = new UntypedFormGroup(
      {
        email: new UntypedFormControl('', [Validators.required, Validators.email]),

        password: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        password2: new UntypedFormControl('', Validators.required),
        message: new UntypedFormControl('', []),
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
