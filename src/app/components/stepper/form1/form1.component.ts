import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  @Output() submitForm1Event = new EventEmitter<FormGroup>();
  userForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8)
        ]),
        email: new FormControl('mockEmail@gmail.com', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]),
        phone: new FormControl('0950488899', [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$') // 10 characters
        ]),

        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          this.passwordStrengthValidator()
        ]),
        password2: new FormControl('', Validators.required)
      },

      {
        validators: this.passwordMatch('password', 'password2') // working
      }
    );
  }

  ngOnInit(): void {}

  onSubmit(data: FormGroup) {
    this.submitForm1Event.emit(data);
    console.log('userForm');
    console.log('userForm');
    console.log(this.userForm);
    console.log('////');
    console.log(data);
  }

  get getControl() {
    return this.userForm.controls;
  }

  get getName() {
    return this.userForm.get('name');
  }

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      console.log(' Strength Validator value ' + value);

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  private passwordMatch(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.mustMatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
