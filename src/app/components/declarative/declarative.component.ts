import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { DemoService, User } from 'src/app/services/demo.service';

@Component({
  selector: 'app-declarative',
  templateUrl: './declarative.component.html',
  styleUrls: ['./declarative.component.css']
})
export class DeclarativeComponent implements OnInit {


  public searchField: FormControl;
  public users: User[] | undefined;
  public filterUsers$: Observable<User[]> | undefined;


  constructor(public formBuilder: FormBuilder,
    private demoService: DemoService) {
    this.searchField = new FormControl('');
  }

  ngOnInit(): void {
    // get a stream of our users
    const users$ = this.demoService.getAllUsers();

    //get a stream of our search temr
    const searchItem$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value))

    this.filterUsers$ = combineLatest([users$, searchItem$]).pipe(
      map(([users, searchItem]) => {

        return users.filter((user) => searchItem === '' ||
          user.name.toLowerCase().includes(searchItem.toLowerCase())

        )
      })
    )
  }
}
