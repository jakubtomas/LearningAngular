import { Item } from "../models/task.model";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddItem, RemoveItem } from "../actions/task.actions";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// Section 2
export class ItemStateModel {
  items: Item[] = [];
  valueA: string = '';
  valueB: string = '';
}

// Section 3
@State<ItemStateModel>({
  name: 'items',
  defaults: {
    items: [],
    valueA: 'asdfasdf',
    valueB: 'sdfgsdfg',
  }
})

@Injectable()
export class ItemState {

  @Selector()
  static getItems(state: ItemStateModel): Item[] {
    return state.items;
  }

  @Selector()
  static getFilterItems(state: ItemStateModel): Item[] {
    return state.items.filter(item => item.name)
    //return state.items.filter(predicate)
  }

  // add Item
  @Action(AddItem)
  add({ getState, patchState }: StateContext<ItemStateModel>, { payload }: AddItem) {
    const state = getState();
    patchState({
      ...state,
      items: [...state.items, payload]
    })
  }

  // You can use getState() to get the current state, setState() and patchState().
  // We're using patchState() instead of setState() as it helps reduce the necessary code.

  // remove Item
  @Action(RemoveItem)
  removeItem({ getState, patchState }: StateContext<ItemStateModel>, { payload }: RemoveItem) {
    //const state = getState();
    patchState({
      items: getState().items.filter(a => a.name != payload)
    })
  }

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
