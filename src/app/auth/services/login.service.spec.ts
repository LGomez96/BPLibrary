import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let apiUrl = environment.apiUrl;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

        HttpClientTestingModule
      ],
    });
    httpController = TestBed.inject(HttpTestingController );
    service = TestBed.inject(LoginService);
  });
  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('login user', () => {
    //AAA
    //Arrange Act Assert
    const bodyMock ={
      username: '',
      password:'',

    }

    const mockResponse = {
      user: {
        userId: "w7qfsa5f21",
        username: "ksuarez"
    },
    access_token: "eyJhbG",
    tokenType: "Bearer"
    }
    //Arrange

    //ACT
    service.loginUser(bodyMock)
    .subscribe(
      (res) => {
        expect(res).toEqual(mockResponse);
      }
    )
    let url = apiUrl + 'users/login'
    let req = httpController.expectOne(url)
    let request = req.request
    //assert
    expect(
      request.method
    ).toBe('POST')


    req.flush(mockResponse)
  })
});
