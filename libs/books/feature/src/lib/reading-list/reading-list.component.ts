import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Book } from '@tmo/shared/models';


@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);
  storeUnsubscriber$: Subject<void> = new Subject<void>();

  constructor(private readonly store: Store, private snackbar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));

    this.snackbar
      .open(item.title + ' removed.', 'undo', {
        duration: 5555,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      .onAction()
      .pipe(takeUntil(this.storeUnsubscriber$))
      .subscribe(() => {
        const book: Book = item;
        this.store.dispatch(addToReadingList({ book }));
      });
  }

  ngOnDestroy(): void {
    this.storeUnsubscriber$.complete();
  }

}
