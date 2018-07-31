import { RuidSearchModule } from './ruid-search.module';

describe('RuidSearchModule', () => {
  let ruidSearchModule: RuidSearchModule;

  beforeEach(() => {
    ruidSearchModule = new RuidSearchModule();
  });

  it('should create an instance', () => {
    expect(ruidSearchModule).toBeTruthy();
  });
});
