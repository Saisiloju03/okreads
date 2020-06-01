import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');
  });

  xit('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // TODO: Implement this test!
  });

  it('by clicking undo remove the book from the reading list just added', async () => {
    //NOTE: This test will work only if the reading list is empty initially
    // making sure component tmo-root is loaded
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // initiating a book search with 'j' as input string
    const input = await $('input[type="search"]');
    await input.sendKeys('java');
    const form = await $('form');
    await form.submit();

    const addToReadingListButtonitems = await $$('[data-testing="Add-To-Reading"]');

    const firstbookTitle = await $$('[data-testing="book--title"]');

    const undoButton = await $(".mat-snack-bar-container .mat-button-wrapper")
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');

    const text = await firstbookTitle[0].getText();

    // adding the book to reading list
    await addToReadingListButtonitems[0].click();
    browser.waitForAngularEnabled(false);

    // initiating readinglist toggle
    await readingListToggle.click();
    ;
    browser.sleep(1000)

    // getting reading list item detail
    let readingListItemDetailsTitle = await $$('[data-testing="reading-list-item--details--title"]');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        readingListItemDetailsTitle[1],
        text)
    );

    // listening the snackbar undobutton event
    browser.wait(await ExpectedConditions.visibilityOf(undoButton), 5000);
    await undoButton.click();
    browser.waitForAngularEnabled(true);
    await browser.sleep(2000)
    readingListItemDetailsTitle = await $$('[data-testing="reading-list-item--details--title"]');

    // checking the reading list to make sure undo event works.
    expect(readingListItemDetailsTitle.length).to.eq(1)
  })


});
