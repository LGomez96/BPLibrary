import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import {environment} from "../../environments/environment";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('CategoriesService', () => {
  let service: CategoriesService;
  let apiUrl = environment.apiUrl;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CategoriesService);
  });
  afterEach(()=>{
    httpController.verify()
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Get a categories', ()=> {

    //arrange
    const mockResponse =[
      {
        id: 1,
        description: "Action and adventure"
      },
      {
        id: 2,
        description: "Alternate history"
      },
    ]

    //act
    service.getCategory()
      .subscribe()

    let url = apiUrl + 'category'
    let req = httpController.expectOne(url)
    let request = req.request

    //assert
    expect(
      request.method
    ).toBe('GET');

    req.flush(mockResponse)
  })

});
