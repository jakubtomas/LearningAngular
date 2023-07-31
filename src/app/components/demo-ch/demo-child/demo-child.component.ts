import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'demo-child',
  templateUrl: './demo-child.component.html',
  styleUrls: ['./demo-child.component.css'],
})
export class DemoChildComponent implements OnInit {
  @Input() amount: number = 3.5155;
  @Input() currencyCode: string = '$';
  // amount = 4
  value = 'S';
  result = '';

  @Input() item = ''; // decorate the property with @Input()

  //DEMO CHILD COMPONENT
  constructor() {}

  ngOnInit(): void {
    this.result = this.currencyCode + this.amount.toFixed(2).toString();
  }

  @Output() newItemEvent = new EventEmitter<string>();
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  triggerChild() {
    console.log('Demo Child Component');
  }
}
