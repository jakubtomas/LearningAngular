import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
})
export class TemplateDrivenFormComponent implements OnInit {
  name: string = '';
  email: string = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form submitted:', this.name, this.email);
  }
}
