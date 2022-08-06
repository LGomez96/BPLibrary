import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {BooksResolver} from "./books-resolver";


describe('BooksResolverService', () => {
  let bookResolver: BooksResolver;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
      RouterTestingModule]
    });
    bookResolver = TestBed.inject(BooksResolver);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(bookResolver).toBeTruthy();
  });
});
