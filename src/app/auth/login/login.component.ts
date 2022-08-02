import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../interfaces/my-interfaces';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  user!: UserLogin;
  messageError: undefined;

  constructor( private router:Router, private loginService: LoginService, private fb: FormBuilder
      ) {
      this.form = this.fb.group(
        {
          username: [null, [Validators.required]],
          password: [null, [Validators.required , Validators.minLength(8)]]
        }
      )
    }

  ngOnInit(): void {

  }

  //#regionValidaciones



  //obtener controles del formulario por password
  get password(): FormControl {
    return this.form.get('password') as FormControl
  }

  //creo un control de acceso para el usuario
  get username(): FormControl {
    return this.form.get('username') as FormControl
  }

  //configurando el objeto error del control password con setErrors:

  setErrorPassword() {
    this.password.setErrors({
      "exist": true
    })
  }

  sendLogin(user: UserLogin) {
    const formValue = this.form.getRawValue();
    this.user = {
      username: formValue.username,
      password: formValue.password,

    }

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }
    this.form.reset()
    this.loginService.loginUser(this.user)
      .subscribe({
        next: res => {
          console.log('recibiendo respuesta', res)
          sessionStorage.setItem('access_token', res.access_token)
          sessionStorage.setItem('username', res.user.username),
            sessionStorage.setItem('userId', res.user.userId)

          this.loginService.user = res.user;
          this.router.navigate(['/books'])

        },
        error: error => {
          this.messageError = error.message
        }

      })

  }

}
