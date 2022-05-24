import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  // userForm: FormGroup;
  userForm = this.formBuilder.group({
    name: ['', [Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8)]],

    email: ['', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],

    phone: ['', [Validators.required]],

    password: ['', [Validators.required,
    Validators.minLength(8),
    this.createPasswordStrengthValidator()]],

    password2: ['', [Validators.required]],

    message: ['', [Validators.required]]

  }
    , this.passwordMatchValidator // viem poslat objekt
  )
  constructor(public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getControl.message.disable();
    // pre disable nastavi validaciu true ,, je to bez chyby
    // nepouzije validatori
  }

  get getControl() {
    return this.userForm.controls;
  }

  onSubmit(data: any) {
    console.log('click');
    console.log(data);

  }

  createPasswordStrengthValidator(): ValidatorFn {
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
    }
  }

  private passwordMatchValidator(model: FormGroup): ValidationErrors | null {

    const password = model.get('password');
    const password2 = model.get('password2');

    if (!password || !password2) {
      return null;
    }

    if (password.dirty || password2.dirty) {

      if (password.value !== password2.value) {
        const errorMismatch = { mismatch: true };
        password2.setErrors(errorMismatch);
        return errorMismatch;

      } else {
        password2.setErrors(null);
        return null;
      }
    }

    return null;
  }
}
