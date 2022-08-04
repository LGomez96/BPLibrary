import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserLogin} from '../../interfaces/auth.interfaces';
import {LoginService} from '../../services/login.service';
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  user!: UserLogin;
  messageError!: string;

  loginSend$: Subject<boolean> = new Subject<boolean>()

  constructor(private router: Router,
              private loginService: LoginService,
              private fb: FormBuilder) {
    this.buildForm()

    this.loginSend$
      .pipe(
        debounceTime(500),
        switchMap(() => this.getLoginRequest()),
      )
      .subscribe({
        next: (res) => {

          if (res.status)
            this.router.navigate(['/books'])
          else
            this.messageError = res.message

        },

      })

  }

  ngOnInit(): void {

  }

  buildForm() {
    this.form = this.fb.group(
      {
        username: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]]
      }
    )
  }

  //#region Getter

  //obtener controles del formulario por password
  get password(): FormControl {
    return this.form.get('password') as FormControl
  }

  //creo un control de acceso para el usuario
  get username(): FormControl {
    return this.form.get('username') as FormControl
  }

  //#endregion

  //configurando el objeto error del control password con setErrors:

  setErrorPassword() {
    this.password.setErrors({
      "exist": true
    })
  }

  getLoginRequest() {
    const formValue = this.form.getRawValue();
    return this.loginService.loginUser(formValue)
  }

  sendLogin() {

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    this.loginSend$.next(true)

    // this.form.reset()

  }

}
