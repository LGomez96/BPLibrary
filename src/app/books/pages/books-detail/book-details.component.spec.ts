import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import { BookDetailsComponent } from './book-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import {BooksService} from "../../services/books.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { Book} from "../../interfaces/books.interface";
import {Observable, of, tap} from "rxjs";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';



describe('BookDetailsComponent', () => {
  //arrange
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let booksService: BooksService
  let compiled = HTMLElement;

  // class bookResolver {
  //   return this.booksService.getBookById()
  // }
  const mockBook: Book = {
      id: "nkizz2ctq0o",
      public: true,
      author: "Unknow",
      resume: "",
      title: "another react book",
      subtitle: "A Hands-On Guide to Angular 2 and Angular 4",
      image: "https://images-na.ssl-images-amazon.com/images/I/91gJrDrQuCL.jpg",
      url:  "https://images-na.ssl-images-amazon.com/images/I/91gJrDrQuCL.jpg",
      category: [
        50
      ],
      userRegister: "w7qfsa5f21"
    }


  // class mockActivateRoute {
  //   data: { return of(mockBook) }
  // }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
      RouterTestingModule],
      declarations: [ BookDetailsComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should to have match with snapshot', () =>{
  //   expect(compiled).toMatchSnapshot();
  // })



});
