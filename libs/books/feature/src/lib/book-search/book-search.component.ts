import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  // fix on clear empty list and on search displays old results
  public displayBooks = false;

  searchForm = this.fb.group({
    term: ''
  });

  snackBarUnsubscriber$: Subject<void> = new Subject<void>();
  storeUnsubscriber$: Subject<ReadingListBook[]> = new Subject<
    ReadingListBook[]
    >();


  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
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

    this.snackbar
      .open(book.title + ' added.', 'undo', {
        duration: 5555,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      .onAction()
      .pipe(takeUntil(this.snackBarUnsubscriber$))
      .subscribe(() => {
        const item = { ...book, bookId: book['id'] };
        this.store.dispatch(removeFromReadingList({ item }));
      });

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

  ngOnDestroy() {
    this.snackBarUnsubscriber$.complete();
    this.storeUnsubscriber$.complete();
  }

}
