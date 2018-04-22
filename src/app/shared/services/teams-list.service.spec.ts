import { TestBed, inject } from '@angular/core/testing';

import { TeamsListService } from './teams-list.service';

describe('TeamsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsListService]
    });
  });

  it('should be created', inject([TeamsListService], (service: TeamsListService) => {
    expect(service).toBeTruthy();
  }));
});
