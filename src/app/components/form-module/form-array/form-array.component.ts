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
export interface WebPurpose {
  label: null | string;
  link_href: null | string;
  link_label: null | string;
  primary: boolean;
  purpose_id: number;
}

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {
  customerInfo: FormGroup;
  carsList: string[] = ['VOLVO', 'SKODA', 'BMW'];

  apiData: string[] = ['A', 'C'];

  requestArray: any = [];

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
  getProductsControls() {
    return this.getProductsFormArray().controls;
  }
  getItemsFormArray(): FormArray {
    return this.customerInfo.controls['items'] as FormArray;
  }

  //click on checbox
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

  addProduct(name = '', desc = '') {
    let products = this.customerInfo.get('products') as FormArray;

    products.push(
      this.formBuilder.group({
        name: [name, [Validators.required]],
        description: [desc, [Validators.required]]
      })
    );
  }

  submitForm() {
    console.log(this.customerInfo.value);
    console.log(this.customerInfo.getRawValue());
  }

  createCustomerInfo() {
    console.log('data is ', this.customerInfo.controls.selectedCountries.value);
    this.customerInfo.markAllAsTouched();

    // CREATE NEW OBJECT FOR REQUEST MOCK
    this.requestArray = []; // default
    this.products.value.map((item: { name: string; description: string }) => {
      let myObject = {
        key: 'value',
        name: item.name,
        description: item.description
      };

      this.requestArray.push(myObject);
    });

    console.log(this.requestArray);
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
    return this.customerInfo.get('products') as FormArray;
  }

  //second form  se

  //declaration   customerInfo: FormGroup;

  codeInContructor() {
    this.customerInfo = this.formBuilder.group({
      firstName: [],
      products: this.formBuilder.array([])
    });
  }

  getProductsFormArraySe(): FormArray {
    return this.customerInfo.controls['products'] as FormArray;
  }

  getProductsFormArrayControls() {
    const value = this.customerInfo.controls['products'] as FormArray;
    return value.controls;
  }

  getProductNameControl(index: number): FormControl {
    const product = (this.getProductsFormArrayControls()[index] as FormGroup)
      .controls['name'];
    return product as FormControl;
  }

  getProductFormControl(index: number) {
    return this.getProductsFormArray().at(index) as FormControl;
  }

  // this function I have up same just for info
  addProductSE(name = '', desc = '') {
    let products = this.customerInfo.get('products') as FormArray;
    //this.products
    products.push(
      this.formBuilder.group({
        name: [name, [Validators.required]],
        description: [desc, [Validators.required]]
      })
    );
  }

  //POtrebne nastudovat
  // vyberanie FormControlera s FormArray na zaklade idecka a meno FormControlera
  // kontrola ci obsahuje dany object s errorom pre vypis chyby v template

  form = new FormGroup({
    checboxMainPurpose: new FormControl(false, {}),

    mainPurposeId: new FormControl(0, {
      validators: [Validators.required]
    }),

    textBoxMain: new FormControl(null, { validators: [] }),
    //
    linkTextMain: new FormControl('', {}),
    linkAddressMain: new FormControl('', {}),

    checkbox2: new FormControl(false, {}),

    checboxiesInForm: new FormArray([])
  });

  //html template

  // <p i18n *ngIf="!isFreePurpose(i, 'purpose_id')">
  //             chyba has been used
  //     </p>

  isFreePurpose(id: number, controlName: string) {
    const controlId = id + '';
    const object = this.form.controls.checboxiesInForm
      .get(controlId)
      ?.get(controlName)?.errors;

    if (object) {
      const value =
        object.hasOwnProperty('samePurpose') && object['samePurpose'] === true;
      console.log('value');
      console.log(value);
      return !value;
    } else {
      console.log(' no object ');
      return true;
    }
  }

  selectedPurpose: number[] = [];

  getControlByControlName(controlName: string) {
    return this.form.get(controlName) as FormControl;
  }

  // zobral som hodnoty s FormControlera ktory je vo FormArray pomocou map a ulozil
  setSelectedPurpose(): void {
    console.log('control selected');

    this.selectedPurpose = [];

    const purpose = this.getControlByControlName('mainPurposeId').value;
    if ((purpose as number) !== 0) {
      this.selectedPurpose.push(
        this.getControlByControlName('mainPurposeId').value as number
      );
    }

    this.form.controls.checboxiesInForm.value.map((object: WebPurpose) => {
      if ((object.purpose_id as number) !== 0) {
        this.selectedPurpose.push(object.purpose_id as number);
      }
    });

    console.log(this.selectedPurpose);
  }

  existSelectedPurpose(number: number): boolean {
    const value = this.selectedPurpose.includes(number);
    console.log(value);

    return value;
  }

  // funkcie v kontruktore jak dostavat data a errors  aj celkovy prisup k FormControlera
  // ktory je vo FormArray

  //ako sa dostat k FOmrControl by id and name , also property

  //  this.form.valueChanges.subscribe(() => {
  //   console.log(this.form.controls.checboxiesInForm.controls);
  //   console.log("-----------------------");
  //   console.log(this.form.controls.checboxiesInForm.get('0')?.get('purpose_id'));
  //   console.log(this.form.controls.checboxiesInForm.get('0')?.get('purpose_id')?.errors);

  //   const object = this.form.controls.checboxiesInForm.get('0')?.get('purpose_id')?.errors

  //   if (object) {
  //     const value =  object.hasOwnProperty('required') && object['required'] === true;
  //     console.log('value');
  //     console.log(value);

  //   }else{
  //     console.log(' no object ');

  //   }

  //   this.setSelectedPurpose()
  // })
}
