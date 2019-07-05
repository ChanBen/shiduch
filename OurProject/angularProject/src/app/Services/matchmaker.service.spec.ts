import { TestBed } from '@angular/core/testing';

import { MatchmakerService } from './matchmaker.service';

describe('MatchmakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchmakerService = TestBed.get(MatchmakerService);
    expect(service).toBeTruthy();
  });
});
