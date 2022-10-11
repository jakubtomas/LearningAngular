import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';


import { FormGroup, FormControl, Validators, FormArray, SelectControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
// import { Product, mainTariff } from '../models/product';
import { find, map } from 'rxjs/operators';
import { DemoService } from 'src/app/services/demo.service';


@Component({
  selector: 'app-sme-form',
  templateUrl: './sme-form.component.html',
  styleUrls: ['./sme-form.component.css']
})
export class SmeFormComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
