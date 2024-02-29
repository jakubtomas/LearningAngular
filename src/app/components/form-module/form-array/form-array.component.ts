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
      // vlozenie FC do FA
      // products: this.formBuilder.array([new FormControl([])]),

      items: [[]]
      // items: this.formBuilder.array([
      //   new FormControl('item1'),
      //   new FormControl('item2'),
      // ])
    });

    //DO FA pushujem FormControls ale aj FormGroup with FormControls
    // FormControl môže mať meno alebo iba hodnotu
    // potom je tam mozno problem pri template vypisani

    // FIRST PUSH ALL FORM CONTROL TO FORM ARRAY
    //SECOND DELETE BY countryId'

    // PUSH VALUE INTO FORM ARRAY,, ONLY TRUE CHECBOX
    this.countries.forEach((country) => {
      // bez validatorov, validacia
      if (country.value) {
        this.selectedCountriesFormArray.push(
          new FormControl(country.countryId)
        );
      }
    });

    // DVA MOZNOSTI
    // aktualne riesenie  , mam 2 premene prva vsetky countries a
    // potom samostatne selectedCountries kde su iba true checkboxie

    //druha moznost false aj true by som dal do FormArray a filtroval by som true false v pripade onSubmit alebo display seleted items


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
    // maybe this return this.customerInfo.get('products') as FormArray
    return this.customerInfo.controls['products'] as FormArray;

  }
  getProductsControls() {
    return this.getProductsFormArray().controls;
  }
  getItemsFormArray(): FormArray {
    return this.customerInfo.controls['items'] as FormArray;
  }

  //click on checbox
  // push and delete FC from FA in form
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

  // add FG with FC to FA
  addProduct(name = '', desc = '') {
    let products = this.customerInfo.get('products') as FormArray;

    products.push(
      this.formBuilder.group({
        name: [name, [Validators.required]], //
        description: [desc, [Validators.required]] // description is name of FC
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
  // pravdepodobne sa tam v klada FC s menom FC a hodnotou

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


  //next example
  // Vkladanie FormControlera do FormArray s Async. Validatorom

  playFunctio(){
    // this.checkboxesInFormArray.push(
    //   new FormGroup({
    //     primary: new FormControl<boolean>(false, Validators.required),

    //     purpose_id: new FormControl<number>(purpose.purpose_id, { nonNullable: true, validators: [
    //       Validators.required],
    //    asyncValidators: [
    //     this.existSelectedPurposeValidator()
    //    ],
    //  }),

    //     label: new FormControl<string | null>(purpose.label, {
    //       nonNullable: true,
    //       validators: [Validators.required],
    //     }),
    //     link_label: new FormControl<string | null>(purpose.link_label),
    //     link_href: new FormControl<string | null>(purpose.link_href),
    //   })
    // );
  }

  // async Validator pre predchazdujuci kod

  // existSelectedPurposeValidator(): AsyncValidatorFn {

  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     //console.log('call async validator component ');

  //     const value = control.value;

  //     if (value === 0) {
  //       return of({ required: true });
  //     }

  //     //set Timeout with permission fix Recursive Calls this.form.valueChanges which call this validator and validator call this.valueChanges
  //     setTimeout(() => {
  //       if (!this.permission) {
  //         this.permission= true ;
  //       }
  //     }, 3000);

  //     this.setSelectedPurpose();

  //     return of(control.value).pipe(
  //       switchMap((val) => this.existSelectedPurpose(val)),
  //       map((exists: boolean) => (exists ? { duplicatePurpose: true } : null)),
  //     );
  //   };
  // }





  //next priklady prehladene errori v subscribe

  // this.webFormService
  //     .postSetPurposesToWebForm(requestArray, this.webFormId)
  //     .pipe(
  //       tap((response) => {
  //         console.log('response set Purposes for webForm');
  //         console.log(response);
  //       })
  //     )
  //     .subscribe((response) => {
  //       if (!response.success) {
  //         //ERRORS
  //         switch (response.error?.status) {
  //           case 409:
  //             this.toastsService.error($localize`Primary purpose must be one `);
  //             break;

  //           case 422:
  //             this.toastsService.error($localize`Invalid portal request`);
  //             break;
  //           case 500:
  //               this.toastsService.error($localize`Status 500`);
  //               break;

  //           default:
  //             this.toastsService.error($localize`Akce selhala. Zkuste to znovu.`);
  //         }
  //         return;
  //       } else {
  //         //SUCCESS
  //         this.toastsService.success($localize`Ucel spracovani byl uspesne pridan.`);
  //       }
  //     });





  // uloha vytvor formular s selectBoxami , ale kazdy hodnota zvolena v selectoboxe must be diffrent
// jedno riesenie , zobrat vsetky hodnoty a porovnat  , vypisat jednoduchu chybu

// druhe riesenie Vytvorit validator kde sa zoberuj vsetky aktualne hodnoty a  porovna sa s hodnotou s FormControlera  a v pripade zhody set Error ,
// je tam asi problem sa aktualnymi hodnotami, hodnota tam nebude asi aktualne aku som zvolil vo Formulari vo Selectboxe



//uloha 2 FormControls in FormGroup just basic form  , ak nieco napises do jedneho FormControlera druhy musi mat validator requiered a opacne napisem do 2  tak jednotka requered message alebo validator

// pozor na vymazavanie validator , kedy je to potrebne


// ak nastavenie validator v vlastnom validator , vola znova vlastni validator riesil by som to
// pomocou set timeout 1000 value false // toto sa uz vyriesilo pomocou true false
// iba na 1 sekundu sa vytvori rekurzivna funkcia a potom sa nastavi false a skonci to

// hladaj aj lepsie riesenie , vysusaj ten nefunkcny kod kontrola ci FormControl has validators

// what is doing this code below
// providers: [
//   {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => TextareaComponent),
//     multi: true,
//   },
//   {
//     provide: NG_VALIDATORS,
//     useExisting: forwardRef(() => TextareaComponent),
//     multi: true,
//   },
//   {
//     provide: SE_INPUT,
//     useExisting: forwardRef(() => TextareaComponent),
//     multi: true,
//   },
// ]






// nastavit validator do FormControlerov v FormArray iba v pripade ak jedna z dvoch hodnot je nastavena
 updatingValidators = false ;


private updateValidators() {
  if (this.updatingValidators) {
    return;
  }

  this.updatingValidators = true;
  console.log('Nastavujem ');

  const linkTextMainControl = this.form.get('linkTextMain');
  const linkAddressMainControl = this.form.get('linkAddressMain');

  const isLinkTextMainDirty =
    linkTextMainControl?.dirty && (linkTextMainControl?.value?.length ?? 0) > 0;
  const isLinkAddressMainDirty =
    linkAddressMainControl?.dirty && (linkAddressMainControl?.value?.length ?? 0) > 0;

  if (isLinkTextMainDirty || isLinkAddressMainDirty) {
    console.log('true condiction ');

    // Set Validators.required on both controls
    linkTextMainControl?.setValidators([Validators.required]);
    linkAddressMainControl?.setValidators([Validators.required]);

    linkTextMainControl?.markAsTouched();
    linkAddressMainControl?.markAsTouched();
  } else {
    // Clear Validators.required on both controls
    linkTextMainControl?.clearValidators();
    linkAddressMainControl?.clearValidators();
  }
  this.form.controls.textBoxMain.markAsTouched();

  linkTextMainControl?.updateValueAndValidity();
  linkAddressMainControl?.updateValueAndValidity();

  this.updatingValidators = false;
}



// nastavenie  validatorov vsetkym FormControl, ktory su vo FormGroup , ktory je in Form Array

//code in constructor

codeInConstructror(){
  this.form.controls.checboxiesInForm.valueChanges.subscribe((value) => {

    const totalGroups = this.getAllFormGroups().length;

  // Call the updateValidatorsBasedOnCondition function for each form group with condition as true
  for (let i = 0; i < totalGroups; i++) {
    this.updateValidatorsBasedOnCondition(i);
  }

  });
}
getAllFormGroups(): FormGroup[] {
  return this.checkboxFormArray.controls
    .filter((control) => control instanceof FormGroup)
    .map((control) => control as FormGroup);
}

get checkboxFormArray() {
  return this.form.get('checboxiesInForm') as FormArray;
}

updateValidatorsBasedOnCondition(index: number): void {
  if (this.updatingValidators) {
    return;
  }

  this.updatingValidators = true;

  const formGroup = this.checkboxFormArray.at(index) as FormGroup;

  // Get the specific FormControls controls.link_href  controls.link_label
  const linkAddressMainControl = formGroup.get('link_href') as FormControl;
  const linkTextMainControl = formGroup.get('link_label') as FormControl;

  const isLinkTextMainDirty =
(linkTextMainControl?.value?.length ?? 0) > 0;
const isLinkAddressMainDirty =
  (linkAddressMainControl?.value?.length ?? 0) > 0;

  if (isLinkTextMainDirty || isLinkAddressMainDirty) {
    linkTextMainControl.setValidators([Validators.required]);
    linkAddressMainControl.setValidators([Validators.required]);
  } else {
    linkTextMainControl.clearValidators();
    linkAddressMainControl.clearValidators();
  }

  // Update the validity status
  linkTextMainControl.updateValueAndValidity();
  linkAddressMainControl.updateValueAndValidity();

  this.updatingValidators = false;

}



}
