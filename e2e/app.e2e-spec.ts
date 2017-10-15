import { PWCPOCPage } from './app.po';

describe('pwc-poc App', () => {
  let page: PWCPOCPage;

  beforeEach(() => {
    page = new PWCPOCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
