import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFormComponent } from './sme-form.component';

describe('SmeFormComponent', () => {
  let component: SmeFormComponent;
  let fixture: ComponentFixture<SmeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
