import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  step: number = 1;
  constructor() {}

  ngOnInit(): void {}

  back() {
    console.log('back click');
    this.step -= 1;
  }
  next() {
    console.log('next click');

    this.step += 1;
  }

  submitForm1(data: FormGroup) {
    console.log('dostal som data');
    console.log(data);
  }
}
