import { Item } from "../models/task.model"


export class AddItem {
  static readonly type = '[Item] Add'

  constructor(public payload: Item) { }
}

export class RemoveItem {
  static readonly type = '[TUTORIAL] Remove'

  constructor(public payload: string) { }
}
