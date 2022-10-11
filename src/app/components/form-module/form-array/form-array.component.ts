import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {


  customerInfo: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.customerInfo = this.formBuilder.group({
      firstName: [],
      lastName: [],
      username: [],
      email: [],
      products: this.formBuilder.array([])
    })
    this.setDefaultData();
  }

  ngOnInit() {
    //  this.setDefaultData();
  }
  getProductsFormArray() {
    return this.customerInfo.controls["products"] as FormArray
  }


  addProduct(name = "", desc = "") {
    console.log(this.customerInfo);
    console.log('/////////');

    console.log("return kontroleri");

    console.log(this.getControl);
    console.log("-------------");
    console.log(" konkretni producs ");

    console.log(this.getControlsProducts);
    console.log("-------------");
    console.log("--------get Producs");
    console.log(this.products);
    console.log("-------------");


    let products = this.customerInfo.get('products') as FormArray;
    //this.products
    products.push(this.formBuilder.group({
      name: [name, [Validators.required]],
      description: [desc, [Validators.required]]
    }));
  }

  createCustomerInfo() {
    console.log('data is ', this.customerInfo.value);
    this.customerInfo.markAllAsTouched();
  }

  setDefaultData() {
    this.addProduct("tyre", "rubber material");
  }

  get getControl() {
    return this.customerInfo.controls; // vrati vsetky controleri
  }

  get getControlsProducts() {
    return this.customerInfo.controls["products"]; // kontretny controls
  }

  get products() { // this for errro
    return this.customerInfo.get('products') as FormArray;
  }



  // get getProductsControls() {
  //   return this.customerInfo.;
  // }
}
