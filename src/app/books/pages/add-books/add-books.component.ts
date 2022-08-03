import {Component, OnInit} from '@angular/core';
import {Book, CategorieBook} from "../../interfaces/books.interface";
import {CategoriesService} from "../../../service/categories.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {
  categories: CategorieBook[] = [];
  formBook!: FormGroup
  book: Book [] = [];

  constructor(
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router
  ) {
    this.formBook = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      resume: [null, Validators.required],
      image: [null, Validators.required],
      url: [null, Validators.required],
      public: [false, Validators.required],
      category: new FormControl(this.categories, Validators.required)
    });
    // this.category = this.getCategoriesBook();

  };

  ngOnInit(): void {
    //this.getCategoriesBook()
    this.categoryService.getCategory()
      .subscribe({
        next: (res: CategorieBook[]) => {
          this.categories = res
          console.log(res, 'respuestaCategorias')
        }
      })
  }

  get title(): FormControl {
    return this.formBook.get('title') as FormControl
  }

  get author(): FormControl {
    return this.formBook.get('author') as FormControl
  }

  get resume(): FormControl {
    return this.formBook.get('resume') as FormControl
  }

  get image(): FormControl {
    return this.formBook.get('image') as FormControl
  }

  get url(): FormControl {
    return this.formBook.get('url') as FormControl
  }

  get public(): FormControl {
    return this.formBook.get('public') as FormControl
  }

  get category(): FormControl {
    return this.formBook.get('category') as FormControl
  }

  addBooks() {
    if (this.formBook.invalid) {
      this.formBook.markAllAsTouched()
      return;
    }
  const formValue =  this.formBook.getRawValue();
   console.log(formValue, 'datos del form')
  this.bookService.addBookOwner(formValue)
    .subscribe({
      next: res => {
        console.log(res, 'res de post')
          alert('libro creado exitosamente')
        this.router.navigate(['/books'])

      },
      error: error => {
        alert('Ha ocurrido un error al añadir los datos')
      }
    })
    this.formBook.reset()
  }


}
