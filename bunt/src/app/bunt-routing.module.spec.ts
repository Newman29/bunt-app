import { BuntRoutingModule } from './bunt-routing.module';

describe('BuntRoutingModule', () => {
  let buntRoutingModule: BuntRoutingModule;

  beforeEach(() => {
    buntRoutingModule = new BuntRoutingModule();
  });

  it('should create an instance', () => {
    expect(buntRoutingModule).toBeTruthy();
  });
});
