import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;
  let mockLibraryService = {
    loginUser: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        {provide: LoginService, useValue: mockLibraryService}
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router =  TestBed.inject(Router);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  // it('should send error if do not exist a password', ()=>{
  //   const error = component.setErrorPassword();
  //   expect(error).toEqual('Contraseña es requerida;')
  // })
  

});
