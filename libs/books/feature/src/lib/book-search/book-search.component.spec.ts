import { expect } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule, createBook } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { ReadingListBook } from '@tmo/books/data-access';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  const books = [createBook('A')];
  const item:ReadingListBook[] = [{...books[0],isAdded:true}]


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('Should test formatDate', ()=> {
    const date = new Date().toISOString()
    const returnValue = fixture.componentInstance.formatDate(date);
    const expectedDateValue = new Intl.DateTimeFormat('en-US').format(new Date(date))

    expect(returnValue).eq(expectedDateValue);
    const expectUndefined = fixture.componentInstance.formatDate(undefined);
    expect(expectUndefined).to.be.undefined
  })

  it('Should test trackByBookId', ()=> {
    fixture.componentInstance.books = item;
    const bookId = fixture.componentInstance.trackByBookId(0, books[0]);
    expect(bookId).eqls('A');
  })

  it('should testaddBookToReadingList', ()=>{
    fixture.componentInstance.addBookToReadingList(item[0])
  })

  it('should testaddBookToReadingList', ()=>{
    fixture.componentInstance.addBookToReadingList(item[0])
  });

  it('Should testsearchExample', ()=> {
    fixture.componentInstance.searchExample();
    expect(fixture.componentInstance.searchForm.value).eql({term:'javascript'});
  });

  it('Should test eles of searchBooks()', ()=> {
    fixture.componentInstance.searchForm.value.term = null;
    fixture.componentInstance.searchBooks();
  });

});
