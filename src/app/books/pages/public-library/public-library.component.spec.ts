import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PublicLibraryComponent } from './public-library.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book, CategorieBook } from '../../interfaces/books.interface';
import { CategoriesService } from '../../../service/categories.service';
import { BooksService, FilterBooks } from '../../services/books.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';


describe('PublicLibraryComponent', () => {
  let component: PublicLibraryComponent;
  let fixture: ComponentFixture<PublicLibraryComponent>;
  let categoryService: CategoriesService;
  let booksService: BooksService;
  let router: Router;

  //arrange
  const mockFilter: FilterBooks = {   
    count: 4,
    items: [
        {
            id: "2ac4ly00oen",
            public: true,
            author: "Unknow",
            resume: "",
            title: "Learning Angular, 2nd Edition",
            subtitle: "A Hands-On Guide to Angular 2 and Angular 4",
            image: "https://itbook.store/img/books/9780134576978.png",
            url: "https://itbook.store/books/9780134576978",
            category: [
                57
            ],
            userRegister: "w7qfsa5f21"
        },
        {
          id: "2ac4ly00oen",
          public: true,
          author: "Unknow",
          resume: "",
          title: "Learning Angular, 2nd Edition",
          subtitle: "A Hands-On Guide to Angular 2 and Angular 4",
          image: "https://itbook.store/img/books/9780134576978.png",
          url: "https://itbook.store/books/9780134576978",
          category: [
              57
          ],
          userRegister: "w7qfsa5f21"
      }
    ]
  }
  const mockBooks: Book[] = [
    {
      id: "zv0gskqufve",
      public: true,
      author: "Unknow",
      resume: "",
      title: "Learning Angular, 2nd Edition",
      subtitle: "Create Responsive, Fast and Reliable PWAs Using Angular",
      image: "https://itbook.store/img/books/9781484244470.png",
      url: "https://itbook.store/books/9781484244470",
      category: [
        48
      ],
      userRegister: "w7qfsa5f21"
    },
    {
      id: "nkizz2ctq0o",
      public: true,
      author: "Unknow",
      resume: "",
      title: "another react book",
      subtitle: "A Hands-On Guide to Angular 2 and Angular 4",
      image: "https://images-na.ssl-images-amazon.com/images/I/91gJrDrQuCL.jpg",
      url: "https://images-na.ssl-images-amazon.com/images/I/91gJrDrQuCL.jpg",
      category: [
        50
      ],
      userRegister: "w7qfsa5f21"
    }
  ]
  const mockBooksOwner = {
  }
  const categoryBooks: CategorieBook[] = [
    {
      id: 1,
      description: 'tech'
    },
    {
      id: 2,
      description: 'action'
    },
    {
      id: 3,
      description: 'fantasy'
    }
  ]


  class mockBoockService {
    filterBooks(){
      return of(mockFilter)
    };
    getBookOwner(){
      return of(mockBooks)
    }
  }
  class  mockCategoryService{
    getCategory(){
      return of(categoryBooks)
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        { provide: BooksService, useClass: mockBoockService },
        { provide: CategoriesService, useClass: mockCategoryService }
      ],
      declarations: [PublicLibraryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLibraryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoriesService);
    booksService = TestBed.inject(BooksService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
