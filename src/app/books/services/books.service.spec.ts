import {getTestBed, TestBed} from '@angular/core/testing';

import { BooksService } from './books.service';
import {environment} from "../../../environments/environment";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { Book } from '../interfaces/books.interface';

describe('BooksService', () => {
  let service: BooksService;
  let apiUrl = environment.apiUrl;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BooksService);
  });

  afterEach(()=> {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Get a book list in personal library', ()=> {

    //arrange
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

    //act
    service.getBooksOwner()
      .subscribe(
        (res)=>{
          expect(res).toEqual(mockBooks)
        }
      )

    let url = apiUrl + 'books/owner'
    let req = httpController.expectOne({ method: 'GET'})
    let request = req.request

    //assert
    expect( request.method ).toBe('GET')

    req.flush(mockBooks)
  })
  it('Create a book in personal library', ()=> {

    //arrange
    const responseMock = {
      cod: 'xbajsd',
      status: true
    }
    const bodyMock = {
      id: 'string',
      public: true,
      author: 'string',
      resume: 'string',
      title: 'string',
      subtitle: 'string',
      image: 'string',
      url: 'string',
      category: [],
      userRegister: 'string'
    }

    //act
    service.addBookOwner(bodyMock)
      .subscribe(
        res => {
          expect(res).toEqual(bodyMock)
        }
      )

    let url = apiUrl + 'books/owner'
    let req = httpController.expectOne({ method: 'POST'})
    let request = req.request

    //assert
    expect(
      request.method
    ).toBe('POST')

    req.flush(responseMock)
  })

});
