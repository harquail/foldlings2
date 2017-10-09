import { Foldlings2Page } from './app.po';

describe('foldlings2 App', () => {
  let page: Foldlings2Page;

  beforeEach(() => {
    page = new Foldlings2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
