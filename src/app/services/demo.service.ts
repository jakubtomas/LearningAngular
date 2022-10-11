import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  userId: number;
  age: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DemoService {


  private postsUrl = "https://jsonplaceholder.typicode.com/";

  constructor(private http: HttpClient) {
  }


  getAllPosts(): Observable<any> {
    return this.http.get(this.postsUrl + "posts")/*.pipe(
            map(data => {

                console.log(data);
                return data;
            }),
        )*/
  }

  getOnePost(id: number): Observable<any> {
    return this.http.get(this.postsUrl + "posts/" + id).pipe(
      catchError(error => this.handleError(error))
    )
  }


  calculate(finalForm: any): Observable<any> {
    return this.http.get(this.postsUrl + "posts/" + 1).pipe(
      catchError(error => this.handleError(error))
    )

  }

  handleError(err: any) {
    if (err instanceof HttpErrorResponse) {

    } else {

    }

    return throwError(err);
  }

  // DATA for imperative way

  stream = of(
    [{ userId: 1, age: 18, name: "Janko" },
    { userId: 2, age: 25, name: "peter" },
    { userId: 3, age: 36, name: "mrkvicka" },
    { userId: 4, age: 18, name: "apple" },
    { userId: 5, age: 18, name: "banana" },
    { userId: 6, age: 50, name: "kacl" }]

  )

  public getAllUsers(): Observable<User[]> {
    return this.stream;
  }


  // handleError(err) {
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // if error is client-side error
  //     errorMessage = `Error: ${err.message}`;
  //   } else {
  //     // if error is server-side error
  //     errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
  //   }
  //   alert(errorMessage);
  //   return throwError(errorMessage);
  // }



  //   {
  //   "userId": 1,
  //     "id": 1,
  //       "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  // }
}
