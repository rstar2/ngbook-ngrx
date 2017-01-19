import { NgBook2NgrxPage } from './app.po';

describe('ng-book2-ngrx App', function() {
  let page: NgBook2NgrxPage;

  beforeEach(() => {
    page = new NgBook2NgrxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('chat works!');
  });
});
