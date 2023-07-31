import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {
  customerInfo: FormGroup;
  carsList: string[] = ['VOLVO', 'SKODA', 'BMW'];

  countries: Array<any> = [
    { name: 'India', value: 'india' },
    { name: 'France', value: 'france' },
    { name: 'USA', value: 'USA' },
    { name: 'Germany', value: 'germany' },
    { name: 'Japan', value: 'Japan' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.customerInfo = this.formBuilder.group({
      firstName: [],
      lastName: [],
      username: [],
      email: [],
      products: this.formBuilder.array([]),
      selectedCountries: new FormArray([]),
      // viacero sposobov
      // products: this.formBuilder.array([new FormControl([])]),

      items: [[]]
      // items: this.formBuilder.array([
      //   new FormControl('item1'),
      //   new FormControl('item2'),
      //   new FormControl('item3'),
      //   new FormControl('item4')
      // ])
    });
    this.setDefaultData();
  }

  ngOnInit() {
    //  this.setDefaultData();
  }
  getProductsFormArray() {
    return this.customerInfo.controls['products'] as FormArray;
  }
  getItemsFormArray() {
    return this.customerInfo.controls['items'] as FormArray;
  }

  onCheckboxChange(event: any) {
    console.log(event);

    const selectedCountries = this.customerInfo.controls[
      'selectedCountries'
    ] as FormArray;

    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountries.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedCountries.removeAt(index);
    }
  }

  submitForm() {
    console.log(this.customerInfo.value);
  }

  addProduct(name = '', desc = '') {
    console.log(this.customerInfo);
    console.log('/////////');
    console.log(this.getControl);
    console.log('-------------');
    console.log(' konkretni producs ');
    console.log(this.getControlsProducts);
    console.log('--------get Producs');
    console.log(this.products);
    console.log('-------------');

    let products = this.customerInfo.get('products') as FormArray;
    //this.products
    products.push(
      this.formBuilder.group({
        name: [name, [Validators.required]],
        description: [desc, [Validators.required]]
      })
    );
  }

  createCustomerInfo() {
    console.log('data is ', this.customerInfo.value);
    this.customerInfo.markAllAsTouched();
  }

  setDefaultData() {
    this.addProduct('tyre', 'rubber material');
  }

  get getControl() {
    return this.customerInfo.controls; // vrati vsetky controleri
  }

  get getControlsProducts() {
    return this.customerInfo.controls['products']; // kontretny controls
  }

  get products() {
    // this for errro
    return this.customerInfo.get('products') as FormArray;
  }

  // get getProductsControls() {
  //   return this.customerInfo.;
  // }
}
