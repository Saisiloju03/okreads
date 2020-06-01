import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, finishedReading } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  // method to mark a book as finished
  finishedReading(item) {

    const finished: ReadingListItem = {...item}
    finished.finished = true;
    finished.finishedDate  = new Date().toISOString();

    this.store.dispatch(finishedReading({item:finished}))
  }


  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
