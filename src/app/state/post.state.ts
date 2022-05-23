import { Item } from "../models/task.model";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddItem, RemoveItem } from "../actions/task.actions";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";
import { GetPost } from "../actions/post.actions";
import { DemoService } from "../services/demo.service";
import { catchError, tap } from 'rxjs/operators';


// Section 2
export class PostStateModel {
  items: Post[] = [];
  valueA: string = '';
  valueB: string = '';
}

// Section 3
@State<PostStateModel>({
  name: 'items',
  defaults: {
    items: [],
    valueA: 'asdfasdf',
    valueB: 'sdfgsdfg',
  }
})

@Injectable()
export class PostState {

  constructor(private service: DemoService) {
  }

  @Selector()
  static getPosts(state: PostStateModel): Post[] {
    return state.items;
  }

  // add Item
  // @Action(GetPost)
  // add({ getState, patchState }: StateContext<PostStateModel>, { payload }: GetPost) {
  //   const state = getState();

  //   this.service.getOnePost(payload).subscribe((data) => {

  //     const post = {
  //       userId: data.userId,
  //       id: data.id,
  //       title: data.title,
  //       body: data.body,
  //     }

  //     patchState({
  //       ...state,
  //       items: [...state.items, post]
  //     })

  //   })


  // poznamka
  // pouzivat skor subscribe alebo pipe and tap
  @Action(GetPost)
  add({ getState, patchState }: StateContext<PostStateModel>, { payload }: GetPost) {

    return this.service.getOnePost(payload).pipe(
      tap((data) => {
        const state = getState();

        const post = {
          userId: data.userId,
          id: data.id,
          title: data.title,
          body: data.body,
        }

        patchState({
          ...state,
          items: [...state.items, post]
        })

      }
        //   , catchError(error => {
        //   // spracovanie error


        // })
      )
    )









  }









  // remove Item

  // @Action(RemoveItem)
  // removeItem({ getState, patchState }: StateContext<PostStateModel>, { payload }: RemoveItem) {
  //   //const state = getState();
  //   patchState({
  //     items: getState().items.filter(a => a.name != payload)
  //   })
  // }

  // feedAnimals2(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
  //   return this.animalService.feed(action.animalsToFeed).pipe(
  //     tap(animalsToFeedResult => {
  //       const state = ctx.getState();
  //       ctx.patchState({
  //         feedAnimals: [...state.feedAnimals, animalsToFeedResult]
  //       });
  //     }),
  //     mergeMap(() => ctx.dispatch(new TakeAnimalsOutside()))
  //   );




}
