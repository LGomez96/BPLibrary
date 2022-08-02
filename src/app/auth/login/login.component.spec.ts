import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLibraryService = {
    loginUser: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  it('', () => {
    mockLibraryService.loginUser.mockImplementation(
       () => of([]))
    //Arrange
    const bodyMock ={
      username: '',
      password:'',
    }
    //Act
    component.sendLogin(bodyMock)
    //Assert
    expect(mockLibraryService.loginUser).toBeCalled()
  })
});
