import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-farray-two',
  templateUrl: './farray-two.component.html',
  styleUrls: ['./farray-two.component.css']
})
export class FarrayTwoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: [],
      address: fb.array([])
    })
  }

  ngOnInit(): void {
  }

  getAddressFormArray() {
    //return this.form.get('address') as FormArray;

    return this.form.controls["address"] as FormArray
  }

  addNewAddressGroup() {
    const add = this.form.get('address') as FormArray;
    add.push(this.fb.group({
      street: [],
      city: []
    }))
  }

  deleteAddressGroup(index: number) {
    const add = this.form.get('address') as FormArray;
    add.removeAt(index)
  }
}
