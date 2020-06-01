import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksPartialState } from './books.reducer';
import { getBooks } from './books.selectors';
import {
  READING_LIST_FEATURE_KEY,
  readingListAdapter,
  ReadingListPartialState,
  State
} from './reading-list.reducer';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const getReadingListState = createFeatureSelector<
  ReadingListPartialState,
  State
  >(READING_LIST_FEATURE_KEY);

const {
  selectEntities,
  selectAll,
  selectTotal
} = readingListAdapter.getSelectors();

export const getReadingListEntities = createSelector(
  getReadingListState,
  selectEntities
);

export interface ReadingListBook extends Book, Omit<ReadingListItem, 'bookId'> {
  isAdded: boolean;
}

// * added an extra field finished, which is required to show the button field as 'Finished' or
// 'Want to Read' in book-search.component.html.
// * Some of the books in entities may not have finished flag, hence entities[b.id].finished also needs to be checked if exists.

export const getAllBooks = createSelector<
  BooksPartialState & ReadingListPartialState,
  Book[],
  Record<string, ReadingListItem>,
  ReadingListBook[]
  >(getBooks, getReadingListEntities, (books, entities) => {
  return books.map(b => {
    return {
      ...b,
      isAdded: Boolean(entities[b.id]),
      finished: entities[b.id] ? entities[b.id].finished ? true : false : false
    };
  });
});

export const getReadingList = createSelector(getReadingListState, selectAll);

export const getTotalUnread = createSelector(getReadingListState, selectTotal);
