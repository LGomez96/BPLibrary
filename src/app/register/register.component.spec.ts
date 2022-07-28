import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LibraryService } from '../service/library.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockLibraryService = {
    registerUser: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule       
      ],
      declarations: [ RegisterComponent ],
      providers: [
        {provide: LibraryService, useValue: mockLibraryService}
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('', () => {
    mockLibraryService.registerUser.mockImplementation(
       () => of([]))
    //Arrange
    const bodyMock ={
      username: '',
      email:'',
      password:'',
      category: [],
    }
    //Act
    component.onSubmit(bodyMock)
    //Assert
    expect(mockLibraryService.registerUser).toBeCalled()
  })
});
