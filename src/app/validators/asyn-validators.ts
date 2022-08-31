import { AbstractControl, AsyncValidatorFn } from "@angular/forms"
import { map, tap } from "rxjs"
import { AuthService } from "../auth/services/auth.service"

export function checkUserName(AuthService:AuthService):AsyncValidatorFn {
        return (control: AbstractControl) => { //recibo el value control
          return AuthService
          .existUserName(control.value) //se lo envío a mi servicio
          .pipe(
            tap((a)=> {console.log('resp', a)}),
            map(
              (response:any) => ( response.exist ? { usernameExist: true} : null)
            )
          )
        }}

export function checkNotUserName(AuthService:AuthService):AsyncValidatorFn {
        return (control: AbstractControl) => { //recibo el value control
          return AuthService
          .existUserName(control.value) //se lo envío a mi servicio
          .pipe(
            tap((a)=> {console.log('resp', a)}),
            map(
              (response:any) => ( response.exist ? { usernameExist: false} : null)
            )
          )
        }}

//aysnchronus function to validate username:
