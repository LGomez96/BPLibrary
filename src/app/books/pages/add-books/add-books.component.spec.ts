import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AddBooksComponent } from './add-books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksService } from '../../services/books.service';
import { CategoriesService } from '../../../service/categories.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import spyOn = jest.spyOn;
import { Book, CategorieBook } from "../../interfaces/books.interface";

describe('AddBooksComponent', () => {
  let component: AddBooksComponent;
  let fixture: ComponentFixture<AddBooksComponent>;
  let categoriesService: CategoriesService;
  let booksService: BooksService;
  let router: Router;
  let route: ActivatedRoute;
  //arrange
  const mockCategories: CategorieBook[] =
    [
      {
        id: 1,
        description: "Action and adventure"
      },
      {
        id: 1,
        description: "Action and adventure"
      }

    ]

  const mockBook: Book = {
    id: "nkizz2ctq0o",
    public: true,
    author: "Unknow",
    resume: "",
    title: "another react book",
    subtitle: "A Hands-On Guide to Angular 2 and Angular 4",
    image: "https://images-na.ssl-images-amazon.com/images/I/91gJrDrQuCL.jpg",
    url: "https://images-na.ssl-images-amazon.com/images/I/91gJrDrQuCL.jpg",
    category: [
      14
    ],
    userRegister: "w7qfsa5f21"
  }

  class mockBooksService {

    addBookOwner() {
      return of({ status: true })
    }
  }

  class mockCategoriesService {
    getCategory() {
      return of(mockCategories)
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule //.withRoutes([]) preguntar que poner aqui
      ],
      declarations: [AddBooksComponent],
      providers: [
        { provide: CategoriesService, useClass: mockCategoriesService },
        { provide: BooksService, useClass: mockBooksService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBooksComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    booksService = TestBed.inject(BooksService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
    jest.resetAllMocks();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('update book', () => {
    // const id: string = "nkizz2ctq0o";
    const spyRoute = jest.spyOn(route.snapshot.paramMap, 'get');
    spyRoute.mockReturnValue("nkizz2ctq0o");
    jest.spyOn(booksService, 'getBookById');
    component.buildForm();
    expect(booksService.getBookById).toHaveBeenCalled();
  });
  it('build valid form', () => {
    jest.spyOn(component.formBook, 'markAllAsTouched');
    component.addBooks();
    expect(component.formBook.markAllAsTouched).toHaveBeenCalled();

    jest.spyOn(booksService, 'addBookOwner');
    component.formBook.setValue({
      id: "nkizz2ctq0o",
      public: true,
      author: "Unknow",
      resume: "",
      title: "another react book",
      subtitle: "Angular 4",
      image: "https.jpg",
      url: "https.jpg",
      category: {
        id: 14,
        description: 'fantasy'
      },
      userRegister: "w7qfsa5f21"
    });
    component.addBooks();
    expect(booksService.addBookOwner).toHaveBeenCalled();
  })
  it('ask a confirmation question before to exit the route', () => {
    expect(component.canBack).toHaveBeenCalled();
  })
});
