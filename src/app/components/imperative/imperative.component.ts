import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { DemoService, User } from 'src/app/services/demo.service';

@Component({
  selector: 'app-imperative',
  templateUrl: './imperative.component.html',
  styleUrls: ['./imperative.component.css'],

})
export class ImperativeComponent implements OnInit, OnDestroy {

  public searchField: FormControl;
  public users: User[] | undefined;
  public filterUsers: User[] | undefined;
  public console = console;
  // trigger this to unsubsribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public formBuilder: FormBuilder,
    private demoService: DemoService) {
    this.searchField = new FormControl('');
  }

  ngOnInit(): void {

    this.demoService.getAllUsers().pipe(
      delay(500), // cakam
      takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.users = users;

        //set list to all clients by default
        this.filterUsers = users;
      })

    this.searchField.valueChanges.pipe(
      takeUntil(this.destroy$))
      .subscribe((searchItem) => {
        this.filterUsers = this.users?.filter(
          (user) => searchItem === '' ||
            user.name.toLowerCase().includes(searchItem.toLowerCase())
        )

      })


  }

  onSubmit(value: any) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }

}
