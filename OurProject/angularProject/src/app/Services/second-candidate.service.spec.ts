import { TestBed } from '@angular/core/testing';

import { SecondCandidateService } from './second-candidate.service';

describe('SecondCandidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecondCandidateService = TestBed.get(SecondCandidateService);
    expect(service).toBeTruthy();
  });
});
