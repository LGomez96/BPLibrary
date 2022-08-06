import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

describe('LibraryService', () => {
  let service: AuthService;
  let apiUrl: string = environment.apiUrl;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule
      ],
      providers:[AuthService]
    });
    httpController = TestBed.inject(HttpTestingController );
    service = TestBed.inject(AuthService);
  });
  afterEach(() => {
    httpController.verify();
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
    const mockResponse = {
      status: "success",
      id: "xgxn1by8gc"
    }
    //Arrange

    //ACT
    service.registerUser(bodyMock)
    .subscribe(
      (res)=>{
        expect(res).toEqual(mockResponse);
      }
    )
    let url = apiUrl + 'users/'
    let req = httpController.expectOne(url)
    let request = req.request
    //assert
    expect(
      request.method
    ).toBe('POST')


    req.flush(mockResponse)
  })
   it('Get a username that actually exist', ()=> {

    //arrange
    const usernameExistMock = {
      exists: true
    }
    const username = 'someone'
     //act
     service.existUserName(username)
     .subscribe(
      (res)=>{
        expect(res).toEqual(usernameExistMock);
      }
     )

     const url = apiUrl + 'users/exist-name/' + username
     const req = httpController.expectOne(url)
     let request = req.request

     //assert
     expect(request.method).toEqual('GET')


    req.flush(usernameExistMock)
   })
});
