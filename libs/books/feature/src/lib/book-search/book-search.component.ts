import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  public displayBooks = false;
  public unsubscriber: Subject<any> = new Subject<void> ();

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    this.autoSearchOnValueChange();
  }

  autoSearchOnValueChange() {
    this.searchForm
      .get('term')
      .valueChanges.pipe(
      takeUntil(this.unsubscriber),
      debounceTime(500),
      distinctUntilChanged(),
      filter(data => data !== '')
    )
      .subscribe(() => {
        this.searchBooks();
        this.displayBooks = true;
      });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }
  trackByBookId(index: number, book: Book): string {
    return book.id;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
      this.displayBooks = true;
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.complete();
  }
}
