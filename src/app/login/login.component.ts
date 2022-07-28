import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public form! : FormGroup;

  constructor( private formParent: FormGroup = new FormGroup({})) { }

  ngOnInit(): void {
    this.initFormParent()
  }
  initFormParent(){
    this.formParent = new FormGroup(
      {
        userName: new FormControl('',[ Validators.required ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        ])
      }
    )
  }
  sendLogin(){

  }
}
