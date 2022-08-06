import {Component, OnInit} from '@angular/core';
import {Book, CategorieBook, IDCanDeActive} from "../../interfaces/books.interface";
import {CategoriesService} from "../../../service/categories.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Observable, of, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {
  categories: CategorieBook[] = [];
  formBook!: FormGroup
  book: Book [] = [];
  getId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  edit: Book | null = null;
  btnAction: string = 'Registrar';
  btnChange: string = 'Registro de libro';
  categories$ = this.categoryService.categories$;
  // Observables - Subjects - BehaviorSubjects
  destroy$: Subject<boolean> = new Subject<boolean>()


  constructor(
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
    // this.category = this.getCategoriesBook();
    this.categories$ = this.categoryService.getCategory()

  };

  ngOnInit(): void {
    //this.getCategoriesBook()

  }
  ngOnDestroy() {
    this.destroy$.next(false)
    this.destroy$.unsubscribe()
  }

  buildForm() {
    this.formBook = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      resume: [null, Validators.required],
      image: [null, Validators.required],
      url: [null, Validators.required],
      public: [false, Validators.required],
      category: new FormControl(this.categories, Validators.required)
    });
    if (this.getId) {
      this.bookService.getBookById((this.getId))
        .subscribe({
          next: book => {
            this.btnAction = 'Editar';
            this.btnChange = 'Edición de Libro'
            this.edit = book
            this.formBook.patchValue({
              title: this.edit.title,
              author: this.edit.author,
              resume: this.edit.resume,
              image: this.edit.image,
              url: this.edit.url,
              public: this.edit.public,
              category: this.edit.category
            })
          }
        })
    }
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
    const formValue = this.formBook.getRawValue();
    console.log(formValue, 'datos del form')
    if (this.formBook.invalid) {
      this.formBook.markAllAsTouched()
      return;
    }
    if (!this.edit) {
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
    } else {
      this.updateBook()
    }
  }

  updateBook() {
    //peticion para editar
  }
  canBack():boolean{
   if( confirm('¿Estás seguro que deseas salir?')){
     return true;
   } else {
     return false;
   }
  }


}
