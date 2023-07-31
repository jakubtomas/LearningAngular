import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  AfterContentInit
} from '@angular/core';
import Stepper from 'bs-stepper';
import {
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-sme-form',
  templateUrl: './sme-form.component.html',
  styleUrls: ['./sme-form.component.css']
})
export class SmeFormComponent implements OnInit, AfterViewInit {
  //name = 'Angular';
  private stepper: Stepper | undefined;
  //private myDiv: Element;

  //@ViewChild('stepper1', { static: true }) stepper: ElementRef | undefined;
  @ViewChild('stepper1', { static: true }) stepper1!: ElementRef;

  //  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // this.myDiv = this.elementRef.nativeElement.querySelector('#stepper1');
  }
  ngOnInit() {
    const stepper = this.renderer.selectRootElement('#stepper1');
    this.stepper = new Stepper(stepper, {
      linear: false,
      animation: true
    });

    // this.stepper = new Stepper(document.querySelector('#stepper1'), {
    //   linear: false,
    //   animation: true
    // });
  }
  // use npm install ngx-bootstrap --save

  ngAfterViewInit() {
    // if (isPlatformBrowser(this.platformId)) {
    //   if (this.stepper) {
    //     const stepperElement = this.stepper.nativeElement;
    //     const stepper = new Stepper(stepperElement, {
    //       linear: false,
    //       animation: true
    //     });
    //   }
    // }
  }
  onSubmit() {}

  next() {
    this.stepper?.next();
    if (this.stepper) {
      // this.stepper.next();
    }
  }
}
