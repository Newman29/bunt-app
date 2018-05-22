import { TeamsRoutingModule } from './teams-routing.module';

describe('TeamsRoutingModule', () => {
  let teamsRoutingModule: TeamsRoutingModule;

  beforeEach(() => {
    teamsRoutingModule = new TeamsRoutingModule();
  });

  it('should create an instance', () => {
    expect(teamsRoutingModule).toBeTruthy();
  });
});
