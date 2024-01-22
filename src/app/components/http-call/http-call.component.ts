import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface WebFormData {
  html: string;
  html_minimal: string;
  js: string;
  link: string;
}
@Component({
  selector: 'app-http-call',
  templateUrl: './http-call.component.html',
  styleUrls: ['./http-call.component.css']
})
export class HttpCallComponent implements OnInit {

  apiData:WebFormData = {
    html: '',
    html_minimal: '',
    js: '',
    link: ''
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData()
  }

  private getData(){


    this.http.get('web-form-preview/code?a=89dd3ca4-60fd-11ee-8523-3cecef38fa8d&g=999pjdmoxv5uzhqm31b3apu3wijzofl9nhin1gc8vjyhf3q1tghue0vryzf3wmx0473gyu05tfjfiejrq9voic81oprqinc34r7zy')

    .subscribe({
      next: (data: any) => {
        console.log('Response:', data);
        // Handle the data as needed
        this.apiData= data
        console.log(data);


      },
      error: (error: any) => {
        console.log('ERROR');
        console.error('Error:', error);
        // Handle errors
      }
    });
  }


  mockFunction(){
    const object = {
      "html":'hello',
      "html_minimal":'hello',
      "js":'hello',
      "link":'hello'
    }
  }

}
