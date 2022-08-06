import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { CategoriesService } from "../../../service/categories.service";
import { BooksService } from "../../services/books.service";
import { of } from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book, CategorieBook } from '../../interfaces/books.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

const mockCategories: CategorieBook[] = [
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
class mockCategoriesService {
  categories: CategorieBook[] = [];
  getCategory() { return of(mockCategories) }
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

class mockBooksService {
  getBooksOwner() { return of(mockBooks) }

}

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let categoriesService: CategoriesService;
  let booksService: BooksService;

  //mock de todos los servicios que vayas a necesitar, directivas, design system si usas sus inputs
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [BooksComponent],
      providers: [
        { provide: BooksService, useClass: mockBooksService },
        { provide: CategoriesService, useClass: mockCategoriesService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    booksService = TestBed.inject(BooksService);
    jest.resetAllMocks();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return a book list ', () => {

    component.getBooksOwnerList()
    expect(booksService.getBooksOwner).toBeTruthy()
  })
  it('should return a list with all books filtered', () => {
    const data = {
      title: '',
      category: [57]
    }

    component.observerChangeSearch()
    expect(booksService.filterBooks(data)).toBeTruthy()
  })

});
