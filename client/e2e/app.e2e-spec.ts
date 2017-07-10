import { NewsharePage } from './app.po';

describe('newshare App', () => {
  let page: NewsharePage;

  beforeEach(() => {
    page = new NewsharePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
