import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-call',
  templateUrl: './http-call.component.html',
  styleUrls: ['./http-call.component.css']
})
export class HttpCallComponent implements OnInit {

  apiData = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData()
  }

  private getData(){


    .subscribe({
      next: (data: any) => {
        console.log('Response:', data);
        // Handle the data as needed
        this.apiData= data
        console.log('--------');

        console.log(data);


      },
      error: (error: any) => {
        console.log('ERROR');
        console.error('Error:', error);
        // Handle errors
      }
    });
  }


}
