import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddItem } from 'src/app/actions/task.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private store: Store) { }

  addTutorial(name: string, url: string): void {
    this.store.dispatch(new AddItem({ name: name, text: url }))
  }

  ngOnInit(): void {

  }
}
