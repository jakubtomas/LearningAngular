import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';

@Component({
  selector: 'app-farray-two',
  templateUrl: './farray-two.component.html',
  styleUrls: ['./farray-two.component.css'],
})
export class FarrayTwoComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.form = fb.group({
      name: [],
      street: [],
      city: [],
      address: fb.array([]),
    });
  }

  ngOnInit(): void {}

  getAddressFormArray() {
    //return this.form.get('address') as FormArray;

    return this.form.controls['address'] as UntypedFormArray;
  }

  addNewAddressGroup() {
    const add = this.form.get('address') as UntypedFormArray;
    add.push(
      this.fb.group({
        street: [],
        city: [],
      })
    );
  }

  deleteAddressGroup(index: number) {
    const add = this.form.get('address') as UntypedFormArray;
    add.removeAt(index);
  }
}
