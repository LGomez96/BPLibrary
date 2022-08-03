import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AddBooksComponent } from './add-books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksService } from '../../services/books.service';
import { CategoriesService } from 'src/app/service/categories.service';
import { of } from 'rxjs';

describe('AddBooksComponent', () => {
  let component: AddBooksComponent;
  let fixture: ComponentFixture<AddBooksComponent>;
  let categoriesService: CategoriesService;
  let booksService: BooksService;
  class mockBooksService {
   
    addBookOwner(){ return of([])   }
    }
  class mockCategoriesService {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CategoriesService, useClass: mockCategoriesService },
        { provide: BooksService, useClass: mockBooksService }
      ],
      declarations: [ AddBooksComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBooksComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    booksService = TestBed.inject(BooksService);
    fixture.detectChanges();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
