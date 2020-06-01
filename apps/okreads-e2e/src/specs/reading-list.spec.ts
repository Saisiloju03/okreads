import { $, browser, ExpectedConditions, $$ } from 'protractor';
import { expect } from 'chai';

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

  it('by clicking undo in reading list show the removed book in the reading list again', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // initiating a book search with 'j' as input string
    const input = await $('input[type="search"]');
    await input.sendKeys('j');
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

    await readingListToggle.click();
    browser.sleep(1000);

    let readingListItemDetailsTitle = await $$('[data-testing="reading-list-item--details--title"]');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        readingListItemDetailsTitle[0],
        text)
    );

    const removeFromReadingListButtonitems = await $$('[data-testing="Remove-From-Reading"]');
    await removeFromReadingListButtonitems[0].click();
    browser.waitForAngularEnabled(false);

    // listening the snackbar undobutton event
    browser.wait(await ExpectedConditions.visibilityOf(undoButton), 5000);
    await undoButton.click();
    browser.waitForAngularEnabled(true);
    await browser.sleep(1000)
    readingListItemDetailsTitle = await $$('[data-testing="reading-list-item--details--title"]');

    // checking the reading list to make sure undo event works.
    expect(readingListItemDetailsTitle.length).to.eq(1)

  });


});
