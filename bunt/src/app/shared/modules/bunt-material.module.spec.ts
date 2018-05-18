import { BuntMaterialModule } from './bunt-material.module';

describe('BuntMaterialModule', () => {
  let buntMaterialModule: BuntMaterialModule;

  beforeEach(() => {
    buntMaterialModule = new BuntMaterialModule();
  });

  it('should create an instance', () => {
    expect(buntMaterialModule).toBeTruthy();
  });
});
