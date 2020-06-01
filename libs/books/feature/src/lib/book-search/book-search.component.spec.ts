import { expect } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

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

    //if no date provided
    const expectUndefined = fixture.componentInstance.formatDate(undefined);
    expect(expectUndefined).to.be.undefined
  })

  it('Should test trackByBookId', ()=> {
    fixture.componentInstance.books = item;
    const bookId = fixture.componentInstance.trackByBookId(0, books[0]);
    expect(bookId).eqls('A');
  })

  // since it contains an action. The corresponding reducers should be made sure to run properly
  // in reading-list.reducer
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

  //else part for searchBooks()
  it('Should test eles of searchBooks()', ()=> {
    fixture.componentInstance.searchForm.value.term = null;
    // the else will be covered. can't compare as the function dosen't returns any
    fixture.componentInstance.searchBooks();
  });

});
