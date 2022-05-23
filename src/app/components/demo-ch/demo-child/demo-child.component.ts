import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-child',
  templateUrl: './demo-child.component.html',
  styleUrls: ['./demo-child.component.css']
})
export class DemoChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  triggerChild() {
    console.log('Demo Child Component');

  }

}
