import { Component, OnInit } from '@angular/core';
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
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {
  userForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    // this.userForm = this.formBuilder.group({
    //   name: ['', [Validators.required,
    //   Validators.minLength(4),
    //   Validators.maxLength(8)]],

    //   email: ['', [Validators.required,
    //   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],

    //   phone: ['', [Validators.required,
    //   Validators.minLength(10),
    //   Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
    //   ]],

    //   password: ['', [
    //     Validators.required,
    //     Validators.minLength(8),
    //     ///  this.createPasswordStrengthValidator()
    //   ]],

    //   password2: ['', [Validators.required]],

    //   message: ['', [Validators.required]]

    // }
    //   //, this.passwordMatch('password', 'password2')
    //   , {
    //     //validators: this.passwordMatch('password', 'password2') // working
    //     // validators: this.mustMatch('password', 'password2') // working
    //     validators: this.passwordMatchValidator // viem poslat objekt

    //   }
    // );

    // use this
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$') // 10 characters
        ]),

        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          this.passwordStrengthValidator()
        ]),
        password2: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required)
      },

      //this.passwordMatch('password', 'password2') // also working

      {
        validators: this.passwordMatch('password', 'password2') // working
      }
    );
  }

  ngOnInit(): void {
    //  this.getControl.name.disable();
    // pre disable nastavi validaciu true ,, je to bez chyby
    // nepouzije validatori
  }

  get getControl() {
    return this.userForm.controls;
  }

  // iny sposob  ako sa dostat k hodnotam
  // mozno vyskusat vsetky funkcie ktore ponuka userForm, FormGroup

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

  //passwordMatchValidator(model: FormGroup): ValidationErrors {
  passwordMatchValidator(model: FormGroup) {
    const password = model.get('password');
    const password2 = model.get('password2');

    if (!password || !password2) {
      return null;
    }

    if (password2.errors && !password2.errors.mustMatch) {
      return;
    }

    // set error on password2 if validation fails
    if (password.value !== password2.value) {
      password2.setErrors({ mustMatch: true });
    } else {
      password2.setErrors(null);
    }
    return null;
    // };
  }

  // old Validation
  passwordMatchValidator2(model: FormGroup): ValidationErrors | null {
    const password = model.get('password');
    const password2 = model.get('password2');

    console.log('password Match Validator');
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
        // return null;
      }
    }

    return null;
  }

  // mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  //   return (formGroup: AbstractControl): { [key: string]: any } | null => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];

  //     if (matchingControl.errors && !matchingControl.errors.mustMatch) {
  //       return null;
  //     }

  //     // set error on matchingControl if validation fails
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ mustMatch: true });
  //       return { mustMatch: true }

  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //     return null;
  //   };
  // }

  // use this
  // this working but do not forget {validators :}
  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
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

  onSubmit(data: FormGroup) {
    console.log('click');
    console.log(data);
  }
}
