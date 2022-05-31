import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarrayTwoComponent } from './farray-two.component';

describe('FarrayTwoComponent', () => {
  let component: FarrayTwoComponent;
  let fixture: ComponentFixture<FarrayTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarrayTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarrayTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
