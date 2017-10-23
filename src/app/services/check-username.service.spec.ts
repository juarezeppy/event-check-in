import { TestBed, inject } from '@angular/core/testing';

import { CheckUsernameService } from './check-username.service';

describe('CheckUsernameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckUsernameService]
    });
  });

  it('should be created', inject([CheckUsernameService], (service: CheckUsernameService) => {
    expect(service).toBeTruthy();
  }));
});
