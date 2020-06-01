import { $, browser, ExpectedConditions, $$ } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: Upon click finished button in a readingList book.', async () => {
    //NOTE: This test will work only if the reading list is empty initially
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // initiating a book search
    const input = await $('input[type="search"]');
    await input.sendKeys('j');
    const form = await $('form');
    await form.submit();

    let addToReadingListButtonitems = await $$(
      '[data-testing="Add-To-Reading"]'
    );

    const firstbookTitle = await $$('[data-testing="book--title"]');

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');

    const text = await firstbookTitle[0].getText();

    // stroing the fisrt book to reading list.
    await addToReadingListButtonitems[0].click();

    // opening the reading List sidenav
    await readingListToggle.click();
    browser.sleep(1000);
    const readingListItemDetailsTitle = await $$(
      '[data-testing="reading-list-item--details--title"]'
    );
    const markAsFinishedButton = await $$(
      '[data-testing="mark-as-finished-button"]'
    );

    // check if the book exists
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        readingListItemDetailsTitle[0],
        text
      )
    );

    // initiate the mark as finished button click
    await markAsFinishedButton[0].click();

    addToReadingListButtonitems = await $$('[data-testing="Add-To-Reading"]');

    // Checking the Want to Read string is changed to Finished in the book-search.component.html
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        addToReadingListButtonitems[0],
        'Finished'
      )
    );
  });


});
