import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let service: LibraryService;
  let apiUrl = '...'
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('post new user', () => {
    //AAA
    //Arrange Act Assert
    const bodyMock ={
      username: '',
      email:'',
      password:'',
      category: [],
    }
    //Arrange
    
    //ACT
    service.registerUser(bodyMock)
    .subscribe()
    let url = apiUrl 
    let req = httpController.expectOne(url)
    let request = req.request
    //assert
    expect(
      request.method
    ).toBe('POST')
   
    expect(request.body.has(bodyMock)).toBeTruthy()
    req.flush(bodyMock)
  })
});
