import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService, UserLogin } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public form! : FormGroup;
  user!: UserLogin;

  constructor(  private loginService: LoginService) { }

  ngOnInit(): void {
    this.initFormParent()
  }
  initFormParent(){
    this.form = new FormGroup(
      {
        userName: new FormControl('',[ Validators.required ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$')
        ])
      }
    )
  }
  sendLogin(user: UserLogin){
    const formValue = this.form.getRawValue();
    this.user= {
      username: formValue.username,
       password: formValue.password,
      
    }
    
    this.loginService.loginUser(this.user)
    .subscribe({
      next: res => {
        console.log('recibiendo respuesta', res)
        sessionStorage.setItem('token', res.access_token);
              }
    })
  }
  
}
