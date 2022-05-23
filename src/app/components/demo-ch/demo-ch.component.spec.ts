import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChComponent } from './demo-ch.component';

describe('DemoChComponent', () => {
  let component: DemoChComponent;
  let fixture: ComponentFixture<DemoChComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoChComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
