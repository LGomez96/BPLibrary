import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import {BooksService} from "../services/books.service";
import {of} from "rxjs";

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockBookService  = {
    getBooksOwner: jest.fn()
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksComponent ],
      providers:[
        {provide: BooksService, useValue: mockBookService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return a book list ',()=>{
    const callGetBooks = mockBookService.getBooksOwner(
      () => of([])
    )
    component.getBooksOwnerList()
    expect(callGetBooks).toBeCalled()
  })
});
