import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../interfaces/auth.interfaces';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  const bodyMock: User = {
    username: "abc",
    email: "abc",
    password: "abc",
    category: []
  }
  class mockAuthService {
    registerUser() {
      return of(
        {
          status: "success",
          id: "kwmdtcdpoih"
        })
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useClass: mockAuthService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    jest.resetAllMocks(); //reestablece el estado de todos los mocks, regresa el obj jest
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // it('change configurations of error object by username', () => {
  //   const error = component.usernameErrorsControl();
  //   expect(error).toEqual('Usuario es requerido')
  // })

  it('set errors of form control',() => {
    const username = new FormControl('username');
    username.setErrors({
      exist: true
    });

  expect(username.valid).toEqual(false);
  expect(username.errors).toEqual({ exist: true });

  username.setValue('some');

  expect(username.valid).toEqual(true);
})




});
