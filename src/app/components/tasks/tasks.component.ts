import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddItem, AddItem2 } from 'src/app/actions/task.actions';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  posts = null;
  constructor(private store: Store,
    private service: DemoService) { }

  addTutorial(name: string, url: string): void {
    this.store.dispatch(new AddItem2({ name: name, text: url }))
  }

  ngOnInit(): void {
    //this.getPosts();

  }

  private getPosts() {
    this.service.getAllPosts().subscribe(data => {
      console.log(data);
      this.posts = data;
    })
  }
}
