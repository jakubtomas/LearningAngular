import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  userForm: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8)]],

      email: ['', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],

      phone: ['', [Validators.required]],

      password: ['', [Validators.required,
      Validators.minLength(8),
      this.createPasswordStrengthValidator()]],

      message: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.userForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.minLength(4)]],
    //   email: ['', [Validators.required]],
    //   phone: ['', [Validators.required]],
    //   message: ['', [Validators.required]]
    // })
  }

  get getControl() {
    return this.userForm.controls;
  }

  onSubmit(data: any) {
    console.log('click');
    console.log(data);

    console.log(this.userForm);
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

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
}
