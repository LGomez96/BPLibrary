import {getTestBed, TestBed} from '@angular/core/testing';

import { BooksService } from './books.service';
import {environment} from "../../../environments/environment";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

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
    const bookMock = {
      exists: true
    }

    //act
    service.getBooksOwner()
      .subscribe()

    let url = apiUrl + 'books/owner/'
    let req = httpController.expectOne(url)
    let request = req.request

    //assert
    expect(
      request.method
    ).toBe('GET')
    expect(
      request.headers.has('Authorization')
    ).toBeTruthy()


    req.flush(bookMock)
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
      .subscribe()

    let url = apiUrl + 'books/owner/'
    let req = httpController.expectOne(url)
    let request = req.request

    //assert
    expect(
      request.method
    ).toBe('POST')

    req.flush(responseMock)
  })

});
