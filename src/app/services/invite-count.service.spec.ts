import { TestBed, inject } from '@angular/core/testing';

import { InviteCountService } from './invite-count.service';

describe('InviteCountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InviteCountService]
    });
  });

  it('should be created', inject([InviteCountService], (service: InviteCountService) => {
    expect(service).toBeTruthy();
  }));
});
