import { Component, OnInit } from '@angular/core';

export interface Fruit {
  name: string;
  age: number;
}
@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {

  fruits: Fruit[] = [
    { name: "apple", age: 18 },
    { name: "banana", age: 20 },
    { name: "pineapple", age: 18 }
  ];
  constructor() { }

  ngOnInit(): void {
  }


  triggerFunction() {
    console.log('click button');

    //this.fruits[0].name = 'kiwi'; // prva situacia

    // I created different object

    const fruit = this.fruits[0];
    const newFruit: any = { ...fruit }
    newFruit.name = 'Super kiwi';
    this.fruits[0] = newFruit;

  }

  componentReload() {
    console.log('fruits components');

  }

}
