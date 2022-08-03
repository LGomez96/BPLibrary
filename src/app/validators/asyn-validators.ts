import { AbstractControl, AsyncValidatorFn } from "@angular/forms"
import { map, tap } from "rxjs"
import { LibraryService } from "../auth/services/library.service"

export class AsynValidators {
    checkUserName(libraryService:LibraryService):AsyncValidatorFn {
        return (control: AbstractControl) => { //recibo el value control
          return libraryService
          .existUserName(control.value) //se lo envío a mi servicio
          .pipe(
            tap((a)=> {console.log('resp', a)}),
            map(
              (response:any) => ( response.exist ? { usernameExist: true} : null)
            )
          )
        }}
}
//aysnchronus function to validate username:
