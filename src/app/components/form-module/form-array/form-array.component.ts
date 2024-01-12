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

  apiData: string[] = ['A', 'C'];
  countries: Array<any> = [
    { name: 'A', value: false, countryId: 48 },
    { name: 'B', value: false, countryId: 58 },
    { name: 'C', value: false, countryId: 49 }
  ];

  private updateCountriesStatus() {
    // change from false to true , same name
    this.countries = this.countries.map((country) => {
      if (this.apiData.includes(country.name)) {
        return { ...country, value: true };
      }
      return country;
    });
  }

  constructor(private formBuilder: FormBuilder) {
    this.updateCountriesStatus();

    this.customerInfo = this.formBuilder.group({
      firstName: [],
      lastName: [],
      username: [],
      email: [],
      products: this.formBuilder.array([]),
      //      selectedCountries: this.formBuilder.array([]),

      selectedCountries: new FormArray([]),
      // viacero sposobov
      // products: this.formBuilder.array([new FormControl([])]),

      items: [[]]
      // items: this.formBuilder.array([
      //   new FormControl('item1'),
      //   new FormControl('item2'),
      //   new FormControl('item3'),
      // ])
    });

    // FIRST SET ALL FORM CONTROL TO FORM ARRAY
    //SECOND DELETE BY countryId
    // PUSH VALUE INTO FORM ARRAY,, ONLY TRUE CHECBOX
    this.countries.forEach((country) => {
      // bez validatorov, validacia
      if (country.value) {
        this.selectedCountriesFormArray.push(
          new FormControl(country.countryId)
        );
      }
    });

    this.setDefaultData();
  }
  //GET  FORM ARRAY selected COuntries
  get selectedCountriesFormArray(): FormArray {
    return this.customerInfo.get('selectedCountries') as FormArray;
  }

  ngOnInit() {
    //  this.setDefaultData();
  }

  getProductsFormArray(): FormArray {
    return this.customerInfo.controls['products'] as FormArray;
  }
  getItemsFormArray(): FormArray {
    return this.customerInfo.controls['items'] as FormArray;
  }

  onCheckboxChange(event: any, countryId: number) {
    const selectedCountries = this.selectedCountriesFormArray;

    // CREATE FormControl and push to FormArray
    if (event.target.checked) {
      selectedCountries.push(new FormControl(countryId));
    } else {
      //DELETE FormControl from FormArray by countryCode
      const index = selectedCountries.controls.findIndex(
        (x) => x.value === countryId
      );
      console.log(index);

      if (index !== -1) {
        this.selectedCountriesFormArray.removeAt(index);
      }
    }
    console.log(
      'new values ',
      this.customerInfo.controls.selectedCountries.value
    );
  }

  submitForm() {
    console.log(this.customerInfo.value);
  }

  addProduct(name = '', desc = '') {
    // console.log(this.customerInfo);
    // console.log('/////////');
    // console.log(this.getControl);
    // console.log('-------------');
    // console.log(' konkretni producs ');
    // console.log(this.getControlsProducts);
    // console.log('--------get Producs');
    // console.log(this.products);
    // console.log('-------------');

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
    console.log('data is ', this.customerInfo.controls.selectedCountries.value);
    this.customerInfo.markAllAsTouched();



    // CREATE NEW OBJECT FOR REQUEST MOCK
    const array:any = [];

    this.products.value.map((item: { name: string; description: string }) => {
      let myObject = {
        key: 'value',
        name: item.name,
        description: item.description
      };

      array.push(myObject);
    });


    console.log(array);

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
