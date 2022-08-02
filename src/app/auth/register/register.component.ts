import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { User } from '../../interfaces/my-interfaces';
import { CustomValidationService } from '../../service/custom-validation.service';
import { LibraryService } from '../../service/library.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],


})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  user !: User;
  allCategories: any[] = [];
  selectedCategoriesValue: any [] = [];
  categories: Array<string> = ['Anime', 'Ciencia Ficción', 'Novelas', 'Dramas', 'Fantasía']
  categororyErrors: Boolean = true;
  userNameError!: Boolean;

  constructor(private formBuilder: FormBuilder,private libraryService: LibraryService ) {
    this.form = this.formBuilder.group({
      username: ['',{
        validators: [Validators.required], asyncValidators: [ checkUserName(this.libraryService)], upDateOn: 'blur' } ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,64})")]],
      confirmPassword: ['', Validators.required],
      category: this.addCategoriesControls()
    });
   }

  ngOnInit(): void {
   // this.allCategoryBook(),
   this.username;
   this.email;
   this.password;
   this.confirmPassword;

  }

  //#region Validaciones

  get username(): FormControl{
    return this.form.get('username') as FormControl
    }

  get email(): FormControl {
    return this.form.get('email') as FormControl
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl
  }

  usernameErrorsControl(){
    this.username.setErrors({
      "exist": true,
      "usernameExist": true
    })

  }
  emailErrorsControl(){
    this.email.setErrors({
      "exist": true
    })
  }
  passwordErrorsControl(){
    this.password.setErrors({
      "exist": true
    })
  }
  confirmPasswordErrorsControl(){
    this.confirmPassword.setErrors({
      "exist": true
    })
  }

  //#endregion Validaciones



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

   onSubmit(body:User){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }
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
        if(res.status === 'success'){
          alert('registro exitoso')
          return;
        }
        console.log('recibiendo respuesta', res)

        }
    })
  }

  }

}
 //aysnchronus function to validate username:
 export function checkUserName(libraryService:LibraryService):AsyncValidatorFn {
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
