import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  handleError(err: any) {
    if (err instanceof HttpErrorResponse) {

    } else {

    }
    console.log(' we have error');

    console.log(err);

    return throwError(err);
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
