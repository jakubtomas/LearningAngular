import { Post } from "../models/post.model"
import { Item } from "../models/task.model"


export class GetPost {
  static readonly type = '[Post] Get Post'

  constructor(public payload: number) { }
}
export class RemovePost {
  static readonly type = '[POST] Delete Post'

  constructor(public payload: string) { }
}
