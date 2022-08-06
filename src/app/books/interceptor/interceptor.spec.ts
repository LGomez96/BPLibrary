import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {environment} from "../../../environments/environment" 
import { InterceptorsService } from "./interceptors";

describe('Authentication Intercepetor', ()=>{
    let httpClient: HttpClient;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule
          ],
          providers: [
            {
              provide: HTTP_INTERCEPTORS,
              useClass: InterceptorsService,
              multi: true
            }
          ]
        })
    
        httpClient = TestBed.inject(HttpClient)
        httpController = TestBed.inject(HttpTestingController)
      })

      it('add header userId',()=>{
        const url = 'https://cangular-api.herokuapp.com/books/owner'
        const HEADER = 'access_token'

        httpClient.post(url, {}).subscribe()
        const req = httpController.expectOne(url);
        const header = req.request.headers;
        console.log(header);

        expect(header.has(HEADER)).toBeTruthy();
        httpController.verify();
      })
})


