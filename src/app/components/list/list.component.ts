import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { RemoveItem } from 'src/app/actions/task.actions';
import { Item } from 'src/app/models/task.model';
import { ItemState } from 'src/app/state/item.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //tutorials$: Observable<Item>
  @Select(ItemState.getItems) items$: Observable<Item[]> | undefined
  constructor(private store: Store) {
    //  this.tutorials$ = this.store.select(state => state.items.items)
  }

  removeItem(item: string): void {
    this.store.dispatch(new RemoveItem(item))
  }

  ngOnInit(): void {
  }
  /// redux devtools install 
}
