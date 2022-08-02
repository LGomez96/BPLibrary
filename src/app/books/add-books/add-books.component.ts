import { Component, OnInit } from '@angular/core';
import {CategorieBook} from "../interfaces/books.interface";
import {CategoriesService} from "../../service/categories.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../services/books.service";

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {
  categories: CategorieBook[] = [];
  form!: FormGroup
  constructor(
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private bookService: BooksService,

  ) {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      resume: [null, Validators.required],
      image: [null, Validators.required],
      url: [null, Validators.required],
      public: [false, Validators.required],
      category: this.formBuilder.group({})
    });
  };

  ngOnInit(): void {
  }
  get title(): FormControl{
    return this.form.get('title') as FormControl
  } get author(): FormControl{
    return this.form.get('author') as FormControl
  } get resume(): FormControl{
    return this.form.get('resume') as FormControl
  } get image(): FormControl{
    return this.form.get('image') as FormControl
  } get url(): FormControl{
    return this.form.get('url') as FormControl
  } get public(): FormControl{
    return this.form.get('public') as FormControl
  } get category(): FormControl{
    return this.form.get('category') as FormControl
  }
  getSelectedCategoriesValue(){

  }

}
