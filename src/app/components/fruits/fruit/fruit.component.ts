import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Fruit } from '../fruits.component';

@Component({
  selector: 'fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FruitComponent implements OnInit {
  // prva situacia bez changeD  -> po stlaceny sa hodnota zmeni
  // druha situaci pozite changeDetecttion


  @Input()
  fruit: Fruit | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
