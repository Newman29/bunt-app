import { BuntCommonModule } from './bunt-common.module';

describe('BuntCommonModule', () => {
  let buntCommonModule: BuntCommonModule;

  beforeEach(() => {
    buntCommonModule = new BuntCommonModule();
  });

  it('should create an instance', () => {
    expect(buntCommonModule).toBeTruthy();
  });
});
