import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { CustomValidationService } from '../service/custom-validation.service';
import { LibraryService, User } from '../service/library.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  

})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  value: any = '';
  user !: User;
  messageError !: string; 
  requestFailed: boolean = false;
  emailFailed: boolean = false;
  passwordFailed: boolean = false;
  allCategories: any[] = [];
  selectedCategoriesValue: any [] = [];
  categories: Array<string> = ['Anime', 'Ciencia Ficción', 'Novelas', 'Dramas', 'Fantasía']
  categororyErrors: Boolean = true;
  userNameError!: Boolean;
  
  constructor(private formBuilder: FormBuilder,private libraryService: LibraryService ) { }

  ngOnInit(): void {
   // this.allCategoryBook(),
    this.form = this.formBuilder.group({
      username: ['',{
        validators: [Validators.required], asyncValidators: [ checkUserName(this.libraryService)], upDateOn: 'blur' } ],
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8), Validators.pattern("^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$")],
      confirmPassword: ['', Validators.required],
      category: this.addCategoriesControls()
    });
  }
 
  

  addCategoriesControls(){
    const arr = this.categories.map( (el:any)=> { 
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }
   get categoriesArray(){
    return <FormArray>this.form.get('category')
   }

   checkCategoriesControlTouched(){
    let flg = false;
    this.categoriesArray.controls.forEach((control: any)=>{
      if( control.touched){
        flg = true;
      }
    });
    return flg;
   }

   getSelectedCategoriesValue(){
    this.selectedCategoriesValue = [];
    this.categoriesArray.controls.forEach((control:any, i ) => {
      if(control.value) {
        this.selectedCategoriesValue.push(this.categories[i]);
       }
    });
    this.categororyErrors = this.selectedCategoriesValue.length > 2 ? false : true;

   }

  // allCategoryBook(){
  //   this.libraryService.categoryOfBooks()
  //   .subscribe({
  //     next: res => {console.log('CATEGORIAS',res) 
  //     this.allCategories= res
  //   }
  //   })
  // }
  onSubmit(body:User){
    const formValue = this.form.getRawValue();
    const newCategory = this.selectedCategoriesValue;
    this.user= {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      category: {...newCategory}

    }
    if( !this.categororyErrors){
     
   console.log('datos del form', this.user)
    this.libraryService.registerUser(this.user)
    .subscribe({
      next: res => {
        console.log('recibiendo respuesta', res)
                 
        }
    })
  }
    
  }
  
}
 //aysnchronus function to validate username:
 export function checkUserName(libraryService:any):AsyncValidatorFn {
  return (control: AbstractControl) => { //recibo el value control
    return libraryService.existUserName(control.value) //se lo envío a mi servicio
    .pipe(
      tap((a)=> {console.log('resp', a)}),
      map(
        (response:any) => ( response.exist ? { usernameExist: true} : null)
      )
    )
  }
}
