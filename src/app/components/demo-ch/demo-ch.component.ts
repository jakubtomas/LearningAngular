import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-ch',
  templateUrl: './demo-ch.component.html',
  styleUrls: ['./demo-ch.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush, // nesputi automaticke znovu nacitanie
})

export class DemoChComponent implements OnInit {
  carsArray: string[] = [];
  items = ['item1', 'item2', 'item3', 'item4'];
  currentItem = 'Television';

  constructor(private cd: ChangeDetectorRef) {
    //this.cd.detach(); //2
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log("Delayed for 2 second.");

      this.carsArray = ['Skoda', 'Mercedes']; // immjutable object
      // this.carsArray.push('hello');
      // this.cd.markForCheck(); // po tomto skontroluj view

      //this.cd.detectChanges(); //2
    }, 2000)
  }

  triggerParent() {
    console.log('Demo Parent Component');
  }

  addItem(newItem: string) {
    console.log(newItem);

    this.items.push(newItem);
  }





}
