import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPost } from 'src/app/actions/post.actions';
import { Post } from 'src/app/models/post.model';
import { DemoService } from 'src/app/services/demo.service';
import { PostState } from 'src/app/state/post.state';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Select(PostState.getPosts) posts$: Observable<Post[]> | undefined
  constructor(private store: Store,
    private service: DemoService) { }


  ngOnInit(): void {
    console.log('spustenie funkcii');
    this.getOnePost();

  }

  addPost(nubmer: string) {
    console.log(nubmer);
    this.store.dispatch(new GetPost(1))

  }


  // poznamka pripad pouzitia reaktivneho programovanie
  // pipe  odchytavanie chyb

  private getOnePost() {
    this.service.getOnePost(1).subscribe(value => {
      console.log("value");
      console.log(value);
    }, error => {
      console.log("error");
      console.log(error);
      this.handleError(error.message)

    })
  }

  private handleError(error: any) {
    alert(error)
  }

}
